import { Schema, model } from 'mongoose'
import { IReadingList, ReadinListModel } from './readinglist.interface'

export const ReadinListSchema = new Schema<IReadingList, ReadinListModel>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    readingStatus: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const ReadingList = model<IReadingList, ReadinListModel>(
  'Readinglist',
  ReadinListSchema,
)
