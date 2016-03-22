<template>
  <textarea rows="{{len}}" v-model="fragment[prop]" placeholder="{placeholder}"></textarea>
</template>

<script>
export default {
  name: 'value-text',
  props: ['fragment', 'prop'],
  computed: {
    len () {
      return Math.ceil(this.fragment[this.prop].length / 60)
    }
  }
}
</script>
