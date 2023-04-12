import path from 'path'
import fs from 'fs'
import ruleJudgment from 'rule-judgment'
import { loadConfig } from '@kenote/config'
import { ChannelDataNode } from '@kenote/common'
import type { Channel } from '@/types/client'
import { map, orderBy } from 'lodash'

export { ErrorCode, ErrorMessage, httpError, nextError } from './error'
export { default as logger } from './logger'
export * as db from './db'
export * as Bcrypt from './bcrypt'
export * as OpenAI from './openai'

/**
 * 获取频道聚合配置
 * @param name 
 */
export function readChannelSetting<T extends ChannelDataNode<{}>> (name: string) {
  let rootDir = path.resolve(process.cwd(), 'channels')
  let isDirectory = ruleJudgment<string>({ $where: v => fs.statSync(path.resolve(rootDir, v)).isDirectory() })
  let isConfFile = ruleJudgment({ $regex: new RegExp(`^(${name}\.(ya?ml|json|js))`) })
  let channels = fs.readdirSync(rootDir).filter(isDirectory)
  let info: T[] = []
  for (let channel of channels) {
    let isFile = ruleJudgment<string>({ $where: v => fs.statSync(path.resolve(rootDir, channel, v)).isFile() })
    let file = fs.readdirSync(path.resolve(rootDir, channel)).filter(isFile).find(isConfFile)
    if (!file) continue
    let conf = loadConfig<T>(path.resolve(rootDir, channel, file))
    conf.label = conf.label ?? channel
    conf.route = conf.route ?? `/${channel}`
    conf.children = conf.children ?? []
    info.push(conf)
  }
  return info
}

/**
 * 获取导航器
 * @returns 
 */
export function getNavigator () {
  let sysNavigator = loadConfig<Channel.DataNode[]>('config/channels', { type: 'array' })
  let useNavigator = readChannelSetting<Channel.DataNode>('navigator').filter(ruleJudgment({ label: { $nin: map(sysNavigator, 'label')}}))
  let navigator = sysNavigator.concat(useNavigator)
  return orderBy(navigator, ['key'], ['asc'])
}
