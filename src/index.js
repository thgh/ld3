import Vue from 'vue'

// Pages
import App from './App.vue'
import './scss/app.scss'

// Modals

import Prop from './components/Prop.vue'
import RecentFragments from './components/RecentFragments.vue'

// Must be available in plugins
import InputSingle from './components/InputSingle.vue'

import Router from './mixins/Router.js'
import Store from './mixins/Store.js'
import User from './mixins/User.js'
import Worker from './mixins/Worker.js'

// Fix recursive initializing bug: PropsList > Prop > ValueObject > PropsList > Prop > ...
Vue.component('Prop', Prop)
Vue.component('RecentFragments', RecentFragments)
Vue.component('InputSingle', InputSingle)

window.Vue = Vue
window.hub = new Vue()
window.ld3 = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  methods: {
    extend: comp => Vue.extend(comp)
  },
  mixins: [Router, Store, User, Worker],
  render: h => h(App)
})
