import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '../'
import type { ServerConfigure, AccountConfigure } from '@/types/config'
import type { LinkInfo, Channel } from '@/types/client'
import { toLink } from '~/utils/tools'
import ruleJudgment from 'rule-judgment'

export const name = 'setting'

export const types = {
  SITEURL         : 'SITEURL',
  WSSURL          : 'WSSURL',
  TITLE           : 'TITLE',
  COPYRIGHT       : 'COPYRIGHT',
  ACCOUNT         : 'ACCOUNT',
  NAVIGATOR       : 'NAVIGATOR',
  SELECTCHANNEL   : 'SELECTCHANNEL',
  LOADING         : 'LOADING',
}

export type State = {
  site_url       ?: string
  wss_url        ?: string
  pageTitle      ?: string
  copyright      ?: string
  icps           ?: LinkInfo[]
  account        ?: AccountConfigure
  navigator      ?: Channel.DataNode[]
  channelId      ?: string | null
  loading         : Record<string, boolean>
}

export const namespaced = true

/**
 * State
 * @returns 
 */
export const state: () => State = () => ({
  channelId: '0',
  loading: {
    channel: false
  }
})

/**
 * Getter
 */
export const getters: GetterTree<State, RootState> = {
  selectedChannel: state => state.navigator?.find( ruleJudgment({ key: state.channelId }))
}

export interface Actions<S, R> extends ActionTree<S, R> {
  selectChannel(context: ActionContext<S, R>, channelId?: string | null): Promise<void>
}

/**
 * Action
 */
export const actions: Actions<State, RootState> = {
  async selectChannel ({ commit }, channelId) {
    commit(types.LOADING, 'channel')
    setTimeout(() => {
      commit(types.SELECTCHANNEL, channelId)
      Promise.resolve(null)
    }, 300)
  }
}

/**
 * Mutation
 */
export const mutations: MutationTree<State> = {
  [types.SITEURL] (state, site_url: string) {
    state.site_url = site_url
  },
  [types.WSSURL] (state, wss_url: string) {
    state.wss_url = wss_url
  },
  [types.TITLE] (state, title: string) {
    state.pageTitle = title
  },
  [types.COPYRIGHT] (state, copy: ServerConfigure.Copyright) {
    state.copyright = copy.copyright
    state.icps = copy.icps?.map(toLink)
  },
  [types.ACCOUNT] (state, account: AccountConfigure) {
    state.account = account
  },
  [types.NAVIGATOR] (state, navigator: Channel.DataNode[]) {
    state.navigator = navigator
  },
  [types.LOADING] (state, key: string) {
    state.loading[key] = true
    if (key == 'channel') {
      state.channelId = '0'
    }
  },
  [types.SELECTCHANNEL] (state, channelId?: string | null) {
    state.channelId = channelId
    state.loading['channel'] = false
  }
}