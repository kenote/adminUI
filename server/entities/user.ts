import { Field, ObjectType } from 'type-graphql'
import { pre, prop, mongoose, modelOptions, Ref } from '@typegoose/typegoose'
import { updatecCounter, ModelOptions } from './counter'
import Group from './group'
import Team from './team'

@ObjectType()
@pre<User>('save', async function(next) {
  try {
    if (this.isNew) {
      let counts = await updatecCounter('user')
      this.id = counts
    }
  } catch (error) {
    return next(error)
  }
})
@modelOptions(ModelOptions)
export default class User {

  @Field({ nullable: true, description: 'ID' })
  @prop({ unique: true })
  public id!: number

  @Field({ nullable: true, description: '用户名' })
  @prop({ required: true })
  public username!: string

  @Field({ nullable: true, description: '昵称' })
  @prop()
  public nickname!: string

  @Field({ nullable: true, description: '头像' })
  @prop()
  public avatar!: string

  @Field({ nullable: true, description: 'E-Mail' })
  @prop()
  public email!: string

  @Field({ nullable: true, description: '性别' })
  @prop({ default: 0 })
  public sex!: number

  @Field({ nullable: true, description: '手机号' })
  @prop()
  public mobile!: string

  @Field({ nullable: true, description: '加密值' })
  @prop()
  public encrypt!: string

  @Field({ nullable: true, description: '附加码' })
  @prop()
  public salt!: string

  @Field({ nullable: true, description: 'JWToken' })
  @prop()
  public jw_token!: string

  @Field(() => [String], { nullable: true, description: '绑定属性' })
  @prop({ type: mongoose.Schema.Types.Mixed, default: [] })
  public binds!: string[]

  @Field(() => Group, { nullable: true, description: '用户组' })
  @prop({ ref: Group })
  public group!: Ref<Group>

  @Field(() => [Team], { nullable: true, description: '加入的团队' })
  @prop({ ref: Team })
  public teams!: Array<Ref<Team>>

  @Field({ nullable: true, description: '创建时间' })
  @prop({ type: Date, default: new Date() })
  public create_at!: Date

  @Field({ nullable: true, description: '更新时间' })
  @prop({ type: Date, default: new Date() })
  public update_at!: Date

}