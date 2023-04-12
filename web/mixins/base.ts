import { Component, Vue, Provide } from 'nuxt-property-decorator'
import { Store, Types } from '~/store'
import { DB } from '@/types/services'
import { LinkInfo } from '@/types/client'

@Component<BaseMixin>({
  name: 'base-mixin'
})
export default class BaseMixin extends Vue {

  /**
   * 账号信息
   */
  @Store.Auth.State
  auth!: DB.user.SafeUser | null

  /**
   * Json Web Token
   */
  @Store.Auth.Getter
  token!: string

  /**
   * 用户等级
   */
  @Store.Auth.Getter
  authLevel!: number

  /**
   * 页面标题
   */
  @Store.Setting.State
  pageTitle!: string

  /**
   * 版权信息
   */
  @Store.Setting.State
  copyright!: string

  /**
   * ICP证/备
   */
  @Store.Setting.State
  icps!: LinkInfo[]

  /**
   * Store.Types
   */
  @Provide()
  types: typeof Types = Types

  /**
   * 设置页面标题
   * @param title 
   */
  setPageTitle (title: string) {
    this.$store.commit(Types.setting.TITLE, title)
  }
}