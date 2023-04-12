import { HttpClient } from '@kenote/common'
import axios from 'axios'
import FileSaver from 'file-saver'
import type { Plugin } from '@nuxt/types'
import type { HttpClientOptions } from '@/types/client'

const httpClient = (options?: HttpClientOptions) => new HttpClient(axios, options)

const clientPlugin: Plugin = (ctx, inject) => {
  inject('fileSave', FileSaver.saveAs)
  inject('httpClient', httpClient)
}

export default clientPlugin

declare module 'vue/types/vue' {
  interface Vue {
    $fileSave      : typeof FileSaver.saveAs
    $httpClient    : typeof httpClient
  }
}