<template>
  <label class="inp-text" title="{placeholder}">
    <span class="inp-label">{{prop}}</span>
    <input v-model="fragment[prop]" placeholder="{placeholder}">
  </label>
</template>

<script>
export default {
  props: ['fragment', 'prop'],
  ready () {
    // console.log('PE', this.fragment)
    // console.log(window)
  }
}
</script>
