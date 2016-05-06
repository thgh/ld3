<template>
  <section>
    <h2>Fragments</h2>
    <div class="inp-text inp-search">
      <input type="text" v-model="search" placeholder="Search...">
    </div>
    <div class="a-recent" v-for="(uri, fragment) in list | filterBy search" transition="staggered">
      <a href="#!{{uri}}" class="a-fragment">
        {{ fragment['schema:name'] || label(fragment) || fragment['dcterms:title'] || 'Unnamed' }}
        <small>{{ uri }}</small>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'recent-fragments',
  props: ['list'],
  data () {
    return {
      search: ''
    }
  },
  methods: {
    label (fragment) {
      return !fragment['rdfs:label'] ? false : typeof fragment['rdfs:label'] === 'string' ? fragment['rdfs:label'] : Array.isArray(fragment['rdfs:label']) ? fragment['rdfs:label'][0]['@value'] : fragment['rdfs:label']['@value']
    }
  },
  ready () {
    // console.log('recent', this.$route.path)
  }
}
</script>

<style>
.a-recent {
  height: 3em;
}
.staggered-transition {
  transition: opacity .5s ease, height .5s ease;
  overflow: hidden;
}
.staggered-enter, .staggered-leave {
  opacity: 0;
  height: 0;
}
</style>