import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { BookRoute } from '../modules/book/book.route'
import { ReadinListRoutes } from '../modules/readinlist/readinglist.route'
import { UserRoute } from '../modules/user/user.routes'
import { WishListRoutes } from '../modules/wishlist/wishlist.routes'

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
  {
    path: '/readinglist',
    route: ReadinListRoutes,
  },
  {
    path: '/wishlist',
    route: WishListRoutes,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
