/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose'

export type IUser = {
  id?: ObjectId
  userName: string
  password: string

  name: {
    firstName: string
    lastName: string
    middleName?: string
  }
  email: string
}

export type UserModel = {
  isUserExist(userName: string): Promise<IUser>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
} & Model<UserModel>

// export type UserModel = Model<IUser>;

export type IUserFilters = {
  searchTerm?: string
  id?: string
  budget?: number
  address?: string
  role?: string
}
