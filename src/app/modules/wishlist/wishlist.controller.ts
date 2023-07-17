import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { WishListService } from './wishlist.service'

const addBooKTWishList = catchAsync(async (req: Request, res: Response) => {
  const createdBookData = req.body

  const results = await WishListService.addBooKToWishList(createdBookData)

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book added reading list Successfuly',
    data: results,
  })
})

const getBooKsOWishList = catchAsync(async (req: Request, res: Response) => {
  const requestedData = req.body

  const results = await WishListService.getBooKsOfWishList(requestedData)

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'reading list retrive Successfuly',
    data: results,
  })
})

export const WishListController = {
  addBooKTWishList,
  getBooKsOWishList,
}
