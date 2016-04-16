import Vue from 'vue/dist/vue.min.js'
import App from './App'

import Prop from './components/Prop'

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
  components: { App }
})
