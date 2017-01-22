<template>
  <span class="inp-subtle"><span class="inp-subtle-span" v-text="value || placeholder"></span> <input class="inp-big-focus" type="text" v-model="model" :placeholder="placeholder"></span> 
</template>

<script>
export default {
  name: 'input-subtle',
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
