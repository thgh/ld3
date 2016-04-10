<template>
  <main>
    <section class="section section-browser">
      <p>
        <a href="#!home">home</a>
        <a href="#!conf">config</a>
        <a href="#!dataset/wut">dataset/wut</a>
        <a href="#!projects:dekastart">projects:dekastart</a>
      </p>
      <recent-fragments :list="$root.fragmentCache" :route="route"></recent-fragments>
    </section>
    <section class="section section-editor">
      <fragment v-if="currentFragment" :fragment.sync="currentFragment"></fragment>
    </section>
    <div class="backdrop" :class="{active:this.focusIds.length}" @click.prevent.stop="unfocus"></div>
  </main>
</template>

<script>
import RecentFragments from './RecentFragments'
import Fragment from './Fragment'
// import LdContext from '../libs/LdContext'
// LdContext.init()

// var namespaces = {
//   'schema': 'http://schema.org/',
//   'thomas': 'http://thomasg.be/'
// }

var namespaces = [
  {ns: 'schema:', url: 'https://schema.org/'},
  {ns: 'schema:', url: 'http://schema.org/'},
  {ns: 'dev:', url: 'https://ld.dev/'},
  {ns: 'dev:', url: 'http://ld.dev/'},
  {ns: 'store:', url: 'dev:store/public/'},
  {ns: 'projects:', url: 'store:projects/'},
  {ns: 'invoices:', url: 'store:invoices/'},
  {ns: 'orgs:', url: 'store:orgs/'}
]

var namespaceMinifier = function (s) {
  for (var i = 0; i < namespaces.length; i++) {
    s['@id'] = s['@id'].replace(namespaces[i].url, namespaces[i].ns)
  }
  return s
}
var namespaceUndoer = function (s) {
  for (var i = namespaces.length - 1; i >= 0; i--) {
    s = s.replace(namespaces[i].ns, namespaces[i].url)
  }
  return s
}

export default {
  name: 'edit',
  props: ['route'],
  data () {
    return {
      backdrop: false,
      focusIds: [],
      fragments: {}
    }
  },
  computed: {
    currentFragment () {
      return this.$root.fragmentCache && this.route && this.route.uri && this.$root.fragmentCache[this.route.uri]
    }
  },
  methods: {
    fetch (url) {
      url = namespaceUndoer(url)
      this.$http.get(url).then(function (res) {
        if (!res.data) {
          return console.warn('no data in response')
        }
        if (typeof res.data !== 'object') {
          return console.warn('no object in data of response')
        }
        if (!this.$root.fragmentCache) {
          console.log('creating store')
          this.$root.$set('fragmentCache', {})
        }
        if (res.data.length && res.data[0]) {
          for (let s of res.data) {
            if (s['@id']) {
              s = namespaceMinifier(s)
              this.$root.$set('fragmentCache[\'' + s['@id'] + '\']', s)
            }
          }
        } else if (res.data['@id']) {
          let s = namespaceMinifier(res.data)
          this.$root.$set('fragmentCache[\'' + s['@id'] + '\']', s)
        }
        console.log(this.$root.fragmentCache)
      })
    },
    unfocus () {
      var uid = this.focusIds.pop()
      this.$broadcast('unfocus', uid)
      console.log('unfocus', uid, this.focusIds.length)
    }
  },
  events: {
    fetch (url) {
      url = url['@id']
      let full = namespaceUndoer(url)
      console.log('  needs', url, full)
      this.fetch(url)
    },
    objectFocused (uid) {
      this.focusIds.push(uid)
      console.log('  focus', uid, this.focusIds.length)
    },
    siblingUnfocused (uid) {
      this.focusIds.splice(this.focusIds.indexOf(uid), 1)
      console.log('unfocus', uid, this.focusIds.length)
    }
  },
  init () {
    this.$root.ns = {
      minify: namespaceMinifier,
      undo: namespaceUndoer
    }
    if (!this.$root.fragmentCache) {
      console.log('creating init store')
      this.$root.$set('fragmentCache', {})
    }
  },
  ready () {
    // console.info(window.location)
    // console.log('edit', this.$route.path)

    this.fetch('projects:ldeditor')
    this.fetch('invoices:1')
    this.fetch('orgs:thomasg')
    this.route.uri = window.location.hash.substr(2)
  },
  watch: {
    focusIds (val) {
      this.$root.class.focused = !!val.length
      // this.$root.style.background = val.length ? '#000' : null
      // this.$root.style.color = val.length ? '#333' : null
    }
  },
  components: {
    RecentFragments,
    Fragment
  }
}
</script>

<style>
.backdrop {
  position: fixed;
  z-index: 10;
  opacity: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  transition: opacity .3s;
}
.backdrop.active {
  opacity: .9;
  pointer-events: all;
}
</style>