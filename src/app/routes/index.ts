import express from 'express'
import { BookRoute } from '../modules/book/book.route'

const router = express.Router()

const routes = [
  {
    path: '/book',
    route: BookRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
