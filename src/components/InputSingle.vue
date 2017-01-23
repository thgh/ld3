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
        console.log('setting', this.parent, this.prop, v)
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
      var a = this.storage(this.a)
      var pieces = this.path && this.path.split('.') || []

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
    }
  },
  methods: {
    storage (key) {
      return this.$root.fragments[toMin(typeof key === 'object' ? key['@id'] : key)]
    }
  }
}
</script>
