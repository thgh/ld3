<template>
  <div class="fragment">
    <header>
      <h1 class="fragment-h1">{{fragment['schema:name']}} <span class="ld-propclass" v-if="fragment['@type']" v-text="fragment['@type']"></span> <small><small><small style="opacity:.5">{{uri}}</small></small></small></h1>
      <div class="fragment-json mdi mdi-12px mdi-code-braces">
        <pre class="fragment-pre">{{fragment|json}}</pre>
      </div>
    </header>

    <article>
      <props-list :fragmentprops.sync="fragment"></props-list>
      <label class="inp-text label-prop">
        <button v-if="!addPropShow" class="btn-add" @click="addPropShow=1">Add</button>
        <input v-if="addPropShow" v-model="addPropSearch" placeholder="property..." @change="loadProps" @focus="addPropShow=1;loadProps()" class="inp-prop" required>
        <input v-if="addPropShow" v-model="addPropValue" placeholder="value..." @change="guessProp" @focus="addPropShow=0" required>
      </label>
      <pre v-text="fragment|json"></pre>
      <div v-show="hasPlugin" :is="fragment['@type']" :a="fragment">test</div>
    </article>
  </div>
</template>

<script>
import PropsList from './PropsList'
import Invoice from './plugins/Invoice'

var plugins = {'Invoice': true}

export default {
  props: ['fragment', 'uri'],
  data () {
    return {
      'addPropShow': false,
      'addPropSearch': '',
      'addPropValue': ''
    }
  },
  computed: {
    hasPlugin () {
      return this.fragment['@type'] in plugins
    },
    props () {
      return this.fragment
    }
  },
  methods: {
    loadProps () {
      this.addPropShow = true
    }
  },
  ready () {
    // console.log('FE', this.fragment['schema:name'], this.fragment)
  },
  components: {
    PropsList,
    Invoice
  }
}
</script>
