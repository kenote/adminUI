import { Action, Context, Middleware, Property } from '@kenote/core'
import { HttpError } from 'http-errors'
import type { Restful } from '@/types/restful'
import * as service from '~/services'
import type { DB } from '@/types/services'
import { setJwToken, verifyJwToken } from './auth'
import { get } from 'lodash'
import { MASTER_GROUP_LEVEL } from '~/config'

@Middleware()
export default class restful {

  /**
     * 调用 API 出口
     * @param data
     * @param error
     */
  @Action()
  api (ctx: Context) {
    ctx.service
    return (data: any, error?: HttpError) => {
      if (error != null) {
        let { message } = error
        ctx.json({ error: message })
      } 
      else {
        ctx.json({ data })
      }
    }
  }

  /**
   * 返回 404 Not Found.
   */
  @Action()
  notfound (ctx: Context) {
    return async () => {
      await ctx.status(404).render('error', { message: 'This page could not be found.' })
    }
  }

  /**
   * 调用 Services 接口
   */
  @Property()
  service (ctx: Context) {
    return service
  }

  /**
   * 获取客户端 IP
   */
  @Property()
  clientIP (ctx: Context) {
    return get(ctx.headers, 'x-forwarded-for') 
      ?? get(ctx.headers, 'x-real-ip') 
      ?? ctx.connection.remoteAddress 
      ?? ctx.req.socket.remoteAddress 
      ?? ctx.ip
  }

  /**
   * 获取 JWT Token
   */
  @Property()
  jwToken (ctx: Context) {
    return ctx.headers.authorization?.replace(/^(Bearer)\s{1}/, '')
  }

  /**
   * 获取 JWT 用户
   */
  @Action()
  jwtUser (ctx: Context) {
    return async () => {
      let payload = verifyJwToken(ctx.jwToken)
      if (payload) {
        let user = await service.db.user.Dao.findOne({ _id: payload._id, jw_token: ctx.jwToken })
        return service.db.user.safeUser(user)
      }
      return null
    }
  }

  /**
   * JET 登录
   */
  @Action()
  jwtLogin (ctx: Context) {
    return async (user: DB.user.User) => {
      let jw_token = setJwToken({ _id: user._id })
      ctx.cookie('jwtoken', jw_token)
      await service.db.user.Dao.updateOne({ _id: user._id }, { jw_token })
      return service.db.user.safeUser(user, { jw_token })
    }
  }

  /**
   * 过滤用户等级
   * @param level -- 需要操作的用户等级
   * @param minLevel -- 限制最低等级
   */
  @Action()
  filterUserLevel (ctx: Context) {
    return (level: number, minLevel: number) => {
      let { ErrorCode, httpError } = service
      let authLevel = ctx.user?.group.level ?? 0
      if (authLevel === MASTER_GROUP_LEVEL) return
      if (authLevel < minLevel) {
        throw httpError(ErrorCode.ERROR_ONLY_ADVANCED_ADMIN)
      }
      if (level >= authLevel) {
        throw httpError(ErrorCode.ERROR_BYLOND_LEVEL_OPERATE)
      }
    }
  }
}

/**
 * 将类型加入 Context 中
 */
declare module '@kenote/core' {
  interface Context extends Restful {
    /**
    * 调用 Services 接口
    */
    service: typeof service
  }
}