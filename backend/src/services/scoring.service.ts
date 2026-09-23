const BASE_POINTS = 100;
const CLASS_DURATION_SECONDS = 50 * 60;
const ATTENDANCE_BONUS = 1.25;

export function calculateActivityPoints(
  timeInSeconds: number
) {
  const proportionalPoints =
    BASE_POINTS *
    (timeInSeconds / CLASS_DURATION_SECONDS);

  const pointsWithBonus =
    proportionalPoints * ATTENDANCE_BONUS;

  return Math.round(pointsWithBonus);
}