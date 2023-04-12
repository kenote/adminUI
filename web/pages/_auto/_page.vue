<template>
  <div>
    
  </div>
</template>

<script lang="ts">
import { Component, mixins, Vue, Provide } from 'nuxt-property-decorator'

@Component<AutoPage>({
  name: 'auto-page',
  middleware: ['autopage'],
  created () {
      
  },
})
export default class AutoPage extends Vue {

}

</script>