const loggerPrefix = 'LOGGER-INFO:'

export const logger = (...args: unknown[]): void => {
  console.info(loggerPrefix, ...args)
}

export const loggerWithDate = (...args: unknown[]): void => {
  logger(...args, new Date())
}
