import { loadConfig } from '@kenote/config'
import { OpenAI, AccountConfigure } from '@/types/config'
import ruleJudgment from 'rule-judgment'
import { shellAsCurl, fetchToShell } from '@kenote/api-proxy'
import type { Method } from '@kenote/common'
import { ErrorCode, httpError } from '~/services'
import { isArray, remove } from 'lodash'
import jsYaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

const rootDir = path.resolve(process.cwd(), 'config/openai')

/**
 * 调用 OpenAI 接口
 * @param name 
 * @returns 
 */
export function API (name?: string) {
  return async (apiPath: string, method: Method = 'GET', payload?: NodeJS.Dict<any>) => {
    let { apiKeyName, baseUrl } = loadConfig<OpenAI.Configure>('config/openai', { mode: 'merge' })
    let apiKey = getApiKey(name ?? apiKeyName)
    if (!apiKey) {
      throw httpError(ErrorCode.ERROR_CUSTOMIZE_DATA, ['找不到 OpenAI 的 API key'])
    }
    console.log(fetchToShell({
      method: method ?? 'GET',
      url: `${baseUrl}${apiPath}`,
      headers: {
        authorization: `Bearer ${apiKey?.value}`,
        "content-type": "application/json"
      },
      body: payload
    }))
    let ret = await shellAsCurl({
      method: method ?? 'GET',
      url: `${baseUrl}${apiPath}`,
      headers: {
        authorization: `Bearer ${apiKey?.value}`,
        "content-type": "application/json"
      },
      body: payload
    })
    let [ , code ] = ret.status?.split(/\s+/) ?? []
    if (code != '200') {
      throw httpError(ErrorCode.ERROR_CUSTOMIZE_DATA, [['HttpProxy:', ret.status?.replace('404 OK', '404 Not Found')! ].join('')])
    }
    return ret.body?.toString()
  }
  
}

/**
 * 获取 API Keys
 * @param name 
 * @returns 
 */
export function getApiKey (name: string) {
  let { apiKeys } = loadConfig<OpenAI.Configure>('config/openai', { mode: 'merge' })
  let filter = ruleJudgment<{name: string, value: string}>({ name: { $eq: name } })
  return apiKeys.find(filter)
}

/**
 * 获取配置
 * @returns 
 */
export function getSetting () {
  return loadConfig<OpenAI.Configure>('config/openai', { mode: 'merge' })
}

/**
 * 更新配置
 * @param type 
 * @param store 
 * @returns 
 */
export function setSetting (type: 'baseurl' | 'alias' | 'create' | 'edit' | 'remove' | 'multi', store: string | string[]) {
  // baseurl | default | create | edit | remove
  // ('baseurl', 'https://api.openai.com')
  // ('alias', 'default')
  // ('create', ['test', 'sk-x3nBy5cB'])
  // ('edit', ['test', 'sk-x3nBy5cB', 0])
  // ('remove', [0, 1])
  let setting = getSetting()
  let [ name, value, index ] = isArray(store) ? store : [store]
  switch (type) {
    case 'baseurl':
      setting.baseUrl = name
      fs.writeFileSync(path.resolve(rootDir, 'config.release.yml'), jsYaml.dump(setting), 'utf-8')
      break
    case 'alias':
      setting.apiKeyName = name
      fs.writeFileSync(path.resolve(rootDir, 'config.release.yml'), jsYaml.dump(setting), 'utf-8')
      break
    case 'create':
      setting.apiKeys.push({ name, value })
      fs.writeFileSync(path.resolve(rootDir, 'config.release.yml'), jsYaml.dump(setting), 'utf-8')
      break
    case 'edit':
      setting.apiKeys[index] = { name, value }
      fs.writeFileSync(path.resolve(rootDir, 'config.release.yml'), jsYaml.dump(setting), 'utf-8')
      break
    case 'remove':
      remove(setting.apiKeys, (n, i) => Array(store).map(Number).includes(i))
      fs.writeFileSync(path.resolve(rootDir, 'config.release.yml'), jsYaml.dump(setting), 'utf-8')
      break
    case 'multi':
      let data = jsYaml.load(name)
      fs.writeFileSync(path.resolve(rootDir, 'config.release.yml'), jsYaml.dump(data), 'utf-8')
      break
    default:
      break
  }
  return setting
}