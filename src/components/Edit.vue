<template>
  <div class="section-content">
    <fragment v-if="currentFragment" :fragment="currentFragment"></fragment>
  </div>
</template>

<script>
import { inert, getJSON, putJSON, toMin, fromMin } from '../libs/util.js'

import Fragment from './Fragment.vue'

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
      return this.$root.currentFragment
    }
  },
  methods: {
    unfocus () {
      var uid = this.focusIds.pop()
      hub.$emit('unfocus', uid)
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
      // ctrl+s
      if (key === 114 || (evt.ctrlKey || evt.metaKey) && key === 70) {
        evt.preventDefault()
        document.querySelector('nav input').focus()
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
  mounted () {
    window.addEventListener('keydown', this.keydown, false)
    // console.info(window.location)
    // console.log('edit', this.$route.path)
  },
  destroyed () {
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
