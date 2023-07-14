import express from 'express'
import { BookController } from './book.controller'

const router = express.Router()

router.post('/create-book', BookController.createBook)
router.get('/get-books', BookController.getAllBook)

export const BookRoute = router