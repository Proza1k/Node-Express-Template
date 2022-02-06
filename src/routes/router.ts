import express, { Router, Request, Response, RequestHandler } from 'express'
import { logger } from '../tools/logger'
import { getStatus } from './status'
import { Route, RouterPayload } from './types'

export enum RoutePath {
  status = '/status',
}

const setupRoute = <T>(router: Router, route: Route<T>): void => {
  if (route.isEnabled) {
    logger(route.path)

    router[route.type](route.path, (request: Request, response: Response) => {
      logger(route)
      route.callback(request, response, route.option)
    })
  }

  logger({ path: route.path, status: route.isEnabled })
}

const initRoutes = (router: Router, routes: Route<unknown>[]) => {
  routes.forEach((route) => {
    setupRoute(router, route)
  })

  return router
}

export const setupRoutes = (payload: RouterPayload): RequestHandler => {
  const { routes, database } = payload

  const router = express.Router()

  return initRoutes(router, routes)
}

export const routes = [getStatus()]
