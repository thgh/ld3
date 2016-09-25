<template>
  <div>
    <div class="nav-pane">
      <nav class="nav-content">
        <p class="nav-fixwidth nav-links">
          <a href="#!create">creates</a>
          <a href="#!home" v-show="$root.route.view=='conf'">home</a>
          <a href="#!conf" v-show="$root.route.view!='conf'">config</a>
        </p>
        <recent-fragments class="nav-fixwidth" :list="$root.fragments"></recent-fragments>
      </nav>
    </div>
    <modal-auth v-if="!$root.user['@id']"></modal-auth>
    <component :is="$root.route.view" :route="$root.route">
      <section class="section-content"></section>
    </component>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Conf from './components/Conf.vue'
import Edit from './components/Edit.vue'
import Create from './components/Create.vue'

import ModalAuth from './components/ModalAuth.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello Vue!'
    }
  },
  components: {
    Home,
    Conf,
    Edit,
    Create,
    ModalAuth
  }
}
</script>
