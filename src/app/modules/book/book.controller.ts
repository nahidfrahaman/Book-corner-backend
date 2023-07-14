import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { IBook } from './book.interface'
import { BookService } from './book.service'

const createBook = catchAsync(async (req: Request, res: Response) => {
  const createdBookData = req.body

  const results = await BookService.createBook(createdBookData)

  sendSuccessResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created Successfuly',
    data: results,
  })
})
const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const results = await BookService.getAllBook()
  sendSuccessResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow data created Successfuly',
    data: results,
  })
})

export const BookController = {
  createBook,
  getAllBook,
}
