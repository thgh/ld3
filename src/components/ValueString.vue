<template>
  <input v-model="fragment" placeholder="{placeholder}">
</template>

<script>
export default {
  name: 'value-string',
  props: ['fragment']
}
</script>
