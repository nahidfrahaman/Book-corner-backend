import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import config from '../../../config'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { AuthService } from './auth.service'

const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { ...loginData } = req.body
  const results = await AuthService.login(loginData)
  const { refreshToken, ...others } = results

  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOption)

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user login successfuly',
    data: others,
  })
})

const refreshToken = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.cookies
    const results = await AuthService.refreshToken(refreshToken)

    sendSuccessResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'user login successful',
      data: results,
    })
  },
)

export const AuthController = {
  login,
  refreshToken,
}
