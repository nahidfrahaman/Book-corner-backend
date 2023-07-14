import { IBook } from './book.interface'
import { Book } from './book.model'

const createBook = async (payload: IBook) => {
  const results = await Book.create(payload)
  return results
}
const getAllBook = async () => {
  const results = await Book.find({})
  return results
}

export const BookService = {
  createBook,
  getAllBook,
}
