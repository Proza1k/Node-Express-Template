import Sequelize from 'sequelize'
import { DATABASE } from '../tools/environment'
import { logger } from '../tools/logger'
import { Model } from './types'

const connect = (): Model => {
  logger(`Database connection statused:`)
  const sequelize = new Sequelize.Sequelize(DATABASE.name, DATABASE.user, DATABASE.password, {
    dialect: DATABASE.dialect as any,
    host: DATABASE.host,
    port: DATABASE.port,
    define: {
      timestamps: false,
    },
  })

  const opts = DATABASE.options

  sequelize
    .sync()
    .then(() => {
      logger(`Database connection is success`)
    })
    .catch((error) => {
      logger(`Database connection is error: ${error}`)
    })

  return {}
}

export const getDatabase = (): Model => {
    const db: Model = connect()

    return db
}
