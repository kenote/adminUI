import http from 'http'
import { ServerFactory } from '@kenote/core'
import { ServiceEngine } from '@kenote/koa'
import appModule from './app.module'
import { serverConfigure } from './config'
import { logger } from './services'
import * as mongoose from './services/mongoose'

async function bootstarp () {
  let { host, port, secretKey, mongoOpts } = serverConfigure
  await mongoose.connect(mongoOpts)

  let factory = await ServerFactory(new ServiceEngine({ keys: [secretKey] })).create(appModule)
  let server = http.createServer(factory.server)

  server.listen(port, host, () => {
    logger.info('Http Server Running to http://%s:%d', host, port)
  })
}

bootstarp()