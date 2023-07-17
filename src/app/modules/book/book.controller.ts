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
    message: ' book  data retrive Successfuly',
    data: results,
  })
})
const getAllOfBooks = catchAsync(async (req: Request, res: Response) => {
  const filtersData = pick(req.query, [
    'searchTerm',
    'genre',
    'publicationDate',
  ])
  const results = await BookService.getAllofBook(filtersData)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book data retrive Successfuly',
    data: results,
  })
})

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updateData = req.body
  const results = await BookService.updateBook(id, updateData)

  sendSuccessResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated Successfuly',
    data: results,
  })
})
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const results = await BookService.deleteBook(id)

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted Successfuly',
    data: results,
  })
})
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const results = await BookService.getSingleBook(id)

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted Successfuly',
    data: results,
  })
})

export const BookController = {
  createBook,
  getAllBook,
  getAllOfBooks,
  getSingleBook,
  updateBook,
  deleteBook,
}
