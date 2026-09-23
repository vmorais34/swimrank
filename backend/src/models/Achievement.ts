import { Schema, model, type HydratedDocument } from 'mongoose';
import type {
  AchievementRequirementType,
} from '../types/achievement';

export interface IAchievement {
  name: string;
  description: string;
  category: string;

  requirement: {
    type: AchievementRequirementType;
    value: number;
  };

  points: number;

  createdAt: Date;
  updatedAt: Date;
}

const achievementSchema = new Schema<IAchievement>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    requirement: {
      type: {
        type: String,
        required: true,
        enum: [
          'FIRST_ACTIVITY',
          'TOTAL_DISTANCE',
          'RANKING_POSITION',
          'PARTICIPATION_MONTHS',
        ],
      },

      value: {
        type: Number,
        required: true,
        min: 0,
      },
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

export const Achievement = model<IAchievement>(
  'Achievement',
  achievementSchema
);

export type AchievementDocument =
  HydratedDocument<IAchievement>;