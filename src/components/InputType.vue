<template>
  <form class="inp-subtle inp-type fragment-type" :class="{ 'inp-type-active': options }" @submit.prevent.stop="submit" @keydown="keydown">
    <span class="inp-subtle-span" v-text="term || value || placeholder"></span>
    <input type="text" v-model="term" :placeholder="value || placeholder" @blur="blur" @input="input" @focus="input">
    <div class="ref-select" v-if="options">
      <div class="ref-option" :class="{ 'ref-ghost': index === ghost }" v-for="(opt, index) in options" v-text="opt.item || opt.action" :key="opt.item" @mouseenter="ghost = index" @mousedown="confirm(opt.item)"></div>
    </div>
  </form> 
</template>

<script>
import Fuse from 'fuse.js'

const Classes = [
  {i: 'xsd:boolean'},
  {i: 'xsd:date'},
  {i: 'xsd:dateTime'},
  {i: 'xsd:decimal'},
  {i: 'xsd:integer'},
  {i: 'xsd:string'}
]

var fuseOptions = {
  caseSensitive: false,
  include: ['score'],
  shouldSort: true,
  tokenize: false,
  threshold: 0.6,
  location: 0,
  distance: 100,
  id: 'i',
  keys: ['i']
}

export default {
  name: 'input-type',
  props: ['value', 'placeholder'],
  data () {
    return {
      term: null,
      options: null,
      ghost: 0
    }
  },
  computed: {
    index () {
      var fragments = Classes
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
        self.$emit('blur')
      }, 100)
    },
    input () {
      if (!this.term) {
        this.options = [{
          action: 'Object',
          score: ''
        }]
        this.ghost = 0
        return console.debug('No term')
      }
      this.options = this.index.search(this.term).slice(0, 20).concat({
        action: 'Object: ' + this.term,
        score: ''
      })
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
      console.debug('input-type confirm', uri)
      if (typeof uri === 'string') {
        this.$emit('input', uri)
        this.blur()
      } else if (!uri && this.options) {
        // TODO: set smart default @type
        this.$emit('input', this.options[this.ghost].item || this.term || 'schema:Person')
        this.blur()
      } else {
        console.debug('confirming but dont know what', uri)
      }
    }
  }
}
</script>
