import { routes } from './routes/router'
import { DEFAULT_PREFIX, PORT } from './tools/environment'
import { loggerWithDate } from './tools/logger'
import { initExpress } from './tools/setup'

const initServer = async () => {
  initExpress(
    {
      router: {
        enabled: true,
        prefix: DEFAULT_PREFIX,
        view: {
          enabled: true,
        },
      },
      listen: {
        enabled: true,
        callback: () => {
          loggerWithDate(`Service started on port: ${PORT}`)
        },
      },
      port: parseInt(PORT, 10),
    },
    routes,
  )
}

initServer()
