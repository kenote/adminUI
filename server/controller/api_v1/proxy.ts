import { Context, Controller, NextHandler, Get, Post, Put } from '@kenote/core'
import { APIProxy, getEntrance, getProxyResponse } from '@kenote/api-proxy'

@Controller('/')
export default class ProxyController {

  @Get('/:channel/:pathLabel?/:tag?')
  @Post('/:channel/:pathLabel?/:tag?')
  @Put('/:channel/:pathLabel?/:tag?')
  async handler (ctx: Context, next: NextHandler) {
    let { nextError, logger } = ctx.service
    let { channel, pathLabel } = ctx.params
    console.log(ctx.params)
    let entranceOptions: APIProxy.EntranceOptions<any> = {
      channel,
      pathLabel,
      sandbox: {
        service: ctx.service
      },
      getUser: () => ctx.user
    }
    try {
      let { authenticationState, entrance, isUser, notFound, payload, serviceModules, setting } = await getEntrance(entranceOptions)(ctx, 'channels')
      if (notFound) return ctx.notfound()
      if (authenticationState?.type === 'jwt' && isUser === 'Unauthorized') {
        return await ctx.status(401).send('Unauthorized')
      }
      let [ type, result ] = await getProxyResponse(entrance, payload)({ ctx, logger, serviceModules, setting })
      if (entrance?.native) {
        ctx.setHeader('content-type', entrance?.native == 'json' ? 'application/json; charset=utf-8' : type)
        return ctx.send(result)
      }
      return ctx.api(result)
    } catch (error) {
      nextError(error, ctx, next)
    }
  }
}