import { Schema, model } from 'mongoose'
import { IWishList, WishListModel } from './wishlist.interface'

export const WishListSchema = new Schema<IWishList, WishListModel>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const WishList = model<IWishList, WishListModel>(
  ' WishList',
  WishListSchema,
)
