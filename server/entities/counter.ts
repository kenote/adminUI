import { prop, getModelForClass, Severity } from '@typegoose/typegoose'
import { IModelOptions } from '@typegoose/typegoose/lib/types'

export const ModelOptions: IModelOptions = { 
  schemaOptions: { 
    timestamps: true 
  }, 
  options: { 
    allowMixed: Severity.ALLOW 
  } 
}

export default class Counter {

  @prop({ required: true })
  public name!: string

  @prop({ default: 0 })
  public seq!: number
}

export async function updatecCounter (name: string) {
  let model = getModelForClass(Counter)
  let counter = await model.findOneAndUpdate({ name }, { $inc: { seq: 1 }}, { new: true, upsert: true })
  return counter.seq
}