import { ExtractJwt, Strategy, StrategyOptions, VerifyCallbackWithRequest } from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { serverConfigure } from '~/config'
import type { Jwtpayload } from '@/types/server'
import * as service from '~/services'


const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
  secretOrKey: serverConfigure.secretKey
}

const strategyVerify: VerifyCallbackWithRequest = async (req, payload: Jwtpayload, done) => {

  let jwtoken = req.headers.authorization?.replace(/^(Bearer)\s{1}/, '')
  try {
    let user = await service.db.user.Dao.findOne({ _id: payload._id, jw_token: jwtoken })
    if (user == null) {
      return done(null, false)
    }
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}

/**
 * 定义 JWT 策略
 */
export const strategyJwt = new Strategy(jwtOptions, strategyVerify)

/**
 * 设置 JWT Token
 * @param payload
 * @param options
 */
export const setJwToken = (payload: Jwtpayload, options?: jwt.SignOptions) => jwt.sign(payload, <jwt.Secret>jwtOptions.secretOrKey, options)

/**
 * 验证 JWT Token
 * @param token
 * @param options
 * @returns
 */
export const verifyJwToken = (token: string, options?: jwt.VerifyOptions) => token
  ? <Jwtpayload>jwt.verify(token, <jwt.Secret>jwtOptions.secretOrKey, options)
  : null