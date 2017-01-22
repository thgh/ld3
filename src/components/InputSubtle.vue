<template>
  <span class="inp-subtle"><span class="inp-subtle-span" v-text="value || placeholder"></span> <input class="inp-big-focus" type="text" :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder"></span> 
</template>

<script>
export default {
  name: 'input-subtle',
  props: ['value', 'placeholder']
}
</script>
