<template>
  <main>
    <section class="section section-browser">
      <p>
        <a href="#!home">home</a>
        <a href="#!conf">config</a>
        <a href="#!dataset/wut">dataset/wut</a>
        <a href="#!projects:dekastart">projects:dekastart</a>
      </p>
      <recent-fragments :list="$root.fragments" :route="route"></recent-fragments>
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
      return (this.$root.fragments && this.route && this.route.uri && this.$root.fragments[this.route.uri]) || this.$root.fetch(this.route.uri)
    }
  },
  methods: {
    unfocus () {
      var uid = this.focusIds.pop()
      this.$broadcast('unfocus', uid)
      console.log('unfocus', uid, this.focusIds.length)
    },
    keydown (evt) {
      let key = evt.which || evt.keyCode
      // esc
      if (key === 27) {
        window.alert('esc')
      }
      // ctrl+s
      if ((evt.ctrlKey || evt.metaKey) && String.fromCharCode(evt.which).toLowerCase() === 's') {
        evt.preventDefault()
        if (this.route && this.route.uri) {
          this.$root.sync(this.currentFragment)
        }
      }
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
    let $root = this.$root
    setTimeout(function () {
      $root.fetch('orgs:thomasg')
    }, 1000)
    setTimeout(function () {
      $root.fetch('projects:ldeditor')
    }, 2000)
    setTimeout(function () {
      $root.fetch('invoices:1')
    }, 3000)
    this.route.uri = this.$root.ns.min(window.location.hash.substr(2))
  },
  attached () {
    // Editor shortcuts
    window.addEventListener('keydown', this.keydown, false)
  },
  detached () {
    window.removeEventListener('keydown', this.keydown, false)
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