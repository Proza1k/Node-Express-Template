import type { Request, Response } from 'express'
import { RoutePath } from './router'
import { RequestType, Route } from './types'

export const getStatus = (): Route<unknown> => ({
  isEnabled: true,
  path: RoutePath.status,
  type: RequestType.get,
  callback: async (_request: Request, response: Response) => {
    response.send({ status: 200 })
  },
})
