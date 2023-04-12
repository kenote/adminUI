
export type AccountConfigure<T extends string = 'login' | 'register'> = {
  [P in T]         : AccountConfigure.Channel
} & {
  /**
   * 第三方应用
   */
  applications    ?: AccountConfigure.Application[]
}

export declare namespace AccountConfigure {

  /**
   * 第三方应用
   */
  interface Application {
    /**
     * 应用 key
     */
    key            : string
    /**
     * 应用名称
     */
    name           : string
    /**
     * 应用图标
     */
    icon           : string
    /**
     * 应用链接
     */
    link           : string
    /**
     * 应用 ID
     */
    clientID       : string
    /**
     * 应用 Secret
     */
    clientSecret   : string
    /**
     * 应用回调地址
     */
    callbackURL    : string
    /**
     * 权限范围
     */
    permission    ?: string[]
  }

  /**
   * 功能属性
   */
  interface Feature {
    /**
     * 打开状态
     */
    open          ?: boolean
    /**
     * 名称
     */
    name          ?: string
    /**
     * 描述
     */
    description   ?: string
    /**
     * 图像
     */
    image         ?: string
    /**
     * 图像标签
     */
    alt           ?: string
  }

  /**
   * 频道设置
   */
  interface Channel {
    /**
     * 第三方应用功能
     */
    thirdParty      ?: AccountConfigure.Feature
    /**
     * 二维码功能
     */
    qrcode          ?: AccountConfigure.Feature
    /**
     * 协议描述
     */
    protocol        ?: string
    /**
     * 背景图
     */
    backgroundImg   ?: string
    /**
     * 营销活动
     */
    marketing       ?: AccountConfigure.Marketing
  }

  /**
   * 营销活动
   */
  interface Marketing {

    /**
     * 名称
     */
     name           : string
     /**
      * 图片
      */
     image          : string
     /**
      * 链接
      */
     link          ?: string
  }
}