import { ModuleTree } from 'vuex'
import { namespace } from 'nuxt-property-decorator'
import * as root from './root'
import { getStoreTypes } from '~/utils/tools'
import * as auth from './modules/auth'
import * as setting from './modules/setting'

interface ModulesStates extends Record<string, any> {}

export const strict = false

export type RootState = root.State & ModulesStates

export const Store = {
  Auth     : namespace(auth.name),
  Setting  : namespace(setting.name)
}

export const modules: ModuleTree<ModulesStates> = {
  [auth.name]    : auth,
  [setting.name] : setting
}

export const Types = {
  auth     : getStoreTypes<typeof auth.types>(auth),
  setting  : getStoreTypes<typeof setting.types>(setting)
}

export const state = () => root.state()

export const getters = root.getters

export const mutations = root.mutations

export const actions = root.actions