<template>
  <div class="fragment" :class="{ 'focus-prop': focusProp, 'focus-from': focusFrom }">
    <header>
      <h1 class="fragment-h1">
        <textarea-subtle v-model="fragment['schema:name']" :placeholder="fragment['@id'] || 'Fatal error'" />
        <input-class v-model="fragment['@type']" placeholder="wut" />
      </h1>
      <div class="fragment-json mdi mdi-12px mdi-code-braces">
        <p class="fragment-collapse" style="text-align: right">
          Copy fragment to:
          <input type="text" :value="fragment['@id']" @blur="copy">
          <br>
          <br>
          <button type="button" @click="$root.fetch(fragment['@id'], true)">refetch</button>
        </p>
        <pre class="fragment-collapse fragment-pre">{{ fragment }}</pre>
      </div>
    </header>

    <article>
      <props-list :fragment="fragment"></props-list>
    </article>

    <p class="fragment-cta">
      <button class="btn" :class="{ 'btn-soft': !savable }" @click="sync">Save</button>
      <button class="btn btn-soft" @click="clear">Clear</button>
    </p>

    <div v-if="loadPlugin(fragment['@type']) && resolved" :is="loadPlugin(fragment['@type'])" :a="resolved" :options="options">test</div>
  </div>
</template>

<script>
import InputClass from './InputClass.vue'
import PropsList from './PropsList.vue'
import TextareaSubtle from './TextareaSubtle.vue'

import PluginSystem from '../mixins/PluginSystem.js'

export default {
  name: 'fragment',
  props: ['fragment'],
  data () {
    return {
      options: {
        resolve: 0
      },
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
      return true
      // return this.$root.syncAgo > 1
    },
    resolved () {
      return this.$root.resolve(this.fragment, this.options.resolve)
    },
    focusProp () {
      // TODO: fill in route as first item in listFocus
      return this.$root.listFocus.length === 1
    },
    focusFrom () {
      return this.$root.listFocus.length > 1
    }
  },
  methods: {
    copy (evt) {
      var uri = this.$root.copyFragment(this.fragment['@id'], evt.target.value)
      if (uri) {
        window.location.href = '#!' + uri
      }
    },
    sync () {
      this.$root.sync(this.fragment)
    },
    clear () {
      delete this.$root.fragments[this.fragment['@id']]
    }
  },
  watch: {
    '$root.route.uri' (val) {
      this.$root.listFocus = [val]
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

<style>
.fragment {
  margin: -2rem;
  padding: 2rem;
}
</style>
