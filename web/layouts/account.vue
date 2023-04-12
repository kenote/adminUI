<template>
  <div id="account-layout">
    <!-- <client-only placeholder="..."> -->
    <header class="z-1">
      <div class="flex pl-6 m-auto h-full">
        <div class="flex w-1/2 items-center">
          <nuxt-link to="/"><img src="/logo.png" height="24" /></nuxt-link>
          <span class="text-dark-800 text-lg px-4">{{ pageTitle }}</span>
        </div>
        <div class="flex w-1/2 items-center justify-end">
          <nuxt-link 
            class="inline-flex h-full justify-center items-center ml-20px font-normal text-14px hover:text-orange-500" 
            to="/login">
            登录
          </nuxt-link>
          <nuxt-link 
            class="inline-flex h-full text-light-50 bg-gray-700 hover:bg-gray-600 justify-center items-center px-5 ml-20px font-normal text-14px" 
            to="/register">
            立即注册
          </nuxt-link>
        </div>
      </div>
    </header>
      
    <nuxt class="flex flex-1 login-wrapper bg-cover bg-fixed min-w-1280px" />
    
    <footer class="m-auto h-75px min-w-1280px">
      <div class="flex max-w-1232px border-t-unset m-auto flex-1 pt-17px box-border justify-center">
        <div class="text-sm box-border text-gray-500">
          <span>{{ copyright }}</span>
          <div v-for="(item, key) in icps" :key="key" class="inline-block ml-3">
            <span class="mr-2">|</span>
            <a v-if="item.link" :key="key" :href="item.link" :target="item.target??'_blank'">{{item.name}}</a>
            <span v-else>{{item.name}}</span>
          </div>
        </div>
      </div>
    </footer>
    <!-- </client-only> -->
  </div>
</template>

<script lang="ts">
import { Component, mixins, Vue, Provide } from 'nuxt-property-decorator'
import BaseMixin from '~/mixins/base'
import '~/assets/less/account/layout.less'
import { trim } from 'lodash'

@Component<AccountLayout>({
  name: 'account-layout',
  created () {
    
  },
  mounted() {
    document.body.style.backgroundColor = '#f5f5f6'
  },
})
export default class AccountLayout extends mixins(BaseMixin) {

  
}

</script>