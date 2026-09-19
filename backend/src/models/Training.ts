import { Schema, model } from 'mongoose';

const trainingSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    isMain: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

trainingSchema.index(
  { date: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isMain: true,
    },
  }
);
// output
// swimrank> db.trainings.getIndexes()
// [
//   { v: 2, key: { _id: 1 }, name: '_id_' },
//   {
//     v: 2,
//     key: { date: 1 },
//     name: 'date_1',
//     unique: true,
//     partialFilterExpression: { isMain: true }
//   }
// ]

export const Training = model('Training', trainingSchema);