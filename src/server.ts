import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, successLogger } from './shared/logger'

let server: Server

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

process.on('unhandledRejection', error => {
  if (server) {
    server.close(() => {
      errorLogger.error(error)
      process.exit(1)
    })
  }
})

process.on('SIGTERM', () => {
  if (server) {
    server.close(() => {
      successLogger.info('Process terminated')
    })
  }
})

async function databaseConnection() {
  try {
    await mongoose.connect(config.database_string as string)
    successLogger.info('Database connected successfully')

    server = app.listen(config.port, () => {
      successLogger.info(`Server is listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Error while connecting database: ', error)
  }
}

databaseConnection()
