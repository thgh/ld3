<template>
  <input v-model="fragment[prop]" placeholder="{placeholder}">
</template>

<script>
export default {
  name: 'value-string',
  props: ['fragment', 'prop']
}
</script>
