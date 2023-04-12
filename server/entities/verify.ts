import { Field, ObjectType } from 'type-graphql'
import { pre, prop, mongoose, modelOptions, Ref } from '@typegoose/typegoose'
import { updatecCounter, ModelOptions } from './counter'
import User from './user'

@ObjectType()
@pre<Verify>('save', async function(next) {
  try {
    if (this.isNew) {
      let counts = await updatecCounter('verify')
      this.id = counts
    }
  } catch (error) {
    return next(error)
  }
})
@modelOptions(ModelOptions)
export default class Verify {

  @Field({ nullable: true, description: 'ID' })
  @prop({ unique: true })
  public id!: number

  @Field({ nullable: true, description: '类型' })
  @prop()
  public type!: string

  @Field({ nullable: true, description: '密钥' })
  @prop()
  public token!: string

  @Field({ nullable: true, description: '是否已校验' })
  @prop({ default: false })
  public approved!: boolean

  @Field({ nullable: true, description: '应用名称' })
  @prop()
  public application!: string

  @Field(() => User, { nullable: true, description: '关联用户' })
  @prop({ ref: User })
  public user!: Ref<User>

  @Field({ nullable: true, description: '创建时间' })
  @prop({ type: Date, default: new Date() })
  public create_at!: Date

  @Field({ nullable: true, description: '更新时间' })
  @prop({ type: Date, default: new Date() })
  public update_at!: Date

}