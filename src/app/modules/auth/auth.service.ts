/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes'

import config from '../../../config'

import { JwtPayload, Secret } from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'
import { JwtHelpers } from '../../../helper/jwtHelper'
import { ILoignUser } from '../../../interfaces/sharedInterface'
import { User } from '../user/user.model'
import { IRfreshResponse } from './auth.interface'

const login = async (payload: ILoignUser) => {
  const { userName, password } = payload

  const isUserExist = await User.isUserExist(userName)

  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User does not find')
  }

  const isPassMatched = await User.isPasswordMatched(
    password,
    isUserExist.password,
  )
  if (!isPassMatched) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      'unAuthorized password does not match',
    )
  }
  const { userName: UserName, email } = isUserExist
  // create jwt access token and refresh token
  const accessToken = JwtHelpers.createToken(
    { UserName, email },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expired as string,
  )

  const refreshToken = JwtHelpers.createToken(
    { UserName, email },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expired as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string): Promise<IRfreshResponse> => {
  //verify token
  let verifyToken: string | JwtPayload | null = null
  try {
    verifyToken = JwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret,
    )
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, ' invalid refresh token')
  }

  const { UserName, email } = verifyToken as JwtPayload

  const isUserExist = await User.isUserExist(UserName)
  if (!isUserExist) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'forbidden user not found')
  }

  //generate access token  not : refreshtoken access token nibe
  const newAccessToken = JwtHelpers.createToken(
    { userName: isUserExist.userName, email: isUserExist.email },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expired as string,
  )
  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  login,
  refreshToken,
}
