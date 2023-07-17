import { Model } from 'mongoose'

export type IWishList = {
  userEmail: string
  bookId: string
}

export type WishListModel = Model<IWishList>
