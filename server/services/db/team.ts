import { modelDao } from '@kenote/mongoose'
import { getModelForClass } from '@typegoose/typegoose'
import * as entities from '~/entities'
import { FilterQuery, Model, Document } from 'mongoose'
import type { DB } from '@/types/services'

export const model = getModelForClass(entities.Team)
export const Dao = modelDao<DB.team.Team>(model as unknown as Model<Document, {}>, {})
