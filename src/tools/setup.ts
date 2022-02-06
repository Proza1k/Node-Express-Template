import express, { Express, RequestHandler } from 'express'
import { getDatabase } from '../database/helper'
import { setupRoutes } from '../routes/router'
import { Route } from '../routes/types'
import { Setting } from '../types'

export const setupExpress = (): Express => express()

export const setupCallback = (payload: Setting): (() => void) => {
  if (payload.enabled) {
    return payload.callback
  }

  return null
}

export const setupRequestHandler = (
  setting: Setting,
  handler: (payload?: unknown) => RequestHandler | RequestHandler[],
): RequestHandler | RequestHandler[] => {
  const { enabled, payload } = setting

  if (enabled) {
    return handler(payload)
  }

  return null
}

export const initExpress = (configuration, routes: Route<unknown>[]) => {
  const app = setupExpress()
  const database = getDatabase()

  return app
    .use(
      configuration.router.prefix,
      setupRequestHandler(
        {
          ...configuration.router,
          payload: {
            database,
            routes,
            app,
          },
        },
        setupRoutes,
      ),
    )
    .listen(configuration.port, setupCallback(configuration.listen))
}
