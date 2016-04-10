<template>
	<section>
	  <h2>recent fragments</h2>
	  <div v-for="(uri, fragment) in list">
	    <a href="#!{{uri}}" class="a-fragment">
	    	{{ fragment['schema:name'] || fragment.name || 'Unnamed' }}
	    	<small>{{ uri }}</small>
	    </a>
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
