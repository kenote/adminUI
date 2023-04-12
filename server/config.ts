import path from 'path'
import { loadConfig } from '@kenote/config'
import type { ServerConfigure } from '@/types/config'

/**
 * 运行环境
 */
export const env = process.env.NODE_ENV ?? 'development'

/**
 * 服务配置
 */
export const serverConfigure = loadConfig<ServerConfigure>('config/server', { mode: 'merge' })

/**
 * 日志文件目录
 */
export const loggerDir = path.resolve(process.cwd(), 'logs')

/**
 * 静态文件目录
 */
export const staticDir = path.resolve(process.cwd(), 'static')

/**
 * 模版文件目录
 */
export const templateDir = path.resolve(process.cwd(), 'views')

/**
 * 顶级用户组权级
 */
export const MASTER_GROUP_LEVEL = 9999

/**
 * 默认用户组权级
 */
export const DEFAULT_GROUP_LEVEL = 1000

/**
 * 系统最小安全错误编号
 */
export const SYSTEM_MINSAFE_ERROR_CODE = Number(process.env.SYSTEM_MINSAFE_ERROR_CODE ?? 1000)