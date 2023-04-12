
import { compact, cloneDeep, fromPairs, get, trim } from 'lodash'
import type { LinkInfo } from '@/types/client'


/**
 * 获取 Cookie 值
 * @param name 
 * @param cookie 
 * @returns 
 */
export function getCookie (name: string, cookie?: string) {
  return get(fromPairs(compact((cookie ?? '').split(/\;/))
      .map(String)
      .map(trim)
      .map( s => s.split(/\=/) )), name)
}

/**
 * 获取模块 types，并加上分类前缀
 * @param store 
 * @returns 
 */
export function getStoreTypes<T extends {}> (store: { name: string, types: Readonly<T> }) {
  let types = cloneDeep(store.types)
  for (let [key, val] of Object.entries(types)) {
    types[key] = [ store.name, val ].join('/')
  }
  return types
}

/**
 * 转换为链接信息
 * @param text 
 * @returns 
 */
export function toLink (text: string) {
  let [ name, link, target ] = text.split(/\|/).map(trim)
  return { name, link, target } as LinkInfo
}