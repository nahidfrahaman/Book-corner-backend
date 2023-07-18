import express from 'express'
import auth from '../../middlewares/auth'
import { BookController } from './book.controller'

const router = express.Router()

router.post('/create-book', auth(), BookController.createBook)
router.get('/get-books', BookController.getAllBook)
router.get('/all-books', BookController.getAllOfBooks)
router.patch('/update/:id', auth(), BookController.updateBook)
router.delete('/delete/:id', BookController.deleteBook)
router.get('/get-books/:id', BookController.getSingleBook)
router.post('/comment/:id', BookController.postComments)
router.get('/comment/:id', BookController.getComments)

export const BookRoute = router
