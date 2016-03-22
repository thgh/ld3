<template>
  <component :is="route.view" :route="route"></component>
</template>

<script>
import Hello from './components/Hello'
import Home from './components/Home'
import Conf from './components/Conf'
import Edit from './components/Edit'

export default {
  data () {
    if (window.location.pathname !== '/') {
      console.log('replaceState', window.location.pathname)
      if (window.location.hash.length) {
        window.history.replaceState('wut', 'ld3', '/' + window.location.hash)
      } else {
        window.history.replaceState('wut', 'ld3', '/#!' + window.location.pathname.substr(1))
      }
    }
    return {
      route: {
        view: 'edit',
        uri: ''
      },
      namespaces: {}
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
        console.log('goto ', hash.substr(2))
        this.route.view = 'edit'
        this.route.uri = hash.substr(2)
        window.document.title = 'ld3:edit ' + this.route.uri
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
  },
  detached () {
    // Stop routing
    window.removeEventListener('hashchange', this.hashchange, false)
  },
  components: {
    Hello,
    Home,
    Conf,
    Edit
  }
}
</script>

<style lang="scss">
@import 'scss/variables.scss';
@import 'scss/shame.scss';

@import 'scss/reset';
@import 'scss/structure';
@import 'scss/browser';
@import 'scss/editor';
@import 'scss/inp';
@import 'scss/btn';
</style>
