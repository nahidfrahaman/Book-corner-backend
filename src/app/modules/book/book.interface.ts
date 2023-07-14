import { Model } from 'mongoose'

export type IBook = {
  title: string
  author: string
  genre: string
  publicationDate: Date
  reviews: []
}

export type BookModel = Model<IBook>

export type IBookFilters = {
  searchTerm?: string
  title?: string
  author?: string
  genre?: string
  publicationDate?: Date
}
