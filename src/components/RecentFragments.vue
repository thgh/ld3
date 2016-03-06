<template>
	<section>
	  recent fragments<br>
	  <div v-for="(uri, fragment) in list">
	    <a href="#!{{uri}}">{{uri}}</a>
	  </div>
	</section>
</template>

<script>
export default {
  props: ['list', 'route'],
  ready () {
    // console.log('recent', this.$route.path)
  }
}
</script>
