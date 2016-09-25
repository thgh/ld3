import Vue from 'vue'

// Pages
import Home from './components/Home.vue'
import Conf from './components/Conf.vue'
import Edit from './components/Edit.vue'
import Create from './components/Create.vue'

// Modals
import ModalAuth from './components/ModalAuth.vue'

import Prop from './components/Prop.vue'
import RecentFragments from './components/RecentFragments.vue'

// Must be available in plugins
import InputSingle from './components/InputSingle.vue'

import Router from './mixins/Router.js'
import Store from './mixins/Store.js'
import User from './mixins/User.js'

// Fix recursive initializing bug: PropsList > Prop > ValueObject > PropsList > Prop > ...
Vue.component('Prop', Prop)
Vue.component('RecentFragments', RecentFragments)
Vue.component('InputSingle', InputSingle)

window.ld3 = true

/* eslint-disable no-new */
new Vue({
  el: 'body',
  data () {
    return {
      class: {
        focused: null
      },
      style: {
        color: null,
        background: null
      }
    }
  },
  methods: {
    extend: comp => Vue.extend(comp)
  },
  mixins: [Router, Store, User],
  components: {
    Home,
    Conf,
    Edit,
    Create,
    ModalAuth
  }
})
