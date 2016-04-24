import Vue from 'vue'
import App from './App'

import Prop from './components/Prop'
import RecentFragments from './components/RecentFragments'

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
    extend: Vue.extend
  },
  mixins: [Store],
  components: { App }
})
