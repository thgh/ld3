<template>
  <div class="fragment">
    <header>
      <h1 class="fragment-h1">
        <input-subtle :model.sync="fragment['schema:name']" :placeholder="fragment['@id']||'Fatal error'"></input-subtle>
        <span class="ld-propclass" v-if="fragment['@type']" v-text="fragment['@type']"></span>
      </h1>
      <div class="fragment-json mdi mdi-12px mdi-code-braces">
        <p class="fragment-collapse" style="float:right">
          <input type="text" :value="fragment['@id']" @blur="copy">
        </p>
        <pre class="fragment-collapse fragment-pre">{{fragment|json}}</pre>
      </div>
    </header>

    <article>
      <props-list :fragment.sync="fragment"></props-list>
    </article>

    <p class="fragment-cta">
      <button class="btn btn-save" :class="{'btn-save':savable,'btn-soft':!savable}" @click="sync">Sync</button>
    </p>

    <div v-if="loadPlugin(fragment['@type'])&&resolved" :is="fragment['@type']" :a="resolved" :options="options">test</div>
  </div>
</template>

<script>
import InputSubtle from './InputSubtle'
import PropsList from './PropsList'

import PluginSystem from '../mixins/PluginSystem'

export default {
  props: ['fragment'],
  data () {
    return {
      options: {
        resolve: 0
      },
      resolved: null,
      addPropShow: false,
      addPropSearch: '',
      addPropValue: ''
    }
  },
  computed: {
    props () {
      return this.fragment
    },
    savable () {
      return this.$root.syncAgo > 5
    },
    resolved () {
      return this.$root.resolve(this.fragment, this.options.resolve)
    }
  },
  methods: {
    loadProps () {
      this.addPropShow = true
    },
    copy (evt) {
      var uri = this.$root.copy(this.fragment['@id'], evt.target.value)
      if (uri) {
        window.location.href = '#' + uri
      }
    },
    sync () {
      this.$root.sync(this.fragment)
    }
  },
  mixins: [PluginSystem],
  components: {
    InputSubtle,
    PropsList
  }
}
</script>
