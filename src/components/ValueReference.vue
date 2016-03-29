<template>
  <div>=>>
    <value-object :fragment.sync="actualFragment"></value-object>
  </div>
</template>

<script>
import ValueObject from './ValueObject'

export default {
  name: 'value-reference',
  props: ['fragment', 'prop', 'index'],
  computed: {
    value () {
      return typeof this.prop !== 'string' ? this.fragment : typeof this.index === 'number' ? this.fragment[this.prop][this.index] : this.fragment[this.prop]
    },
    actualFragment () {
      return this.$root.fragmentCache[this.$root.ns.minify(this.value)['@id']]
    }
  },
  components: {
    ValueObject
  }
}
</script>
