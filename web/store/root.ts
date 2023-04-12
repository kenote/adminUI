import { ActionContext, ActionTree, GetterTree, MutationTree }  from 'vuex'
import { RootState, Types } from './'
import { NuxtServer } from '@/types/restful'
import { getCookie } from '~/utils/tools'
import { isFunction } from 'lodash'

export interface State extends Record<string, any> {}

export const state = (): State => ({})

export const getters: GetterTree<State, RootState> = {}

export const mutations: MutationTree<State> = {}

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>, server: NuxtServer): void
}

export const actions: Actions<State, RootState> = {
  async nuxtServerInit({ commit }, { req }) {
    let { getAuthInfo, site_url, wss_url, copyright, icps, account, navigator } = req.$__payload ?? {}
    commit(Types.setting.SITEURL, site_url)
    commit(Types.setting.WSSURL, wss_url)
    commit(Types.setting.COPYRIGHT, { copyright, icps })
    commit(Types.setting.ACCOUNT, account)
    commit(Types.setting.NAVIGATOR, navigator)
    
    let jwtoken = getCookie('jwtoken', req.headers.cookie)
    if (!isFunction(getAuthInfo)) return
    try {
      let authInfo = await getAuthInfo(jwtoken)
      commit(Types.auth.AUTH, authInfo?.user)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
}
