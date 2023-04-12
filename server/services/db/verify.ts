import { modelDao } from '@kenote/mongoose'
import { getModelForClass } from '@typegoose/typegoose'
import * as entities from '~/entities'
import { FilterQuery, Model, Document } from 'mongoose'
import type { DB } from '@/types/services'
import uuid from 'uuid'
import { ErrorCode, httpError, Bcrypt } from '~/services'

export const model = getModelForClass(entities.Verify)
export const Dao = modelDao<DB.verify.Verify>(model as unknown as Model<Document, {}>, {
  populate: {
    path: 'user',
    select: [ 'id', 'username', 'email', 'mobile', 'nickname', 'avatar', 'sex', 'binds', 'group', 'teams', 'access', 'create_at', 'update_at', 'jw_token' ]
  }
})


/**
 * 创建验证码/校验码
 * @param verify 
 * @returns 
 */
export async function create (verify: DB.verify.EditDocument) {
  if (verify.type === 'email') {
    verify.token = uuid.v4().replace(/\-/g, '')
  }
  else {
    verify.token = Bcrypt.verifyCode()
  }
  verify.create_at = new Date()
  verify.update_at = new Date()
  let result = await Dao.create(verify)
  return result
}