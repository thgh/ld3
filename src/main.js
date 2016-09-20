import Vue from 'vue'

// Pages
import Home from './components/Home'
import Conf from './components/Conf'
import Edit from './components/Edit'
import Create from './components/Create'

// Modals
import ModalAuth from './components/ModalAuth'

import Prop from './components/Prop'
import RecentFragments from './components/RecentFragments'

// Must be available in plugins
import InputSingle from './components/InputSingle'

import Router from './mixins/Router.js'
import Store from './mixins/Store'
import User from './mixins/User'

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
