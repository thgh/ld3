<template>
  <div class="value-array">
    <component v-for="_nope in fragment[prop]" :is="renderType[$index]" :fragment.sync="fragment" :prop="prop" :index="$index"></component>
    <button class="btn-add" @click="push">Add</button>
  </div>
</template>

<script>
import U from '../libs/util'

import ValueObject from './ValueObject'
import ValueReference from './ValueReference'

export default {
  props: ['fragment', 'prop'],
  computed: {
    renderType () {
      return this.fragment[this.prop].map(function (o) {
        return typeof o !== 'object' ? console.log('ErrorType') : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference' : 'ValueObject'
      })
    }
  },
  methods: {
    push () {
      var a = this.fragment[this.prop]
      var b = !a || !a[a.length - 1] ? {} : U.inert(a[a.length - 1])
      if (U.valueType(b) === 'ValueReference' && this.$root.fragments[b['@id']]) {
        b = U.inert(this.$root.fragments[b['@id']])
      }
      b['@id'] = '_:' + Date.now() % 1000000
      b['@type'] = b['@type'] || 'schema:Thing'
      this.fragment[this.prop].push(b)
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
