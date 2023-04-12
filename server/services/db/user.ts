import { modelDao } from '@kenote/mongoose'
import { getModelForClass } from '@typegoose/typegoose'
import * as entities from '~/entities'
import { FilterQuery, Model, Document } from 'mongoose'
import { ErrorCode, httpError, Bcrypt } from '~/services'
import { isArray, merge, omit } from 'lodash'
import { MASTER_GROUP_LEVEL } from '~/config'
import type { DB } from '@/types/services'
import type { Account } from '@/types/account'
import * as db from './'

export const model = getModelForClass(entities.User)
export const Dao = modelDao<DB.user.User>(model as unknown as Model<Document, {}>, {
  populate: [
    {
      path: 'group',
      select: [ 'id', 'name', 'level', 'description', 'store', 'platform', 'access' ]
    }
  ]
})

/**
 * 创建新用户
 * @param reg 
 */
export async function create (reg: DB.user.Register) {
  let { username, email, mobile } = reg
  let is_username = await Dao.findOne({ username })
  if (is_username) {
    throw httpError(ErrorCode.ERROR_VALID_USERNAME_UNIQUE)
  }
  let is_email = await Dao.findOne({ email })
  if (is_email) {
    throw httpError(ErrorCode.ERROR_VALID_EMAIL_UNIQUE)
  }
  let is_mobile = await Dao.findOne({ mobile })
  if (is_mobile) {
    throw httpError(ErrorCode.ERROR_VALID_MOBILE_UNIQUE)
  }
  let password = Bcrypt.encode(reg.password ?? '')
  let user: DB.user.NewUser = merge(omit(reg, ['password']), password)
  let result = await Dao.create(user)
  return result
}

/**
 * 重置管理员密码
 * @param pass 
 * @returns 
 */
export async function administrator () {
  let user = await Dao.findOne(<any>{ $where: v => v.group?.level === MASTER_GROUP_LEVEL })
  if (!user) return
  let password = Bcrypt.randomPassword()
  let { encrypt, salt } = Bcrypt.encode(password)
  await Dao.updateOne({ _id: user?._id }, { encrypt, salt, update_at: new Date() })
  return <DB.user.Register> { username: user.username, password }
}

/**
 * 转换 SafeUser 类型
 * @param data 
 * @param payload 
 * @returns 
 */
export function safeUser (data: DB.user.User, payload?: Partial<DB.user.SafeUser>) {
  if (!data) return
  let user = merge(data?.toObject({ virtuals: true }), payload)
  return omit(user, ['encrypt', 'salt']) as DB.user.SafeUser
}

/**
 * 密码登录
 * @param body 
 */
export async function login (body: Account.login) {
  let conditions: FilterQuery<DB.user.SafeUser> = {
    $or: [
      { username  : body.username },
      { email     : body.username },
      { mobile    : body.username },
    ]
  }
  let users = await Dao.find(conditions)
  // 验证用户密码
  let results: DB.user.User[] = []
  for (let user of users) {
    let data = validUser(user, body.password!)
    if (data) {
      results.push(data)
    }
  }
  // 没有找到用户
  if (results.length === 0) {
    throw httpError(ErrorCode.ERROR_LOGINVALID_FAIL)
  }
  // 找到单个账号
  if (results.length === 1) {
    return results[0]
  }
  // 查询到多个账号
  return results
}

/**
 * 选择登录
 * @param doc 
 * @returns 
 */
export async function loginSlect (doc: Account.uuidResult<string>) {
  let verify = await db.verify.Dao.findOne({ type: 'login', token: doc.uuid })
  if (!verify) {
    throw httpError(ErrorCode.ERROR_NOT_FOUND_ACCESSKEY, ['登录'])
  }
  let ids = JSON.parse(verify.application ?? '[]')
  if (!isArray(ids) || !ids.includes(doc.result)) {
    throw httpError(ErrorCode.ERROR_VALID_IDMARK_NOTEXIST)
  }
  await db.verify.Dao.remove({ type: 'login', token: doc.uuid })
  let user = await Dao.findOne({ _id: doc.result })
  if (!user) {
    throw httpError(ErrorCode.ERROR_FINDUSER_NOTEXIST)
  }
  return user
}

/**
 * 验证用户密码
 * @param user 
 * @param password 
 * @returns 
 */
function validUser (user: DB.user.User, password: string) {
  let { encrypt, salt } = user
  let valide = Bcrypt.compare(password, encrypt, salt)
  if (valide) {
    return user
  }
  return null
}