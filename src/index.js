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

// Fix recursive initializing bug: PropsList > Prop > ValueObject > PropsList > Prop > ...
Vue.component('Prop', Prop)
Vue.component('RecentFragments', RecentFragments)
Vue.component('InputSingle', InputSingle)

window.Vue = Vue
window.hub = new Vue()
window.ld3 = true
console.log('start')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      level: 0,
      config: {},
      listFocus: ['uri'],
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
  render: h => h(App)
})

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/sw.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }).catch(function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }
