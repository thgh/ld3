import { fromMin, toMin } from '../libs/util.js'

const routes = ['home', 'create', 'edit', 'conf']

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
    console.log(route)
    return {
      route: route
    }
  },
  methods: {
    hashchange () {
      let hash = window.location.hash
      if (hash.length === 0) {
        console.log('no hash')
        this.route.view = 'home'
      } else if (hash.length === 1 && hash !== '#') {
        console.warn('not much hash but umm', hash)
      } else if (hash.length === 2) {
        console.log('not much hash')
      } else if (hash.substr(0, 2) === '#!') {
        hash = hash.substr(2)
        if (hash.indexOf(':') === -1) {
          if (routes.indexOf(hash) === -1) {
            console.log('Router.hashchange did not expect', hash)
            hash = 'home'
            window.history.replaceState({}, 'Home - ld3', '#!home')
          }
          this.route.view = hash
          window.document.title = hash + ' - ld3'
        } else {
          this.route.view = 'edit'
          this.route.uri = toMin(hash)
          window.document.title = this.route.uri + ' - ld3'
          // Avoid forced layout
          this.$nextTick(function () {
            document.querySelector('.section-content').scrollIntoView(true)
          })
        }
      } else {
        console.warn('changed hash to ', hash)
      }
      console.log('hashchange')
    }
  },
  mounted () {
    window.addEventListener('hashchange', this.hashchange, false)
    this.route.uri = fromMin(window.location.hash.substr(2))
    this.hashchange()
    console.log(this.route.uri)
  }
}
