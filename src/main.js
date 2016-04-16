import Vue from 'vue/dist/vue.min.js'
import App from './App'

import Prop from './components/Prop'

import Store from './mixins/Store'

// Fix recursive initializing bug: PropsList > Prop > ValueObject > PropsList > Prop > ...
Vue.component('Prop', Prop)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  data: {
    class: {
      focused: null
    },
    style: {
      color: null,
      background: null
    }
  },
  mixins: [Store],
  components: { App }
})
