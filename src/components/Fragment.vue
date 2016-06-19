<template>
  <div class="fragment">
    <header>
      <h1 class="fragment-h1">
        <textarea-subtle :model.sync="fragment['schema:name']" :placeholder="fragment['@id']||'Fatal error'"></textarea-subtle>
        <input-class :model.sync="fragment['@type']" placeholder="wut"></input-class>
      </h1>
      <div class="fragment-json mdi mdi-12px mdi-code-braces">
        <p class="fragment-collapse" style="text-align:right">
          Copy fragment to:
          <input type="text" :value="fragment['@id']" @blur="copy">
          <br>
          <br>
          <button type="button" @click="$root.fetch(fragment['@id'], true)">refetch</button>
        </p>
        <pre class="fragment-collapse fragment-pre">{{fragment|json}}</pre>
      </div>
    </header>

    <article>
      <props-list :fragment.sync="fragment"></props-list>
    </article>

    <p class="fragment-cta">
      <button class="btn" :class="{'btn-soft':!savable}" @click="sync">Sync</button>
    </p>

    <div v-if="loadPlugin(fragment['@type'])&&resolved" :is="fragment['@type']" :a="resolved" :options="options">test</div>
  </div>
</template>

<script>
import InputClass from './InputClass'
import PropsList from './PropsList'
import TextareaSubtle from './TextareaSubtle'

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
    niceType () {
      var t = this.fragment['@type']
      return t ? t.slice(t.lastIndexOf(':') + 1) : '?'
    },
    props () {
      return this.fragment
    },
    savable () {
      return this.$root.syncAgo > 1
    },
    resolved () {
      return this.$root.resolve(this.fragment, this.options.resolve)
    }
  },
  methods: {
    copy (evt) {
      var uri = this.$root.copy(this.fragment['@id'], evt.target.value)
      if (uri) {
        window.location.href = '#!' + uri
      }
    },
    sync () {
      this.$root.sync(this.fragment)
    }
  },
  mixins: [PluginSystem],
  components: {
    InputClass,
    PropsList,
    TextareaSubtle
  }
}
</script>
