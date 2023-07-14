import { Document, Model } from 'mongoose'

export type IAuthUser = {
  userName: string
  password?: string
}

export type AuthModel = Model<IAuthUser & Document>

export type IRfreshResponse = {
  accessToken: string | undefined
}
