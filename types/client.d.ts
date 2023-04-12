import { HeaderOptions } from '@kenote/common'
import type { AxiosRequestConfig } from 'axios'
import { ChannelDataNode, HeaderOptions, FilterQuery } from '@kenote/common'

/**
 * 链接信息
 */
export interface LinkInfo {
  /**
   * 名称
   */
  name         : string
  /**
   * 地址
   */
  link        ?: string
  /**
   * 目标
   */
  target      ?: string
}

/**
 * Http 请求选项
 */
export type HttpClientOptions = HeaderOptions<AxiosRequestConfig>

/**
 * Http 接口返回结构
 */
export interface HttpResult<T = any> {
  data   ?: T
  error  ?: string
}

/**
 * 频道模型
 */
export declare namespace Channel {

  type DataNode = ChannelDataNode<PlusNode>

  /**
   * 节点增项
   */
  interface PlusNode {
    type          ?: string
    keywords      ?: string[]
    queryer       ?: RequestConfig
    conditions    ?: FilterQuery<any> | string
  }

  /**
   * 请求选项
   */
  interface RequestConfig {
    method        ?: Method
    url           ?: string
    headers       ?: IncomingHttpHeaders
    params        ?: any
    loading       ?: boolean
    conditions    ?: FilterQuery<any> | string
    saveEnvkey    ?: string
  }
}