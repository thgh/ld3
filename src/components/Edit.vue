<template>
    <section class="section-content section-editor">
      <fragment v-if="currentFragment" :fragment.sync="currentFragment"></fragment>
      <div class="backdrop" :class="{active:this.focusIds.length}" @click.prevent.stop="unfocus"></div>
    </section>
</template>

<script>
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
      // console.log('unfocus', uid, this.focusIds.length)
    },
    keydown (evt) {
      let key = evt.which || evt.keyCode
      // esc
      if (key === 27) {
        this.unfocus()
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
      // console.log('  focus', uid, this.focusIds.length)
    },
    siblingUnfocused (uid) {
      this.focusIds.splice(this.focusIds.indexOf(uid), 1)
      // console.log('unfocus', uid, this.focusIds.length)
    }
  },
  ready () {
    // console.info(window.location)
    // console.log('edit', this.$route.path)
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
    Fragment
  }
}
</script>

<style lang="scss">
@import '../scss/app.scss';

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