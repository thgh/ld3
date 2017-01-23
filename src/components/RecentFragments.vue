<template>
  <section :class="{ 'nav-muted': !search }">
    <div class="inp-text inp-search">
      <input type="text" v-model="search" :placeholder="'Search through ' + $root.fragmentCount + ' fragments...'">
    </div>
    <div class="nav-fragments">
      <div class="a-recent" v-if="!search || !list">
        <a :href="'#!create'" @mouseenter="leave" @mouseleave="leave" class="a-fragment">
          Add...
          <small>new fragment</small>
        </a>
      </div>
      <div class="a-recent" v-for="uri in limitedList" v-if="!fragments[uri]['@temp']">
        <a :href="'#!' + uri" @mouseenter="enter(uri)" @mouseleave="leave" class="a-fragment">
          {{ fragments[uri]['schema:name'] || label(fragments[uri]) || fragments[uri]['dcterms:title'] || uri }}
          <small v-if="fragments[uri]['schema:name'] || label(fragments[uri]) || fragments[uri]['dcterms:title']">{{ uri }}</small>
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
  computed: {
    filteredList () {
      return Object.keys(this.$root.fragments).filter(f => f.includes(this.search))
    },
    sortedList () {
      return this.order(this.filteredList)
    },
    limitedList () {
      return this.sortedList
    },
    fragments () {
      return this.$root.fragments
    }
  },
  methods: {
    enter (uri) {
      clearTimeout(this.intentTimeout)
      this.intentTimeout = setTimeout(function () {
        window.location.hash = '!' + uri
        this.intentUri = null
      }, 2000)
      this.intentUri = uri
    },
    leave () {
      clearTimeout(this.intentTimeout)
      this.intentUri = null
    },
    label (fragment) {
      return !fragment['rdfs:label'] ? false : typeof fragment['rdfs:label'] === 'string' ? fragment['rdfs:label'] : Array.isArray(fragment['rdfs:label']) ? fragment['rdfs:label'][0]['@value'] : fragment['rdfs:label']['@value']
    },
    order (arr) {
      if (!arr) {
        return arr
      }
      const key = '@id'

      return arr.slice().sort(function (a, b) {
        return a[key] === b[key] ? 0 : a[key] > b[key] ? 1 : -1
      })
    }
  },
  mounted () {
    // console.log('recent', this.$route.path)
  }
}
</script>
