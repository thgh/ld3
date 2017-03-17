import { fromMin, toMin } from '../libs/util.js'

const routes = ['home', 'create', 'conf']
const internals = ['config']

export default {
  data () {
    // Use homepage as default because it is lightweight
    var route = {
      base: window.location.pathname,
      uri: '',
      view: 'home'
    }

    // Detect installation directory
    if (window.location.pathname !== '/') {
      // Replace url to get the router to start properly
      if (window.location.hash.length) {
        console.log('replace base url', route.base)
        window.history.replaceState('wut', 'ld3', route.base + window.location.hash)
      } else if (window.location.pathname.length > route.base.length) {
        console.log('replace complete url', route.base)
        window.history.replaceState('wut', 'ld3', route.base + '#!' + window.location.href)
      }
    }

    return {
      route: route
    }
  },
  methods: {
    hashchange () {
      let hash = window.location.hash.slice(1)

      // Exclamation mark will be ignored
      if (hash[0] === '!') {
        hash = hash.slice(1)
      }

      if (internals.includes(hash)) {
        hash = '_:' + hash
      }

      // Colon means we are dealing with a URI
      if (hash.includes(':')) {
        this.route.view = 'edit'
        this.route.uri = toMin(hash)
        window.document.title = this.route.uri + ' - ld3'
        // Avoid forced layout
        this.$nextTick(function () {
          var elem = document.querySelector('.section-content')
          elem && elem.scrollIntoView(true)
        })
      } else if (routes.includes(hash)) {
        this.route.view = hash
        window.document.title = hash + ' - ld3'
        console.debug('hashchange: view', hash)
      } else {
        this.route.view = 'home'
        window.document.title = 'Home - ld3'
        console.debug('hashchange: fallback to home')
      }
    }
  },
  mounted () {
    window.addEventListener('hashchange', this.hashchange, false)
    this.route.uri = fromMin(window.location.hash.substr(2))
    this.hashchange()
  }
}
