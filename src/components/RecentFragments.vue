<template>
  <section :class="{'nav-muted':!search}">
    <div class="inp-text inp-search">
      <input type="text" v-model="search" placeholder="Search through {{$root.fragmentCount}} fragments...">
    </div>
    <div class="nav-fragments">
      <div class="a-recent" v-for="(uri, fragment) in list | filterBy search" v-if="!fragment['@temp']">
        <a href="#!{{uri}}" @mouseenter="enter(uri)" @mouseleave="leave" class="a-fragment">
          {{ fragment['schema:name'] || label(fragment) || fragment['dcterms:title'] || uri }}
          <small v-if="fragment['schema:name'] || label(fragment) || fragment['dcterms:title']">{{ uri }}</small>
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
    enter (uri) {
      clearTimeout(this.intentTimeout)
      this.intentTimeout = setTimeout(function () {
        window.location.hash = '!' + uri
        this.intentUri = null
      }, 200)
      this.intentUri = uri
    },
    leave () {
      clearTimeout(this.intentTimeout)
      this.intentUri = null
    },
    label (fragment) {
      return !fragment['rdfs:label'] ? false : typeof fragment['rdfs:label'] === 'string' ? fragment['rdfs:label'] : Array.isArray(fragment['rdfs:label']) ? fragment['rdfs:label'][0]['@value'] : fragment['rdfs:label']['@value']
    }
  },
  ready () {
    // console.log('recent', this.$route.path)
  }
}
</script>
