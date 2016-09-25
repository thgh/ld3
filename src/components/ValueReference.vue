<template>
  <div class="value-reference">
    <value-object :fragment.sync="actualFragment" :ref.sync="model"></value-object>
  </div>
</template>

<script>
import ValueObject from './ValueObject.vue'

import { toMin } from '../libs/util.js'

export default {
  name: 'value-reference',
  props: ['fragment'],
  computed: {
    model: {
      get () {
        return this.fragment
      },
      set (ref) {
        if (this.fragment && this.fragment['@temp']) {
          console.error('ref: setting a @temp fragment is a bad idea')
        }
        this.$set('fragment', ref)
      }
    },
    actualFragment () {
      return this.$root.fragments[toMin(this.model['@id'])] || this.$root.fetch(this.model['@id'])
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