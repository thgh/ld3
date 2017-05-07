<template>
  <div :class="{ 'app--left': $root.show.appLeft, 'app--wide': appWide }">
    <app-nav />
    <app-left />
    <modal-auth v-if="!$root.user['@id']"></modal-auth>
    <component :is="$root.route.view" @mouseenter.native="$root.show.appLeft = 0">
      <section class="section-content"></section>
    </component>
    <app-sync @mouseenter.native="$root.show.appLeft = 0" />
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
    appWide () {
      return !this.$root.route || !this.$root.route.view || this.$root.route.view === 'home'
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
