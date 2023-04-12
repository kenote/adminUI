<template>
  <page :style="`background-image: url(${account.login.backgroundImg})`">
    <div class="flex flex-row justify-around items-center box-border m-auto w-1200px h-518px">
      <!-- 营销取阅 -->
      <div v-if="account.login.marketing" class="relative w-390px h-full mr-40px bg-transparent text-transparent">
        <img class="w-full" 
          :src="account.login.marketing.image" 
          :alt="account.login.marketing.name" 
          v-bind:class="account.login.marketing?.link ? 'cursor-pointer' : ''"
          @click="handleCommand(account.login.marketing?.link)" />
      </div>
      <!-- 登录表单 -->
      <client-only placeholder="...">
        <kl-login-form class="bg-white"
          :loading="loading" 
          :wait-step="30"
          username-label="用户名"
          username-placeholder="账号/邮箱/手机号"
          username-message="请输入账号/邮箱/手机号"
          password-placeholder="登录密码"
          password-message="请输入登录密码"
          :thirdparty-login="account.login.thirdParty?.open"
          :thirdparty-login-text="account.login.thirdParty?.name"
          :qrcode-login="account.login.qrcode?.open"
          @submit="handleSubmit">
          <!-- service-terms -->
          <template slot="service-terms">
            <a href="javascript:;">忘记密码</a>
            <a href="javascript:;" class="ng-hide">立即注册</a>
          </template>
          <!-- third-party-login -->
          <template slot="third-party-login">
            <i v-for="(item, key) in (account.applications?.filter( v => v.permission?.includes('login') ) ?? [])" 
              :key="key" 
              :class="item.icon" 
              :title="item.name" 
              @click="handleCommand(item.link)" />
          </template>
          
          
          <template slot="qrcode">
            <kl-qrcode :title="account.login.qrcode?.name">
              <template slot="description">
                <div v-html="account.login.qrcode?.description"></div>
              </template>
              <img class="w-full" :src="account.login.qrcode?.image" :alt="account.login.qrcode?.alt"  />
            </kl-qrcode>
          </template>
          
          <template slot="protocol">
            <div v-html="account.login.protocol"></div>
          </template>
        </kl-login-form>
      </client-only>
        
      
    </div>
  </page>
</template>

<script lang="ts">
import { Component, mixins, Vue, Provide } from 'nuxt-property-decorator'
import { FilterData } from 'parse-string'
import PageMixin from '~/mixins/page'
import type { Account } from '@/types/account'
import { Form as ElForm } from 'element-ui'
import { Store, Types } from '~/store'
import type { AccountConfigure } from '@/types/config'
import { runCommand } from '@kenote/element-ui'
import { Callback } from 'nunjucks'
import type { HttpResult } from '@/types/client'

@Component<LoginPage>({
  name: 'login-page',
  layout: 'account',
  created() {
    this.setPageTitle('登录')
  },
})
export default class LoginPage extends mixins(PageMixin) {

  @Store.Setting.State
  account!: AccountConfigure

  @Provide()
  times: number = 0
 
  @Provide()
  loading: boolean = false

  handleSubmit (values: any, callback: Callback<any, any>) {
    console.log(values)
    this.loading = true
    setTimeout(async () => {
      try {
        let result = await this.$httpClient().POST<HttpResult>(`/sys/account/login`, values)
        if (result?.error) {
          this.$message.warning(result.error)
        }
        else {

        }
      } catch (error) {
        
      }
      this.loading = false
      // this.loading = false
      // let error = values.password == '123' ? 'error' : null
      // cb(error, null)
    }, 300)
  }

  handleCommand (value?: string) {
    return runCommand(this)(value ?? '')
  }
}



</script>