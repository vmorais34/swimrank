import { Schema, model } from 'mongoose';

const participantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    birthdate: {
      type: Date,
      required: true,
    },

    points: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

participantSchema.index(
  {
    name: 1,
    birthdate: 1,
  },
  {
    unique: true,
  }
);

export const Participant = model(
  'Participant',
  participantSchema
);