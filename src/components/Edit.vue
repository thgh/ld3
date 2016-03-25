<template>
  <main>
    <section class="section section-browser">
      <p>
        <a href="#!home">home</a>
        <a href="#!conf">config</a>
        <a href="#!dataset/wut">dataset/wut</a>
        <a href="#!projects:dekastart">projects:dekastart</a>

      </p>
      <recent-fragments :list="fragmentCache" :route="route"></recent-fragments>
      <p>
      {{blub}}
      </p>

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
import LdContext from '../libs/LdContext'

// var namespaces = {
//   'schema': 'http://schema.org/',
//   'thomas': 'http://thomasg.be/'
// }
var reverseNamespaces = {
  'https:': 'http:',
  'http://schema.org/': 'schema:',
  'http://thomasg.be/': 'thomasg:',
  'http://ld.dev/': 'dev:',
  'dev:store/public/': 'store:',
  'store:projects/': 'projects:',
  'store:invoices/': 'invoices:'
}

function namespaceMinifier (s) {
  for (let ns in reverseNamespaces) {
    s['@id'] = s['@id'].replace(ns, reverseNamespaces[ns])
  }
  return s
}

LdContext.init()

export default {
  name: 'edit',
  props: ['route'],
  data () {
    return {
      backdrop: false,
      blub: 15,
      focusIds: [],
      fragments: {},
      fragmentCache: {}
    }
  },
  computed: {
    currentFragment () {
      return this.fragmentCache && this.route && this.route.uri && this.fragmentCache[this.route.uri]
    }
  },
  methods: {
    fetch (url) {
      this.$http.get(url).then(function (res) {
        if (!res.data) {
          return console.warn('no data in response')
        }
        if (typeof res.data !== 'object') {
          return console.warn('no object in data of response')
        }
        if (res.data.length && res.data[0]) {
          for (let s of res.data) {
            if (s['@id']) {
              s = namespaceMinifier(s)
              this.fragmentCache[s['@id']] = s
            }
          }
        } else if (res.data['@id']) {
          let s = namespaceMinifier(res.data)
          this.fragmentCache[s['@id']] = s
        }
        this.$set('fragmentCache', JSON.parse(JSON.stringify(this.fragmentCache)))
      })
    },
    unfocus () {
      var uid = this.focusIds.pop()
      this.$broadcast('unfocus', uid)
      console.log('unfocus', uid, this.focusIds.length)
    }
  },
  events: {
    objectFocused (uid) {
      this.focusIds.push(uid)
      console.log('  focus', uid, this.focusIds.length)
    },
    siblingUnfocused (uid) {
      this.focusIds.splice(this.focusIds.indexOf(uid), 1)
      console.log('unfocus', uid, this.focusIds.length)
    }
  },
  ready () {
    // console.info(window.location)
    // console.log('edit', this.$route.path)

    this.fetch('https://ld.dev/store/public/projects/ldeditor')
    this.fetch('https://ld.dev/store/public/invoices/1')
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