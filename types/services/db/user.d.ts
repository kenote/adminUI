import { ObjectId } from 'mongoose'
import { BeAnObject, DocumentType } from '@typegoose/typegoose/lib/types'
import * as entities from '@/server/entities'

export declare type User = DocumentType<entities.User, BeAnObject>

export declare type Register = Partial<Pick<User, 'username' | 'email' | 'mobile'> & {
  /**
   * 用户提交的密码
   */
  password      ?: string
  /**
   * 用户组
   */
  group          : ObjectId | string
}>

export declare type NewUser = Partial<Pick<User, 'username' | 'email' | 'mobile' | 'encrypt' | 'salt'>>

export declare type SafeUser = Omit<User, 'encrypt' | 'salt'>