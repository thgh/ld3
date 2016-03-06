<template>
  recent fragments<br>
  <div v-for="(uri, fragment) in list">
    <a v-link="{ path: '/'+uri }">{{uri}}</a>
  </div>
</template>

<script>
export default {
  props: ['list'],
  ready () {
    // console.log('recent', this.$route.path)
  }
}
</script>
