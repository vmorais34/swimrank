import * as rankingRepository from '../repositories/ranking.repository';

function getWeekStart(date: Date) {
  const weekStart = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    )
  );

  const day = weekStart.getUTCDay();

  const daysSinceMonday = day === 0 ? 6 : day - 1;

  weekStart.setUTCDate(
    weekStart.getUTCDate() - daysSinceMonday
  );

  return weekStart;
}

function applyRankingPositions(ranking: any[]) {
  let previousPoints: number | null = null;
  let currentPosition = 0;

  return ranking.map((participant, index) => {
    if (participant.points !== previousPoints) {
      currentPosition = index + 1;
      previousPoints = participant.points;
    }

    return {
      position: currentPosition,
      participantId: participant.participantId,
      name: participant.name,
      points: participant.points,
    };
  });
}

export async function getWeeklyRanking(date: Date) {
  const startDate = getWeekStart(date);

  const endDate = new Date(startDate);

  endDate.setUTCDate(
    endDate.getUTCDate() + 7
  );

  const ranking =
    await rankingRepository.findWeeklyRanking(
      startDate,
      endDate
    );

  return applyRankingPositions(ranking);
}

export async function getMonthlyRanking(date: Date) {
  const startDate = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      1
    )
  );

  const endDate = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      1
    )
  );

  const ranking =
    await rankingRepository.findMonthlyRanking(
      startDate,
      endDate
    );

  return applyRankingPositions(ranking);
}

export async function getGeneralRanking() {
  const ranking =
    await rankingRepository.findGeneralRanking();

  return applyRankingPositions(ranking);
}