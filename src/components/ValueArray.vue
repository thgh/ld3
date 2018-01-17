<template>
  <div class="value-array" :class="{ 'value-array--focus': focusIndex >= 0 }">
    <component
      v-for="(item, index) in value"
      :is="toType(item)"
      :value="item"
      :key="key(item) || index"
      @focus="focus(index)"
      @input="input(index, $event)"
      @remove="remove(index)"
    />
    <button class="btn-add" @click="push">Add</button>
  </div>
</template>

<script>
import { inert, toType } from '../libs/util.js'

import ValueArray from './ValueArray.vue'
import ValueLiteral from './ValueLiteral.vue'
import ValueObject from './ValueObject.vue'
import ValueReference from './ValueReference.vue'
import ValueString from './ValueString.vue'
import ValueText from './ValueText.vue'

export default {
  name: 'value-array',
  props: {
    value: {
      type: Array
    }
  },
  data () {
    return {
      focusIndex: -1
    }
  },
  computed: {
  },
  methods: {
    key (item) {
      return item && item['@id']
    },
    focus (index) {
      console.debug('value-array focus', index)
      this.focusIndex = index
    },
    input (index, val) {
      this.$set(this.value, index, val)
    },
    remove (index) {
      const input = this.value.slice()
      input.splice(index, 1)
      this.$emit('input', input)
    },
    push () {
      var a = this.value
      var b = !a || !a[a.length - 1] ? {} : inert(a[a.length - 1])
      if (toType(b) === 'ValueReference' && this.$root.fragments[b['@id']]) {
        b = inert(this.$root.fragments[b['@id']])
      }
      b['@id'] = '_:' + Date.now() % 1000000
      b['@type'] = b['@type'] || 'schema:Thing'
      this.value.push(b)
    },
    toType
  },
  components: {
    ValueArray,
    ValueLiteral,
    ValueObject,
    ValueReference,
    ValueString,
    ValueText
  }
}
</script>

<style>
.value-array {
  flex-grow: 1;
}
</style>
