<template>
  <section>
    <h2>Fragments</h2>
    <div class="inp-text inp-search">
      <input type="text" v-model="search" placeholder="Search...">
    </div>
    <div v-for="(uri, fragment) in list | filterBy search" transition="staggered">
      <a href="#!{{uri}}" class="a-fragment">
        {{ fragment['schema:name'] || label || fragment['dcterms:title'] || 'Unnamed' }}
        <small>{{ uri }}</small>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  props: ['list'],
  data: {
    search: ''
  },
  computed: {
    label () {
      return Array.isArray(this.fragment['rdfs:label']) ? this.fragment['rdfs:label'][0]['@value'] : this.fragment['rdfs:label']['@value']
    }
  },
  ready () {
    // console.log('recent', this.$route.path)
  }
}
</script>

<style>
.staggered-transition {
  transition: all .5s ease;
  overflow: hidden;
  margin: 0;
  height: 3em;
}
.staggered-enter, .staggered-leave {
  opacity: 0;
  height: 0;
}
</style>