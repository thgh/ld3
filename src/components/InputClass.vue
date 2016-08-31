<template>
  <form class="inp-subtle inp-type fragment-type" :class="{'inp-type-active':options}" @submit.prevent.stop="submit" @keydown="keydown">
    <span class="inp-subtle-span" v-text="term||text"></span>
    <input type="text" v-model="term" :placeholder="text" @blur="blur" @input="input" @focus="input">
    <div class="ref-select" v-if="options">
      <div class="ref-scroll">
        <div class="ref-option" :class="{'ref-ghost':$index===ghost}" v-for="opt in options" v-text="opt.item+' '+opt.score" track-by="item" @mouseenter="ghost=$index" @mousedown="confirm(opt.item)"></div>
      </div>
    </div>
  </form> 
</template>

<script>
import Fuse from 'fuse.js'
import {Classes} from '../libs/schema.js'

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
      return new Fuse(Classes, fuseOptions)
    },
    related () {
      if (!this.model) {
        return
      }
      var model = this.model.slice(this.model.lastIndexOf(':') + 1)
      // Get parent classes
      var par = Classes.find(c => c.i === model)
      var opts = par && par.s && (par.s.length ? par.s : [par.s]) || []
      // Get child classes
      var chi = Classes.filter(c => c.s && (c.s.i === model || c.s.length && c.s.find(x => x.i === model)))
      opts = opts.concat(chi)
      // Transform to match options
      return opts.map(c => { return {item: c.i, score: ''} })
    },
    text () {
      var t = this.model || this.placeholder
      return t ? t.slice(t.lastIndexOf(':') + 1) : '?'
    }
  },
  methods: {
    blur () {
      var self = this
      setTimeout(function () {
        self.term = null
        self.ghost = 0
        self.options = null
      }, 100)
    },
    input () {
      if (!this.term) {
        if (this.model) {
          this.options = this.related
        } else {
          this.options = null
          this.ghost = 0
        }
        return
      }
      this.options = this.index.search(this.term).slice(0, 20).concat({
        item: this.term,
        score: ''
      })
      this.changeGhost(0)
    },
    keydown (evt) {
      let key = evt.which || evt.keyCode
      if (key === 9 && !(this.term === null && this.ghost === 0)) {
        // tab: submit if touched anything
        this.submit()
      } else if (key === 13) {
        // enter: form will submit, but should also blur
        this.blur()
      } else if (key === 38) {
        // arrow up
        this.changeGhost(-1)
      } else if (key === 40) {
        // arrow down
        this.changeGhost(1)
      }
    },
    changeGhost (i) {
      this.ghost = Math.max(Math.min(this.ghost + i, (this.options.length || 1) - 1), 0)
    },
    submit (evt) {
      this.confirm(this.options && this.options[this.ghost] && this.options[this.ghost].item || 'Thing')
      return false
    },
    confirm (uri) {
      if (typeof uri !== 'string' || !uri) {
        return console.warn('confirming but dont know what', uri)
      }
      this.model = 'schema:' + uri
      this.term = null
      this.ghost = 0
    }
  }
}
</script>
