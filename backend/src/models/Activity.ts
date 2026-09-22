import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    participantId: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    distance: {
      type: Number,
      required: true,
      min: 0,
    },

    time: {
      type: Number,
      required: true,
      min: 0,
    },

    points: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      required: true,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },

    validatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Activity = model('Activity', activitySchema);