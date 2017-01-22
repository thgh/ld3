<template>
  <span class="inp-subtle">
    <span class="inp-subtle-span" v-text="(value || placeholder) + '.'"></span>
    <textarea type="text" v-model="model" :placeholder="placeholder"></textarea>
  </span> 
</template>

<script>
export default {
  name: 'textarea-subtle',
  props: ['value', 'placeholder'],
  computed: {
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
