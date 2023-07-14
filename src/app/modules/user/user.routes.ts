import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post('/sign-up', UserController.creatUser)

export const UserRoute = router
