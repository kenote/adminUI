import { ObjectId } from 'mongoose'
import { BeAnObject, DocumentType } from '@typegoose/typegoose/lib/types'
import * as entities from '@/server/entities'

export declare type Verify = DocumentType<entities.Verify, BeAnObject>

export type VerifyType = 'email' | 'mobile' | 'code' | 'login'

export declare type EditDocument = Partial<Verify & {
  /**
   * 验证类型
   */
  type           : VerifyType
  /**
   * 用户组
   */
  user          ?: ObjectId | string
}>