import express from 'express'
import { WishListController } from './wishlist.controller'

const router = express.Router()

router.post('/add', WishListController.addBooKTWishList)
router.get('/get', WishListController.getBooKsOWishList)

export const WishListRoutes = router
