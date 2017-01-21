<template>
  <div class="inp-subtle">
    <span class="inp-subtle-span" v-text="(value || '')+'.'"></span>
    <textarea class="inp-big-focus" :value="value" @input="$emit('input', $event.target.value)" @focus="show = 1" @blur="show = 0" :id="id"></textarea>
    <span class="inp-actions" v-if="show">
      <button type="button" class="btn-reset fragment-type" @click="convertToLiteral">+</button>
    </span>
  </div> 
</template>

<script>
// inp-subtle>inp-actions: transition=opacity
export default {
  name: 'value-text',
  props: ['value', 'id'],
  data () {
    return {
      show: false
    }
  },
  computed: {
    fragment () {
      return this.value
    }
  },
  methods: {
    convertToLiteral () {
      this.$emit('input', {
        '@type': '',
        '@value': this.value || ''
      })
    }
  }
}
</script>
