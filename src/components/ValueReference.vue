<template>
  <value-object :fragment.sync="actualFragment" :ref="1"></value-object>
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
      return this.$root.fragments[this.$root.ns.min(this.value['@id'])] || this.$root.fetch(this.value['@id'])
    }
  },
  components: {
    ValueObject
  }
}
</script>
