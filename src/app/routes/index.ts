import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { BookRoute } from '../modules/book/book.route'
import { UserRoute } from '../modules/user/user.routes'

const router = express.Router()

const routes = [
  {
    path: '/book',
    route: BookRoute,
  },
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
