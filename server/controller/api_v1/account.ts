import { Context, Controller, NextHandler, Get, Post, Put } from '@kenote/core'
import { isArray } from 'lodash'
import * as filter from '~/filters/api_v1'
import { authenticate } from '~/plugins/passport'
import { Account } from '@/types/account'
import { DB } from '@/types/services'

@Controller('/account')
export default class AccountController {

  /**
   * 登录
   */
  @Post('/login', { filters: [ filter.account.login ]})
  async login (ctx: Context, next: NextHandler) {
    let { nextError, db } = ctx.service
    try {
      let result = await db.user.login(ctx.payload)
      if (isArray(result)) {
        let users = result.map( v => db.user.safeUser(v) )
        let application = JSON.stringify(users.map( r => r?._id ))
        let verify = await db.verify.create({ type: 'login', application })
        let data = <Account.uuidResult<DB.user.SafeUser[]>>{
          uuid: verify.token,
          result: users
        }
        return ctx.api(data)
      }
      let user = await ctx.jwtLogin(result)
      return ctx.api(user)
    } catch (error) {
      nextError(error, ctx, next)
    }
  }

  /**
   * 选择登录 
   */
  @Put('/login/select', { filters: [ filter.account.loginSelect ]})
  async loginSelect (ctx: Context, next: NextHandler) {
    let { nextError, db } = ctx.service
    try {
      let result = await db.user.loginSlect(ctx.payload)
      let user = await ctx.jwtLogin(result)
      return ctx.api(user)
    } catch (error) {
      nextError(error, ctx, next)
    }
  }

  /**
   * 校验令牌
   */
  @Get('/accesstoken', { filters: authenticate })
  async accessToken (ctx: Context) {
    return ctx.api(ctx.user)
  }

  /**
   * 登出 
   */
  @Get('/logout', { filters: authenticate })
  async logout (ctx: Context, next: NextHandler) {
    let { nextError, db } = ctx.service
    try {
      await db.user.Dao.updateOne({ _id: ctx.user._id }, { jw_token: '' })
      ctx.logout()
      ctx.cookie('jwtoken', '')
      return ctx.api({ result: true })
    } catch (error) {
      nextError(error, ctx, next)
    }
  }
}