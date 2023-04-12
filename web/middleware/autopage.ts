import { Context } from '@nuxt/types'
import { get } from 'lodash'
import { getChannelKey } from '@kenote/common'
import ruleJudgment from 'rule-judgment'
import { Channel } from '@/types/client'
import { isFilter } from '@kenote/element-ui'
import type { DB } from '@/types/services'

export default async (context: Context) => {
  let { store, redirect, route, error } = context
  let auth = <DB.user.SafeUser | null> get(store.state, 'auth.auth')
  let navigator = <Channel.DataNode[]> get(store.state, 'setting.navigator')
  // 检查导航路由
  let channelId = getChannelKey(navigator, route.path, 'route')
  if (!channelId) {
    return error({ statusCode: 404, message: 'This page could not be found' })
  }
  // 检查访问权限
  let channel = navigator.find( ruleJudgment({ key: channelId }))
  if (channel) {
    let isAccess = ruleJudgment<Channel.DataNode>({ $where: item => isFilter()(item.conditions ?? {}, { auth }) })(channel)
    if (!isAccess) {
      return error({ statusCode: 404, message: 'This page could not be found' })
    }
  }
}