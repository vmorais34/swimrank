import { Schema, model } from 'mongoose';

const achievementSchema = new Schema(
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
        trim: true,
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

export const Achievement = model(
  'Achievement',
  achievementSchema
);