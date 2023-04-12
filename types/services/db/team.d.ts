import { ObjectId } from 'mongoose'
import { BeAnObject, DocumentType } from '@typegoose/typegoose/lib/types'
import * as entities from '@/server/entities'

export declare type Team = DocumentType<entities.Team, BeAnObject>