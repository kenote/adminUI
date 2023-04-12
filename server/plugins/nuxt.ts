import type { IModule } from '@kenote/core'
import { toRequestHandler } from '@kenote/koa'
import nuxtConfig from '@/nuxt.config'
import { Nuxt } from '@nuxt/core'
import { Builder } from '@nuxt/builder'
import { merge, omit } from 'lodash'
import { NuxtServer } from '@/types/restful'
import { verifyJwToken } from '~/middlewares/auth'
import { db, getNavigator } from '~/services'
import { loadConfig } from '@kenote/config'
import type { ServerConfigure, AccountConfigure } from '@/types/config'

const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt(merge(nuxtConfig, { dev: !isProd }))

export default <IModule.ssrPlugin> {
  handler: [
    toRequestHandler((ctx, next) => {
      let isWebPage = !/^(\/\_nuxt|\/__webpack_hmr)|(\.ico|\.png)$/.test(ctx.path)
      if (isWebPage) {
        let { siteUrl, wssUrl, port, copyright, icps } = loadConfig<ServerConfigure>('config/server', { mode: 'merge' })
        let { login, applications } = loadConfig<AccountConfigure>('config/account', { mode: 'merge' })
        ctx.payload = <NuxtServer.Payload> {
          site_url: siteUrl ?? `http://localhost:${port}`,
          wss_url: wssUrl ?? `ws://localhost:${port}`,
          copyright,
          icps,
          account: {
            login,
            applications: applications?.map( v=> omit(v, ['clientID', 'clientSecret', 'callbackURL']))
          },
          navigator: getNavigator(),
          
          getAuthInfo: async (token: string) => {
            let payload = verifyJwToken(token)
            if (payload) {
              let user = await db.user.Dao.findOne({ _id: payload._id, jw_token: token })
              let authInfo: NuxtServer.AuthInfo = {
                user: db.user.safeUser(user)
              }
              return authInfo
            }
            return null
          }
        }
      }
      return next()
    }),
    toRequestHandler(ctx => {
      ctx.status(200)
      ctx.context.respond = false
      ctx.req['$__payload'] = ctx.payload
      ctx.req.ctx = ctx.context
      nuxt.render(ctx.req, ctx.res)
    })
  ],
  async prescript () {
    await nuxt.ready()
    if (!isProd) {
      let builder = new Builder(nuxt)
      await builder.build()
    }
  }
}