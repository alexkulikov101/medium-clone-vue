<template>
  <div id="app">
    <McvTopBar />
    <router-view />
  </div>
</template>

<script>
import McvTopBar from '@/components/TopBar.vue'
import {actionTypes} from '@/store/modules/auth'

export default {
  name: 'McvHome',
  components: {
    McvTopBar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  },
}
</script>
