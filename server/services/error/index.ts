import createError, { HttpError } from 'http-errors'
import { Context, NextHandler } from '@kenote/core'
import { SYSTEM_MINSAFE_ERROR_CODE } from '~/config'
import { format } from 'util'
import Code from './code'
import Message from './message'

export function nextError (error: HttpError, ctx: Context, next: NextHandler) {
  if (error?.code >= SYSTEM_MINSAFE_ERROR_CODE) {
    if (ctx?.api) {
      ctx?.api(null, error)
    }
    else {
      let { message } = error
      ctx.json({ error: message })
    }
  } else {
    return next(error)
  }
}

export function httpError (code: number, opts?: Array<string | number | null>) {
  let message: string = ''
  for (const [key, val] of Object.entries(Code)) {
    if (code === val) {
      message = Message[key]
      break
    }
  }
  message = format(message, ...[...opts ?? []])
  return createError(500, message, { code })
}

export const ErrorCode = Code
export const ErrorMessage = Message