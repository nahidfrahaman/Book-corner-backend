import { StatusCodes } from 'http-status-codes'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (payload: IUser) => {
  const results = await User.create(payload)
  if (!results) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'user can not created')
  }
  const { password, ...usersData } = results.toObject()
  return usersData
}

export const UserService = {
  createUser,
}
