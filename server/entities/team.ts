import { Field, ObjectType } from 'type-graphql'
import { pre, prop, mongoose, modelOptions, Ref } from '@typegoose/typegoose'
import { updatecCounter, ModelOptions } from './counter'
import User from './user'

@ObjectType()
@pre<Team>('save', async function(next) {
  try {
    if (this.isNew) {
      let counts = await updatecCounter('team')
      this.id = counts
    }
  } catch (error) {
    return next(error)
  }
})
@modelOptions(ModelOptions)
export default class Team {

  @Field({ nullable: true, description: 'ID' })
  @prop({ unique: true })
  public id!: number

  @Field({ nullable: true, description: '团队名' })
  @prop({ required: true })
  public name!: string

  @Field({ nullable: true, description: '简介' })
  @prop()
  public description!: string

  @Field(() => [Number], { nullable: true, description: '频道入口' })
  @prop({ type: mongoose.Schema.Types.Mixed, default: [] })
  public platform!: number[]

  @Field(() => [String], { nullable: true, description: '访问权限' })
  @prop({ type: mongoose.Schema.Types.Mixed, default: [] })
  public access!: string[]

  @Field(() => User, { nullable: true, description: '团长' })
  @prop({ ref: 'User', type: mongoose.Schema.Types.ObjectId })
  public owner!: Ref<User>

}