import type { IncomingMessage } from 'http'
import type { HttpError } from 'http-errors'
import { DB } from './services'
import { ServerConfigure, AccountConfigure } from './config'
import { Channel } from './client'

export declare interface Restful {
  /**
   * 调用 API 出口
   * @param data
   * @param error
   */
  api (data: any, error?: HttpError): void
  /**
   * 返回 404 Not Found.
   */
  notfound (): Promise<void>
  /**
     * 获取客户端 IP
     */
  clientIP: string
  /**
   * 获取 JWT Token
   */
  jwToken: string
  /**
   * 获取 JWT 用户
   */
  jwtUser (): Promise<DB.user.SafeUser | undefined>
  /**
   * JWT 登录
   * @param user 
   */
  jwtLogin (user: DB.user.User): Promise<DB.user.SafeUser>
  /**
   * 过滤用户等级
   * @param level -- 需要操作的用户等级
   * @param minLevel -- 限制最低等级
   */
  filterUserLevel (level: number, minLevel: number): void
}

export declare interface NuxtServer {
  req: IncomingMessage & { $__payload: NuxtServer.Payload }
}

export declare namespace NuxtServer {

  type Payload = {
    /**
     * 站点 URL
     */
    site_url     ?: string
    /**
     * Websocket 地址
     */
    wss_url      ?: string
    /**
     * 获取账号信息
     */
    getAuthInfo   : (token: string) => Promise<AuthInfo | null>
    /**
     * 账号配置
     */
    account       : AccountConfigure<'login'>
    /**
     * 频道导航器
     */
    navigator     : Channel.DataNode[]
  } 
  & ServerConfigure.Copyright

  interface AuthInfo {
    user     ?: Partial<DB.user.SafeUser> | null
  }
}