import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Home from './Home'
import Conf from './Conf'
import Edit from './Edit'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.debug = true

/* eslint-disable no-new */
const router = new VueRouter({
  history: true,
  saveScrollPosition: true
})
router.map({
  '/.hello': {
    component: Home
  },
  '/.config': {
    component: Conf
  },
  '*': {
    component: Edit
  }
})
router.start(
  Vue.extend({
    name: 'app',
    data () {
      return {
        namespaces: {
          'thomasg': 'https://thomasg.be/ld/store/',
          'projects': 'https://thomasg.be/ld/store/projects/',
          'schema': 'http://schema.org/'
        }
      }
    }
  }),
  'body'
)
