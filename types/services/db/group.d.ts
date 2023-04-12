import { BeAnObject, DocumentType } from '@typegoose/typegoose/lib/types'
import * as entities from '@/server/entities'

export declare type Group = DocumentType<entities.Group, BeAnObject>

export declare type NewGroup = Partial<Pick<Group, 'name' | 'description' | 'level'>>