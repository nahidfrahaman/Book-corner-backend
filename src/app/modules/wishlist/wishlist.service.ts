import { StatusCodes } from 'http-status-codes'
import ApiError from '../../../errors/ApiError'
import { IWishList } from './wishlist.interface'
import { WishList } from './wishlist.model'

const addBooKToWishList = async (payload: IWishList) => {
  const results = await WishList.create(payload)
  if (!results) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'user can not created')
  }

  return results
}
const getBooKsOfWishList = async (email: string) => {
  const results = await WishList.find({
    userEmail: email,
  })
  if (!results) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'user can not created')
  }

  return results
}

export const WishListService = {
  addBooKToWishList,
  getBooKsOfWishList,
}
