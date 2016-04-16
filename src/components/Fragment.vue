<template>
  <div class="fragment">
    <header>
      <h1 class="fragment-h1">
        <subtle-input :model="fragment" :placeholder="fragment['@id']||'Fatal error'"></subtle-input>
        <span class="ld-propclass" v-if="fragment['@type']" v-text="fragment['@type']"></span> <small><small><small style="opacity:.5">{{fragment['@id']}}</small></small></small>
      </h1>
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
      <!-- <div v-show="hasPlugin" :is="fragment['@type']" :a="fragment">test</div> -->
    </article>

    <p class="fragment-cta">
      <button class="btn btn-save" :class="{'btn-save':savable,'btn-soft':!savable}" @click="sync">Sync</button>
    </p>
  </div>
</template>

<script>
import SubtleInput from './SubtleInput'
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
    },
    savable () {
      return this.$root.syncAgo > 5
    }
  },
  methods: {
    loadProps () {
      this.addPropShow = true
    },
    sync () {
      this.$root.sync(this.fragment)
    }
  },
  ready () {
    // console.log('FE', this.fragment['schema:name'], this.fragment)
  },
  components: {
    SubtleInput,
    PropsList,
    Invoice
  }
}
</script>
