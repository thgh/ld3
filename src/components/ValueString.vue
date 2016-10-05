<template>
  <input v-model="fragment" placeholder="{placeholder}">
</template>

<script>
export default {
  name: 'value-string',
  props: ['parent', 'prop', 'id'],
  computed: {
    fragment () {
      return this.parent[this.prop]
    }
  }
}
</script>
