import Vue from 'vue'
import Fragment from 'vue-fragment'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import '~/assets/less/perfect-scrollbar.less'
import * as KlElment from '@kenote/element-ui'
import '@kenote/element-ui/lib/style.css'

Vue.use(Fragment.Plugin)
Vue.use(PerfectScrollbar)
Vue.use(KlElment.Plugin)