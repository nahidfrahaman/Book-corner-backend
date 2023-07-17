import { StatusCodes } from 'http-status-codes'
import ApiError from '../../../errors/ApiError'
import { IReadingList } from './readinglist.interface'
import { ReadingList } from './readinglist.model'

const addBooKToReadingList = async (payload: IReadingList) => {
  const results = await ReadingList.create(payload)
  if (!results) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'user can not created')
  }

  return results
}
const getBooKsOfReadingList = async (payload: Partial<IReadingList>) => {
  const { userEmail } = payload

  const results = await ReadingList.find({
    userEmail: userEmail,
  })
  if (!results) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'user can not created')
  }

  return results
}

export const ReadingListService = {
  addBooKToReadingList,
  getBooKsOfReadingList,
}
