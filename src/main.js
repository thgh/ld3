import Vue from 'vue'

// Pages
import Home from './components/Home'
import Conf from './components/Conf'
import Edit from './components/Edit'

import Prop from './components/Prop'
import RecentFragments from './components/RecentFragments'

import Router from './mixins/Router.js'
import Store from './mixins/Store'

// Fix recursive initializing bug: PropsList > Prop > ValueObject > PropsList > Prop > ...
Vue.component('Prop', Prop)
Vue.component('RecentFragments', RecentFragments)

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
  mixins: [Router, Store],
  components: {
    Home,
    Conf,
    Edit
  }
})
