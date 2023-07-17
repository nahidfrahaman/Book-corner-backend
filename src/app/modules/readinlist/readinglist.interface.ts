import { Model } from 'mongoose'

export type IReadingList = {
  userEmail: string
  bookId: string
  readingStatus: boolean
}

export type ReadinListModel = Model<IReadingList>
