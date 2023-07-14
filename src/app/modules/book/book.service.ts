import { StatusCodes } from 'http-status-codes'
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

export const BookService = {
  createBook,
  getAllBook,
  updateBook,
  deleteBook,
}
