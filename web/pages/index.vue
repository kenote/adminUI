<template>
  <div class="bg-light-50">
    Home
    <client-only>
      <kl-channel-searchbar 
        :data="channels" 
        placeholder="搜索文档" 
        :filter="filter"
        @command="handleCommand" />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Vue, Provide } from 'nuxt-property-decorator'
import jsYaml from 'js-yaml'
// import { WebsocketClient } from '~/plugins/websocket'
import { NodeProxy } from '@kenote/api-proxy'
import { isBuffer } from 'lodash'
import { Store, Types } from '~/store'
import type { ChannelDataNode, FilterQuery } from '@kenote/common'

const channels: ChannelDataNode<any>[] = [
  {
    key: 'utilities',
    name: '工具集',
    label: 'utilities',
    route: '/utilities',
    children: [
      {
        key: 'command',
        name: '指令',
        children: [
          {
            key: 'parse-command',
            name: 'parseCommand',
            keywords: [ 'utilities', '工具', 'command', '指令', 'parse-command' ],
            route: '/utilities/parse-command',
            description: '解析字符串指令'
          },
          {
            key: 'run-command',
            name: 'runCommand',
            keywords: [ 'utilities', '工具', 'command', '指令', 'run-command' ],
            route: '/utilities/run-command',
            description: '运行指令集'
          }
        ]
      },
      {
        key: 'filter',
        name: '检索',
        children: [
          {
            key: 'filter-channel-datanode',
            name: 'filterChannelDataNode',
            keywords: [ 'utilities', '工具', 'filter', '检索', 'channel', 'datanode' ],
            route: '/utilities/filter-channel-datanode',
            description: '检索频道数据节点，结果返回到列表'
          }
        ]
      }
    ]
  },
  {
    key: 'components',
    name: '组件',
    label: 'components',
    route: '/components',
    children: [
      {
        key: 'basic',
        name: '基础',
        children: [
          {
            key: 'searchbar',
            name: 'Searchbar 频道搜索框',
            keywords: [ 'components', '组件', 'searchbar', '频道搜索框' ],
            route: '/components/searchbar',
            description: '频道搜索框，用于搜索频道下子页面'
          }
        ]
      }
    ]
  }
]

@Component<CustomPage>({
  name: 'page',
  mounted () {
    // let client = WebsocketClient.getInstance(`${this.wss_url}/channel`, ['auth', '123456'])
    // // client.binaryType = 'arraybuffer'
    // client.onMessage = (evt: NodeProxy.Response) => {
    //   // let str = evt.data?.[0]?.['_id']
    //   console.log( evt,  )
    //   // if (isBuffer(evt.data)) {
    //   //   console.log(evt.data.toString())
    //   // }
    // }
    // client.sendMessage(jsYaml.safeDump({
    //       channel: 'account',
    //       pathLabel: 'info',
    //       body: {
    //         name: 'aaa'
    //       }
    //     })
    // )
    // let client = new WebSocket('ws://localhost:4000/channel', ['auth', '123456'])
    // // 接收消息
    // client.onmessage = evt => {
    //   console.log(evt.data)
      
    // }
    // // 连接成功
    // client.onopen = evt => {
    //   console.log('evt', evt)
    //   if (client.readyState === client.OPEN) {
    //     console.log('ok', client.readyState, client.OPEN)
    //     console.log({
    //       channel: 'account',
    //       pathLabel: 'info',
    //       body: {}
    //     })
    //     let info = jsYaml.safeDump({
    //       channel: 'account',
    //       pathLabel: 'info',
    //       body: {
    //         name: 'aaa'
    //       }
    //     })
    //     console.log(info)
    //     client.send(info)
    //   }
    //   /**
    //  * 频道
    //  */
    // channel              : string
    // /**
    //  * 接口名
    //  */
    // pathLabel            : string
    // /**
    //  * 客户端 IP
    //  */
    // clientIP            ?: string
    // /**
    //  * 请求 Body
    //  */
    // body                ?: Record<string, any>
    // /**
    //  * 过滤后的 Body 数据
    //  */
    // payload             ?: Record<string, any>
    // }
    // // 监听错误
    // client.onerror = evt => {
    //   console.log('error', evt)
    // }
    // // 监听关闭连接
    // client.onclose = evt => {
    //   console.log('close', evt)
    // }
  }
})
export default class CustomPage extends Vue {

  @Store.Setting.State
  wss_url!: string

  @Provide()
  channels: ChannelDataNode<any>[] = channels

  @Provide()
  filter: FilterQuery<ChannelDataNode<any>> = {
    route: {
      $where: value => {
        return value !== '/utilities/parse-command'
      }
    }
  }

  handleCommand (value: ChannelDataNode<any>) {
    console.log(value)
  }
}
</script>