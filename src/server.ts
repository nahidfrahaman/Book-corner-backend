/* eslint-disable no-console */
import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'

let server: Server

process.on('uncaughtException', error => {
  console.log(error)
  process.exit(1)
})

process.on('unhandledRejection', error => {
  if (server) {
    server.close(() => {
      console.log(error)
      process.exit(1)
    })
  }
})

process.on('SIGTERM', () => {
  if (server) {
    server.close(() => {
      console.log('Process terminated')
    })
  }
})

async function databaseConnection() {
  try {
    await mongoose.connect(config.database_string as string)
    console.log('Database connected successfully')

    server = app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('Error while connecting database: ', error)
  }
}

databaseConnection()
