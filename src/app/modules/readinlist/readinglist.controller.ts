import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { ReadingListService } from './readinglist.service'

const addBooKToReadingList = catchAsync(async (req: Request, res: Response) => {
  const createdBookData = req.body

  const results = await ReadingListService.addBooKToReadingList(createdBookData)

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book added reading list Successfuly',
    data: results,
  })
})

const getBooKsOfReadingList = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const email = id

    const results = await ReadingListService.getBooKsOfReadingList(email)

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'reading list retrive Successfuly',
      data: results,
    })
  },
)

export const ReadingListController = {
  addBooKToReadingList,
  getBooKsOfReadingList,
}
