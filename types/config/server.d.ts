import Redis from 'ioredis'
import { mongoose } from '@typegoose/typegoose'

export declare type ServerConfigure = {
  /**
   * 应用名称
   */
  name                 : string
  /**
   * 主机IP
   */
  host                ?: string
  /**
   * 主机端口
   */
  port                ?: number
  /**
   * 站点名称
   */
  siteName            ?: string
  /**
   * 站点Url
   */
  siteUrl             ?: string
  /**
   * Websocket 地址
   */
  wssUrl              ?: string
  /**
   * Secret Key
   */
  secretKey            : string
  /**
   * MongoDB
   */
  mongoOpts           ?: ServerConfigure.mongoDB
  /**
   * Redis
   */
  redisOpts           ?: Redis.RedisOptions
}
& ServerConfigure.Copyright

export declare namespace ServerConfigure {

  interface mongoDB {
    /**
     * 连接 URI
     */
    uris       : string
    /**
     * Options
     */
    options   ?: mongoose.ConnectionOptions
  }

  interface Copyright {
    /**
     * 版权信息
     */
    copyright   ?: string
    /**
     * ICP证/备
     */
    icps        ?: string[]
  }
}