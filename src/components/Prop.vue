<template>
  <label class="inp-text prop" :class="{active:active}" title="{placeholder}">
    <span class="inp-label">{{prop}}</span>
    <component :is="renderType" :fragment.sync="fragment" :prop="prop"></component>
  </label>
</template>

<script>
import ValueText from './ValueText'
import ValueString from './ValueString'
import ValueObject from './ValueObject'
import ValueArray from './ValueArray.vue'
import ValueReference from './ValueReference.vue'

export default {
  name: 'prop',
  props: ['fragment', 'prop'],
  data () {
    return {
      active: false
    }
  },
  computed: {
    renderType () {
      let o = this.fragment[this.prop]
      return typeof o !== 'object' ? (o.length < 50 ? 'ValueString' : 'ValueText') : Array.isArray(o) ? 'ValueArray' : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference' : 'ValueObject'
    }
  },
  events: {
    deactivate () {
      this.active = false
      return true
    },
    objectActivated () {
      this.active = true
      return true
    }
  },
  components: {
    ValueText,
    ValueString,
    ValueObject,
    ValueArray,
    ValueReference
  }
}
</script>

<style lang="scss">
@import '../scss/variables';
.inp-text.active {
  z-index: 11;
  outline: 1px solid red;
}
.props-list {
  flex-basis: 100%;
  flex-shrink: 0;
}
</style>
