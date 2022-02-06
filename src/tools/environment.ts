import dotenv from 'dotenv'

dotenv.config({
  path: '.env',
})

export const getEnvKey = (name: string) => {
  const env = process.env[name]

  if (env) {
    return env
  } else {
    const error = new Error(`${name} is not .env`)

    console.error(error)
    throw error
  }
}

export const PORT = getEnvKey('PORT')
export const DEFAULT_PREFIX = getEnvKey('DEFAULT_PREFIX')

export const DATABASE = {
  host: getEnvKey('MYSQL_HOST'),
  name: getEnvKey('MYSQL_NAME'),
  user: getEnvKey('MYSQL_USER'),
  password: getEnvKey('MYSQL_PASSWORD'),
  port: Number(getEnvKey('MYSQL_PORT')),
  dialect: getEnvKey('MYSQL_DIALECT'),
  options: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  table: {}
}
