<template>
  <input v-model="fragment[prop]" placeholder="{placeholder}">
</template>

<script>
export default {
  props: ['fragment', 'prop'],
  data () {
    return {
      renderType: typeof this.fragment[this.prop]
    }
  },
  computed: {
    actualType () {
      return typeof this.fragment[this.prop]
    }
  },
  created () {
    // wut
  },
  ready () {
    // console.log('PE', this.fragment)
    // console.log(window)
  }
}
</script>
