import dotenv from 'dotenv'
import path from 'path'
/* This code is using the `dotenv` package to load environment variables from a `.env` file located in
the root directory of the project. process.cwd() means the root directory */
dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  database_string: process.env.URL,
  bcrypt_solt_roud: process.env.DEFAULT_SOLT_ROUND,

  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expired: process.env.JWT_EXPIRED_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expired: process.env.JWT_REFRESH_EXPIRED_IN,
  },
}
