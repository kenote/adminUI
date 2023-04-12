import crypto from 'crypto'

/**
 * Md5
 * @param text 
 */
export const md5 = (text: string) => crypto.createHash('md5').update(text).digest('hex')

 /**
  * Sha1
  * @param text 
  */
export const sha1 = (text: string) => crypto.createHash('sha1').update(text).digest('hex')

/**
 * 加密编码
 * @param value 
 * @param salt 
 */
export function encode (value: string, salt?: string) {
  let _salt = salt ?? Math.random().toString(36).substring(8)
  let password = { salt: _salt, encrypt: sha1(`${md5(value)}^${_salt}`) }
  return password
}

/**
 * 比较加密编码
 * @param value 
 * @param encrypt 
 * @param salt 
 */
export function compare (value: string, encrypt: string, salt: string) {
  let password = encode(value, salt)
  return password.encrypt === encrypt
}

/**
 * 生成随机密码
 * @returns 
 */
export function randomPassword (length?: number) {
  let rand = Math.random().toString(36).substring(2)
  let rema = Math.random().toString(10).substring(8)
  let val: string[] = []
  for (let i:number = 0; i < rand.length; i++) {
    val[i] = Number(rema[i]) % 2 === 0 ? rand[i].toLocaleUpperCase() : rand[i]
  }
  let password = val.join('')
  if (length && length > password.length) {
    let extend: string = randomPassword().slice(0, length - password.length)
    return password + extend
  }
  return password
}

/**
 * 生成数字验证码
 * @returns 
 */
export const verifyCode = (length: number = 6) => Math.random().toFixed(length).replace(/^(0\.)/i, '')