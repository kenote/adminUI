import session from '@kenote/koa-session'
import { serverConfigure } from '~/config'
import redisStore from 'koa-redis'

export default session({
  key: serverConfigure?.secretKey,
  store: redisStore(serverConfigure?.redisOpts),
})
