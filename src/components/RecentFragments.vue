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
      <div class="a-recent" v-for="fragment in limitedList" v-if="!fragment['@temp']">
        <a :href="'#!' + fragment['@id']" @mouseenter="enter(fragment['@id'])" @mouseleave="leave" class="a-fragment">
          {{ fragment['schema:name'] || label(fragment) || fragment['dcterms:title'] || fragment['@id'] }}
          <small v-if="fragment['schema:name'] || label(fragment) || fragment['dcterms:title']">{{ rellipsis(fragment['@id']) }}</small>
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
    hydratedList () {
      return this.filteredList.map(uri => this.fragments[uri]).filter(Boolean)
    },
    sortedList () {
      return this.order(this.hydratedList)
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
    rellipsis (uri) {
      return uri.length < 40 ? uri : '...' + uri.slice(-30)
    },
    order (arr) {
      if (!arr) {
        return arr
      }
      const key = '@updated_at'

      const copy = arr.slice()
      copy.sort(function (a, b) {
        return b[key] === a[key] ? 0 : (b[key] || '') > (a[key] || '') ? 1 : -1
      })
      console.log(copy.map(c => c[key]))
      return copy
    }
  },
  mounted () {
    // console.log('recent', this.$route.path)
  }
}
</script>
