import { modelDao } from '@kenote/mongoose'
import { getModelForClass } from '@typegoose/typegoose'
import * as entities from '~/entities'
import { FilterQuery, Model, Document } from 'mongoose'
import type { DB } from '@/types/services'
// import * as user from './user'

export const model = getModelForClass(entities.Group)
export const Dao = modelDao<DB.group.Group>(model as unknown as Model<Document, {}>, {})

/**
 * 获取最大/最小等级用户组
 * @param tag 
 * @returns 
 */
export async function getGroup (tag: 'min' |'max') {
  let [ item ] = await model.aggregate([
    {
      $group: {
        _id: { _id: '$_id', id: '$id', name: '$name', level: '$level', description: '$description', platform: '$platform', access: '$access', store: '$stroe' },
        [`level_${tag}`]: { [`$${tag}`]: '$level' }
      }
    },
    { $limit: 1 }
  ])
  return item
}