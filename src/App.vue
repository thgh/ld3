<template>
  <div :class="{ 'app--left': appLeft, 'app--wide': appWide }">
    <app-nav />
    <modal-auth v-if="!$root.user['@id']"></modal-auth>
    <component :is="$root.route.view">
      <section class="section-content"></section>
    </component>
    <app-sync />
  </div>
</template>

<script>
import AppLeft from './components/AppLeft.vue'
import AppNav from './components/AppNav.vue'
import AppSync from './components/AppSync.vue'
import Home from './components/Home.vue'
import Conf from './components/Conf.vue'
import Edit from './components/Edit.vue'
import Create from './components/Create.vue'

import ModalAuth from './components/ModalAuth.vue'

export default {
  name: 'app',
  computed: {
    appLeft () {
      // return this.$root.fragmentList.length
    },
    appWide () {
      return !this.$root.route || !this.$root.route.uri
    }
  },
  components: {
    AppLeft,
    AppNav,
    AppSync,
    Home,
    Conf,
    Edit,
    Create,
    ModalAuth
  }
}
</script>
