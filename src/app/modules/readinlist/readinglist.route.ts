import express from 'express'
import { ReadingListController } from './readinglist.controller'

const router = express.Router()

router.post('/add', ReadingListController.addBooKToReadingList)
router.get('/get/:id', ReadingListController.getBooKsOfReadingList)

export const ReadinListRoutes = router
