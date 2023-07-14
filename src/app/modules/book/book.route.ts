import express from 'express'
import auth from '../../middlewares/auth'
import { BookController } from './book.controller'

const router = express.Router()

router.post('/create-book', BookController.createBook)
router.get('/get-books', auth(), BookController.getAllBook)
router.patch('/update/:id', BookController.updateBook)
router.delete('/delete/:id', BookController.deleteBook)

export const BookRoute = router
