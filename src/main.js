import Vue from 'vue'

// Pages
import Home from './components/Home'
import Conf from './components/Conf'
import Edit from './components/Edit'

// Modals
import ModalAuth from './components/ModalAuth'

import Prop from './components/Prop'
import RecentFragments from './components/RecentFragments'

import Router from './mixins/Router.js'
import Store from './mixins/Store'
import User from './mixins/User'

// Fix recursive initializing bug: PropsList > Prop > ValueObject > PropsList > Prop > ...
Vue.component('Prop', Prop)
Vue.component('RecentFragments', RecentFragments)

// Share user data and methods over all components
Vue.prototype.user = User.data.user
for (let key in User.methods) {
  Vue.prototype[key] = User.methods[key]
}

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
    ModalAuth
  }
})
