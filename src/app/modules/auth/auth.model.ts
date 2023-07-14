import { Schema, model } from 'mongoose'
import { AuthModel, IAuthUser } from './auth.interface'

const AuthSchema = new Schema<IAuthUser, AuthModel>(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const AuthUser = model<IAuthUser & Document, AuthModel>(
  'AuthUser',
  AuthSchema,
)
