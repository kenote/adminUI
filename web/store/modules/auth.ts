import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '../'
import type { DB } from '@/types/services'

export const name = 'auth'

export const types = {
  AUTH            : 'AUTH',
  TIMESTAMP       : 'TIMESTAMP',
}

export interface State {
  auth           ?: DB.user.SafeUser | null
  timestamp      ?: number
}

export const namespaced = true

/**
 * State
 * @returns 
 */
export const state: () => State = () => ({
  
})

/**
 * Getter
 */
export const getters: GetterTree<State, RootState> = {
  // 提取账号Token
  token: state => state.auth?.jw_token,
  // 提取账号等级
  authLevel: state => state.auth?.group?.['level'] ?? 0
}

export interface Actions<S, R> extends ActionTree<S, R> {

}

/**
 * Action
 */
export const actions: Actions<State, RootState> = {

}

/**
 * Mutation
 */
export const mutations: MutationTree<State> = {
  [types.AUTH] (state, auth: DB.user.SafeUser) {
    state.auth = auth
    state.timestamp = Date.now()
  }
}