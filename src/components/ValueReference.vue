<template>
  <div class="value-reference">
    <value-object v-model="model" :reference="1" @changeRef="" @focus="$emit('focus')" />
  </div>
</template>

<script>
import ValueObject from './ValueObject.vue'

import { toMin } from '../libs/util.js'

export default {
  name: 'value-reference',
  props: ['value', 'id'],
  computed: {
    model: {
      get () {
        const uri = toMin((this.value || {})['@id'])
        return this.$root.fragments[uri] || this.$root.fetch(uri) || {}
      },
      set (val) {
        if (this.value && this.value['@temp']) {
          console.error('ref: setting a @temp fragment is a bad idea')
        }
        this.$emit('input', val)
      }
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
