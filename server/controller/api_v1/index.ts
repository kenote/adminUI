import { Module } from '@kenote/core'
import AccountController from './account'
import ProxyController from './proxy'

@Module({
  path: '/api/v1',
  controller: [
    AccountController,
    ProxyController
  ],
  options: {
    cors: true,
    headers: {}
  }
})
export default class ApiV1Module {}