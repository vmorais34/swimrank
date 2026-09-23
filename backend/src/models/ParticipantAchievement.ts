import { Schema, model } from 'mongoose';

const participantAchievementSchema = new Schema(
  {
    participantId: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
      required: true,
    },

    achievementId: {
      type: Schema.Types.ObjectId,
      ref: 'Achievement',
      required: true,
    },

    unlockedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    points: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

participantAchievementSchema.index(
  {
    participantId: 1,
    achievementId: 1,
  },
  {
    unique: true,
  }
);

export const ParticipantAchievement = model(
  'ParticipantAchievement',
  participantAchievementSchema
);