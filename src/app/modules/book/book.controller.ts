import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import pick from '../../../shared/pick'

import { paginationOptions } from './book.constant'
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
  const paginationOption = pick(req.query, paginationOptions)

  const filtersData = pick(req.query, [
    'searchTerm',
    'genre',
    'publicationDate',
  ])
  const results = await BookService.getAllBook(filtersData, paginationOption)
  sendSuccessResponse(res, {
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
