<template>
  <form class="inp-subtle" @submit.prevent.stop="submit" @keydown="keydown">{{term||placeholder}} <input type="text" v-model="term" :placeholder="placeholder" @blur="blur" @input="input"><div class="ref-select" v-if="options">
      <div class="ref-option" :class="{'ref-ghost':$index===ghost}" v-for="opt in options" v-text="opt.item+' '+opt.score" track-by="item" @mouseenter="ghost=$index" @click="confirm(opt.item)" transition="staggered"></div>
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
      this.ghost = Math.min(this.ghost, this.options.length - 1)
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
        console.log('confirming', uri, this.$root.fragments[uri])
      } else if (!uri) {
        console.log('confirming', this.ghost, this.$root.fragments[this.options[this.ghost].item])
      } else {
        console.log('confirming but dont know what', uri)
      }
    }
  }
}
// var walkProps = function (obj) {
//   var s = ''
//   for (var x in obj) {
//     if (typeof obj[x] === 'string') {
//       s += obj[x]
//     } else {
//       s += walkProps(obj[x])
//     }
//   }
//   return s
// }
</script>

<style lang="scss">
@import '../scss/variables';
.ref-select {
  position: absolute;
  z-index: 2;
  top: 100%;
  left: -3px;
  margin-top: 3px;
  min-width: calc(100% + 6px);
  background-color: black;
  color: white;
  white-space: normal;
}
.ref-option {
  padding: 0 10px;
  white-space: nowrap;
  line-height: 34px;
  height: 34px;
}
.ref-ghost {
  background-color: #555;
}
</style>
