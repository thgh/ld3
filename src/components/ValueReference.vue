<template>
  <div class="value-reference">
    <value-object :parent="$root.fragments" :prop="uri" :ref="1" @changeRef=""></value-object>
  </div>
</template>

<script>
import ValueObject from './ValueObject.vue'

import { toMin } from '../libs/util.js'

export default {
  name: 'value-reference',
  props: ['parent', 'prop', 'id'],
  computed: {
    fragment () {
      return this.parent[this.prop]
    },
    model: {
      get () {
        return this.fragment
      },
      set (ref) {
        if (this.fragment && this.fragment['@temp']) {
          console.error('ref: setting a @temp fragment is a bad idea')
        }
        this.$set(this.parent, this.prop, ref)
      }
    },
    uri () {
      return toMin(this.model['@id'])
    },
    actualFragment () {
      return this.$root.fragments[this.uri] || this.$root.fetch(this.uri)
    }
  },
  events: {
    propFocus (prop, _uid) {
      this.$parent.$emit('propFocus', prop, _uid)
    }
  },
  components: {
    ValueObject
  }
}
</script>

<style>
.value-reference {
  flex-grow: 1;
  /* width: 100%; */
}
</style>