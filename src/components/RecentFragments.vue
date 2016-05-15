<template>
  <section :class="{'nav-muted':!search}">
    <div class="inp-text inp-search">
      <input type="text" v-model="search" placeholder="Search through {{$root.fragmentCount}} fragments...">
    </div>
    <div class="nav-fragments">
      <div class="a-recent" v-for="(uri, fragment) in list | filterBy search">
        <a href="#!{{uri}}" class="a-fragment">
          {{ fragment['schema:name'] || label(fragment) || fragment['dcterms:title'] || 'Unnamed' }}
          <small>{{ uri }}</small>
        </a>
      </div>
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
