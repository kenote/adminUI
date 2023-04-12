import { Module, Context } from '@kenote/core'
import { staticDir, templateDir } from './config'
import session from '~/plugins/session'
import passport from '~/plugins/passport'
import restful from '~/middlewares/restful'
import rootControl from '~/controller'
import nuxt from '~/plugins/nuxt'

import ApiV1Module from '~/controller/api_v1'

@Module({
  statics: {
    '/': staticDir
  },
  options: {
    dynamic: true
  }
})
class staticModule {}

@Module({ 
  viewDir: templateDir, 
  engine: 'nunjucks', 
  extension: 'njk' 
})
class templateModule {}

@Module({
  // 模块
  imports: [ staticModule, templateModule, rootControl, ApiV1Module ],
  // 插件
  plugins: [ session, passport ],
  // 中间件
  middlewares: [ restful ],
  // SSR
  ssrPlugins: [ nuxt ],
  // 异常处理
  httpException: {
    // 404
    notFound: async (ctx: Context) => {
      return await ctx.status(404).render('error', { message: 'This page could not be found.' })
    },
    // 5xx
    exception: (err, ctx: Context) => {
      ctx.renderException('error', { message: 'This page could internal server error' })
    }
  }
})
export default class AppModule {}