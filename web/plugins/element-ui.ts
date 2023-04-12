import Vue from 'vue'
import {
  Autocomplete,
  Button,
  Card,
  Carousel,
  CarouselItem,
  DatePicker,
  Descriptions,
  DescriptionsItem,
  Form,
  FormItem,
  Input,
  Loading,
  Menu,
  MenuItem,
  Message,
  MessageBox,
  Notification
} from 'element-ui'

export default async () => {
  Vue.use(Autocomplete)
  Vue.use(Button)
  Vue.use(Card)
  Vue.use(Carousel)
  Vue.use(CarouselItem)
  Vue.use(DatePicker)
  Vue.use(Descriptions)
  Vue.use(DescriptionsItem)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Loading.directive)
  Vue.use(Menu)
  Vue.use(MenuItem)

  Vue.prototype.$message = Message
  Vue.prototype.$notify = Notification
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$loading = Loading.service
}