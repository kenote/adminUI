import { Component, Provide, mixins } from 'nuxt-property-decorator'
import BaseMixin from './base'

@Component<PageMixin>({
  name: 'page-mixin',
  created() {
    
  },
})
export default class PageMixin extends mixins(BaseMixin) {

}