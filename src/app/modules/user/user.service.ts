import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (payload: IUser) => {
  const results = await User.create(payload)
  return results
}

export const UserService = {
  createUser,
}
