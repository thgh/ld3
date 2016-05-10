<template>
  <div>
    <value-object :fragment.sync="actualFragment" :ref.sync="model"></value-object>
  </div>
</template>

<script>
import ValueObject from './ValueObject'

export default {
  name: 'value-reference',
  props: ['fragment', 'prop', 'index'],
  computed: {
    model: {
      get () {
        return typeof this.prop !== 'string' ? this.fragment : typeof this.index === 'number' ? this.fragment[this.prop][this.index] : this.fragment[this.prop]
      },
      set (obj) {
        if (typeof this.prop !== 'string') {
          console.warn('ref: not supported')
        } else if (typeof this.index === 'number') {
          console.warn('ref: array set index')
          this.fragment[this.prop][this.index] = obj
        } else {
          console.warn('ref: normal')
          this.fragment[this.prop] = obj
        }
      }
    },
    actualFragment () {
      return this.$root.fragments[this.$root.ns.min(this.model['@id'])] || this.$root.fetch(this.model['@id'])
    }
  },
  components: {
    ValueObject
  }
}
</script>
