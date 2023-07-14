import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { IUser } from './user.interface'
import { UserService } from './user.service'

const creatUser = catchAsync(async (req: Request, res: Response) => {
  const createdBookData = req.body

  const results = await UserService.createUser(createdBookData)

  sendSuccessResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created Successfuly',
    data: results,
  })
})

export const UserController = {
  creatUser,
}
