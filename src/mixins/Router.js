var hostPaths = {
  '//thomasg.be': '/ld3/',
  '//localhost/open/ld3/dist': '/open/ld3/dist/'
}

export default {
  data () {
    // Use homepage as default because it is lightweight
    var route = {
      base: '/',
      uri: '',
      view: 'home'
    }
    // Detect installation directory
    if (window.location.pathname !== '/') {
      for (var host in hostPaths) {
        console.log(window.location.href, host)
        if (window.location.href.indexOf(host) !== -1) {
          route.base = hostPaths[host]
          continue
        }
      }
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
      let hash = window.location.hash
      if (hash.length === 0) {
        console.log('no hash')
      } else if (hash.length === 1 && hash !== '#') {
        console.warn('not much hash but umm', hash)
      } else if (hash.length === 2) {
        console.log('not much hash')
      } else if (hash.substr(0, 2) === '#!') {
        hash = hash.substr(2)
        if (hash.indexOf(':') === -1) {
          console.log('page', hash)
          if (hash !== 'conf' && hash !== 'home' && hash !== 'edit') {
            console.log('  or', hash)
            hash = 'home'
          }
          this.route.view = hash
          window.document.title = 'ld3 ' + hash
        } else {
          console.log('goto ', hash)
          this.route.view = 'edit'
          this.route.uri = this.$root.ns.min(hash)
          window.document.title = 'ld3:edit ' + this.route.uri
        }
      } else {
        console.log('changed hash to ', hash)
      }
    }
  },
  ready () {
    this.hashchange()
  },
  attached () {
    // Start routing
    window.addEventListener('hashchange', this.hashchange, false)
    this.route.uri = this.$root.ns.min(window.location.hash.substr(2))
  },
  detached () {
    // Stop routing
    window.removeEventListener('hashchange', this.hashchange, false)
  }
}
