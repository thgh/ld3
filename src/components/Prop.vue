<template>
  <label class="inp-text" title="{placeholder}">
    <span class="inp-label">{{prop}}</span>
    <component :is="renderType" :fragment="fragment" :prop="prop"></component>
  </label>
</template>

<script>
import ValueString from './ValueString'
import ValueObject from './ValueObject'
import ValueArray from './ValueArray.vue'
import ValueReference from './ValueReference.vue'

export default {
  props: ['fragment', 'prop'],
  computed: {
    renderType () {
      let o = this.fragment[this.prop]
      return typeof o !== 'object' ? 'ValueString' : Array.isArray(o) ? 'ValueArray' : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference' : 'ValueObject'
    }
  },
  created () {
    // wut
  },
  ready () {
    // console.log('PE', this.fragment)
    // console.log(window)
  },
  components: {
    ValueString,
    ValueObject,
    ValueArray,
    ValueReference
  }
}
</script>
