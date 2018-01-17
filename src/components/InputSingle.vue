<template>
  <label class="input input--single" :class="classes">
    <div class="input__label">{{ label }}</div>
    <span class="input__input inp-subtle">
      <span class="inp-subtle-span" v-text="(model || '') + '.'"></span>
      <textarea
        :autofocus="!model"
        class="input__input__textarea"
        type="text"
        v-model="model"
        @focus="focus = 1"
        @blur="focus = 0"
      ></textarea>
    </span> 
  </label>
</template>

<script>
import { inert, toMin } from '../libs/util.js'

export default {
  name: 'input-single',
  props: {
    a: null,
    path: null,
    label: null,
    length: {
      default: 10
    }
  },
  data () {
    return {
      focus: false
    }
  },
  computed: {
    classes () {
      return {
        'input--empty': !this.model,
        'input--focus': this.focus
      }
    },
    model: {
      get () {
        return this.parent[this.prop]
      },
      set (v) {
        this.$set(this.parent, this.prop, v)
      }
    },
    parent () {
      return this.resolved.parent
    },
    prop () {
      return this.resolved.prop
    },
    resolved () {
      if (!this.a || !this.a['@id']) {
        return console.warn('input single only supports fragments with @id')
      }

      let a = this.storage(this.a)

      const pieces = this.path && this.path.split('.') || []
      let lastPiece = '.'

      // Loop over all path pieces
      for (let i = 0; i < pieces.length; i++) {
        let piece = 'schema:' + pieces[i]

        // Return the last piece and its parent
        if (i === pieces.length - 1) {
          if (typeof a[piece] === 'undefined') {
            this.$set(a, piece, '')
          }
          return {
            parent: a,
            prop: piece
          }
        }

        if (a[piece] === undefined) {
          this.$set(a, piece, { '@id': '', '@type':'', 'schema:name': '' })
          a = a[piece]
        } else if (!a[piece] || typeof a[piece] === 'string' || typeof a[piece] === 'number') {
          a[piece] = { '@id': '', '@type':'', 'schema:name': a[piece] || '' }
          a = a[piece]
        } else if (typeof a[piece] === 'object') {
          a = this.storage(a[piece]) || a[piece]
        } else {
          console.warn('unexpected piece', a, piece)
        }

        lastPiece = piece
      }
      throw 'path param in follow() is required'
    }
  },
  methods: {
    storage (key) {
      return this.$root.fragments[toMin(typeof key === 'object' ? key['@id'] : key)]
    }
  }
}
</script>
