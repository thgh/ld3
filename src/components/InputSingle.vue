<template>
  <label class="inp-single">
    {{ label }}
    <input type="text" v-model="model" :placeholder="label">
  </label>
</template>

<script>
import { inert, toMin } from '../libs/util.js'

var parent
var prop

export default {
  name: 'input-single',
  props: ['a', 'path', 'label'],
  computed: {
    parent () {
      return this.follow(this.path).parent
    },
    prop () {
      return this.path.slice()
    },
    model: {
      get () {
        return this.value
      },
      set (v) {
        this.$set(this.parent, this.prop, v)
      }
    }
  },
  methods: {
    follow (path) {
      if (!this.a || !this.a['@id']) {
        return console.warn('input single only supports fragments with @id')
      }
      var a = this.storage(this.a)
      var pieces = path && path.split('.') || []

      // Loop over all path pieces
      for (let i = 0; i < pieces.length; i++) {
        let piece = 'schema:' + pieces[i]
        if (typeof a[piece] === 'undefined') {
          this.$set(a, piece, i < pieces.length - 1 ? {} : 'nope')
        }
        if (i === pieces.length - 1) {
          return {
            parent: a,
            prop: piece
          }
        }
        a = this.storage(a[piece]) || a[piece]
      }
      throw 'path param in follow() is required'
    },
    storage (key) {
      return this.$root.fragments[toMin(typeof key === 'object' ? key['@id'] : key)]
    }
  }
}
</script>
