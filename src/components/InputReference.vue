<template>
  <form class="inp-subtle" @submit.prevent.stop="submit" @keydown="keydown"><span class="inp-subtle-span" v-text="term||placeholder"></span> <input class="inp-big-focus" type="text" v-model="term" :placeholder="placeholder" @blur="blur" @input="input"><div class="ref-select" v-if="options">
      <div class="ref-option" :class="{'ref-ghost':$index===ghost}" v-for="opt in options" v-text="opt.item+' '+opt.score" track-by="item" @mouseenter="ghost=$index" @mousedown="confirm(opt.item)" transition="staggered"></div>
    </div>
  </form> 
</template>

<script>
import Fuse from 'fuse.js'

var fuseOptions = {
  caseSensitive: false,
  include: ['score'],
  shouldSort: true,
  tokenize: false,
  threshold: 0.6,
  location: 0,
  distance: 100,
  id: '@id',
  keys: ['@id', 'schema:name', 'rdfs:label', 'dcterms:title', '@type', 'schema:description', 'schema:url']
}

export default {
  props: {
    model: {
      twoWay: true
    },
    placeholder: null
  },
  data () {
    return {
      term: null,
      options: null,
      ghost: 0
    }
  },
  computed: {
    index () {
      var fragments = Object.values(this.$root.fragments)
      return new Fuse(fragments, fuseOptions)
    }
  },
  methods: {
    blur () {
      var self = this
      setTimeout(function () {
        self.term = null
        self.options = null
        self.ghost = 0
      }, 100)
    },
    input () {
      var needle = this.term
      if (!needle) {
        this.options = null
        this.ghost = 0
        return
      }
      this.options = this.index.search(needle).slice(0, 20)
      this.ghost = Math.min(this.ghost, (this.options.length || 1) - 1)
    },
    keydown (evt) {
      let key = evt.which || evt.keyCode
      // key up&down
      if (key === 9) {
        this.confirm()
      } else if (key === 38) {
        this.ghost = Math.max(this.ghost - 1, 0)
      } else if (key === 40) {
        this.ghost = Math.min(this.ghost + 1, this.options.length - 1)
      }
    },
    submit (evt) {
      this.confirm()
      return false
    },
    confirm (uri) {
      if (typeof uri === 'string') {
        this.model = {'@id': uri}
        this.blur()
      } else if (!uri && this.options) {
        this.model = {'@id': this.options[this.ghost].item}
        this.blur()
      } else {
        console.log('confirming but dont know what', uri)
      }
    }
  }
}
</script>
