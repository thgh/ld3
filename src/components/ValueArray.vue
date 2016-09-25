<template>
  <div class="value-array">
    <component v-for="_nope in fragment" :is="renderType[$index]" :fragment.sync="fragment[$index]" @splice="splice($index)"></component>
    <button class="btn-add" @click="push">Add</button>
  </div>
</template>

<script>
import { inert, toType } from '../libs/util.js'

import ValueObject from './ValueObject.vue'
import ValueReference from './ValueReference.vue'

export default {
  props: ['fragment'],
  computed: {
    renderType () {
      return this.fragment.map(function (o) {
        return typeof o !== 'object' ? console.log('ErrorType') : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference' : 'ValueObject'
      })
    }
  },
  methods: {
    splice (index) {
      this.fragment.splice(index, 1)
    },
    push () {
      var a = this.fragment
      var b = !a || !a[a.length - 1] ? {} : inert(a[a.length - 1])
      if (toType(b) === 'ValueReference' && this.$root.fragments[b['@id']]) {
        b = inert(this.$root.fragments[b['@id']])
      }
      b['@id'] = '_:' + Date.now() % 1000000
      b['@type'] = b['@type'] || 'schema:Thing'
      this.fragment.push(b)
    }
  },
  events: {
    arrayFocused () {
      this.$broadcast('siblingObjectActivated')
    }
  },
  components: {
    ValueObject,
    ValueReference
  }
}
</script>

<style>
.value-array {
  flex-grow: 1;
}
</style>