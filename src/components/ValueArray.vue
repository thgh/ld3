<template>
  <div>
    <component v-for="_nope in fragment[prop]" :is="renderType[$index]" :fragment="fragment" :prop="prop" :index="$index"></component>
  </div>
</template>

<script>
import ValueObject from './ValueObject'
import ValueReference from './ValueReference.vue'

export default {
  props: ['fragment', 'prop'],
  computed: {
    renderType (o) {
      console.log('calling render')
      return this.fragment[this.prop].map(function (o) {
        return typeof o !== 'object' ? console.log('ErrorType') : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference' : 'ValueObject'
      })
    }
  },
  components: {
    ValueObject,
    ValueReference
  }
}
</script>
