<template>
  <div class="section-content" :class="{ 'section-content--focus': $root.listFocus.length > 1 }">
    <fragment v-if="currentFragment" :fragment="currentFragment"></fragment>
  </div>
</template>

<script>
import { inert, getJSON, putJSON, toMin, fromMin } from '../libs/util.js'

import Fragment from './Fragment.vue'

export default {
  name: 'edit',
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
      if (this.$root.listFocus.length > 1) {
        console.debug('edit keydown.esc unfocus')
        this.$root.listFocus.pop()
      }
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
        if (this.$root.route && this.$root.route.uri) {
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
  mounted () {
    window.addEventListener('keydown', this.keydown, false)
    // console.info(window.location)
    // console.log('edit', this.$route.path)
  },
  destroyed () {
    window.removeEventListener('keydown', this.keydown, false)
  },
  components: {
    Fragment
  }
}
</script>
