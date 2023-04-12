// nuxt.config.js

module.exports = {
  /**
   * Nuxt 2.13.0 后会收集有关常规用法的匿名遥测数据
   * 在开发环境下每次启动都会有提示，telemetry 选项可以让我们关闭它
   */
  telemetry: false,
  /**
   * 设定源码目录
   */
  srcDir: 'web',
  /**
   * 忽略选项 
   */
  ignoreOptions: {
    ignorecase: false
  },
  /**
   * 页面 Loading 条设置
   */
  loading: {
    color: '#00c58e', 
    height: '2px'
  },
  /**
   * 加载 Style 样式
   */
  css: [
    '~/assets/less/common.less',
    '~/assets/iconfont/iconfont.css'
  ],
  /**
   * 加载插件
   */
  plugins: [
    { src: '~/plugins/client', ssr: false },
    { src: '~/plugins/element-ui', ssr: true },
    { src: '~/plugins/klelment', ssr: false }
  ],
  /**
   * 配置组件
   */
  components: [
    '~/components'
  ],
  // 装载模块
  modules: [
    '@unocss/nuxt'
  ],
  // Unocss 设置
  unocss: {
    // presets
    uno: true,
    icons: true,
    attributify: true,
    wind: true,
    webFonts: true,
    // core options
    shortcuts: [],
    rules: [],
  },
  /**
   * 加载编译模块
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxt/components'
  ],
  /**
   * 编译配置
   */
  build: {
    babel: {
      plugins: [
        ['component', {
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk'
        }],
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ],
      comments: true
    },
    postcss: false, 
    splitChunks: {
      commons: true,
      layouts: true,
      pages: true
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxSize: 307200,
        maxAsyncRequests: 7,
        cacheGroups: {
          elementui: {
            test: /node_modules[\\/]element-ui/,
            chunks: 'all',
            priority: 20,
            name: true
          }
        }
      }
    }
  },
  /**
   * 映射路径
   */
  alias: {
    '@': __dirname
  },
  /**
   * 路由配置
   */
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        path: '/*',
        component: resolve(__dirname, 'web/pages/_auto/_page.vue')
      })
    }
  }
}