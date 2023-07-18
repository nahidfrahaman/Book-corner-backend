/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import { BookSearchableFields } from './book.constant'

import { IBook, IBookFilters } from './book.interface'
import { Book } from './book.model'

const createBook = async (payload: IBook) => {
  const results = await Book.create(payload)
  return results
}
const getAllBook = async (
  filters: IBookFilters,
  paginationOption: IPaginationOption,
) => {
  const { page, limit, skip } =
    paginationHelper.calculatePagination(paginationOption)

  const { searchTerm, ...filtersData } = filters

  type Condition = {
    $or?: { [key: string]: { $regex: string; $options: string } }[]
    $and?: { [key: string]: unknown }[]
  }

  const andCondition: Condition[] = []

  if (searchTerm) {
    andCondition.push({
      $or: BookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}

  const results = await Book.find(whereCondition).skip(skip).limit(limit)

  const total = await Book.countDocuments()
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: results,
  }
}

const getAllofBook = async (filters: IBookFilters) => {
  const { searchTerm, ...filtersData } = filters

  type Condition = {
    $or?: { [key: string]: { $regex: string; $options: string } }[]
    $and?: { [key: string]: unknown }[]
  }

  const andCondition: Condition[] = []

  if (searchTerm) {
    andCondition.push({
      $or: BookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}

  const results = await Book.find(whereCondition)
  return results
}

const updateBook = async (id: string, updatedData: Partial<IBook>) => {
  const results = await Book.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  })
  if (!results) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'updated failed')
  }
  return results
}

const deleteBook = async (id: string) => {
  const results = await Book.findByIdAndDelete(id)
  return results
}
const getSingleBook = async (id: string) => {
  const results = await Book.findById(id)
  return results
}
const postComments = async (id: string, comments: any) => {
  const results = await Book.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: comments.reviews } },
  )
  let updatedResults
  if (results) {
    updatedResults = await Book.findById(id)
  }
  return updatedResults
}
const getComments = async (id: string) => {
  const ids = new mongoose.Types.ObjectId(id)
  const agg = [
    {
      $match: {
        _id: ids,
      },
    },
    {
      $project: {
        _id: 0,
        reviews: 1,
      },
    },
  ]

  const results = await Book.aggregate(agg)

  return results[0]
}

export const BookService = {
  createBook,
  getAllBook,
  getAllofBook,
  getSingleBook,
  updateBook,
  deleteBook,
  postComments,
  getComments,
}
