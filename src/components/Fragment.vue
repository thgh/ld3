<template>
  <div class="fragment" :class="{ 'focus-prop': focusProp, 'focus-from': focusFrom, 'fragment--advanced': advanced }">
    <header>
      <h1 class="fragment-h1">
        <textarea-subtle v-model="fragment['schema:name']" :placeholder="fragment['@id'] || 'Fatal error'" />
        <input-class v-model="fragment['@type']" placeholder="wut" />
      </h1>

      <div class="fragment-json mdi mdi-12px mdi-code-braces" @mouseenter="advanced = 1" @mouseleave="advanced = 0">
        <transition name="opacity">
          <div v-if="advanced">
            <form @submit="copy">
              Copy fragment to:
              <input type="text" v-model="copyURI" style="width:100%">
              <button type="submit">Copy</button>
            </form>
            <form @click="$root.fetch(fragment['@id'], true)">
              <button type="submit">refetch {{ fragment['@id'] }}</button>
            </form>
            <pre class="fragment-pre">{{ fragment }}</pre>
            <input-raw v-model="fragment" />
          </div>
          </transition>
      </div>
    </header>

    <article>
      <input-raw v-model="fragment" v-if="$root.show.json" />
      <props-list :fragment="fragment"></props-list>
    </article>

    <nav class="fragment__nav">
      <div class="nav-right">
        <button class="btn btn-soft app-nav__uri" type="button" @click="$root.showURI = !$root.showURI">URI</button>
        <button class="btn btn-soft app-nav__uri" type="button" @click="$root.copyFragment(fragment['@id'])">Duplicate</button>
        <button class="btn btn-soft app-nav__uri" type="button" @click="$root.show.json = !$root.show.json">JSON</button>
        <button class="btn btn-soft app-nav__uri" type="button" @click="$root.sync(fragment['@id'])">Save</button>
        <button class="btn btn-soft app-nav__uri" type="button" @click="$root.discard(fragment['@id'])">Discard</button>
        <button class="btn btn-soft app-nav__uri" type="button" v-for="c in capabilities" @click="c.click">{{ c.label || c.type || '*' }}</button>
      </div>
    </nav>

    <div v-if="loadPlugin(fragment) && resolved" :is="loadPlugin(fragment)" :a="resolved" :options="options">test</div>
  </div>
</template>

<script>
import InputClass from './InputClass.vue'
import InputRaw from './InputRaw.vue'
import InputSubtle from './InputSubtle.vue'
import Prop from './Prop.vue'
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
      copyURI: '',
      advanced: 0,
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
      if (!this.copyURI) {
        return console.warn('Fragment: copyURI is empty')
      }
      this.$root.copyFragment(this.fragment['@id'], this.copyURI)
    }
  },
  watch: {
    advanced () {
      this.copyURI = this.fragment['@id']
    },
    '$root.route.uri' (val) {
      this.$root.listFocus = [val]
    }
  },
  mixins: [PluginSystem],
  components: {
    InputClass,
    InputRaw,
    InputSubtle,
    Prop,
    PropsList,
    TextareaSubtle
  }
}
</script>

<style lang="scss">
.fragment {
  margin: -2rem -1rem;
  padding: 2rem 1rem;
}
.nav-right {
  position: sticky;
  top: 0;
  right: 0;
}

@media (min-width: 940px) {
  .fragment__nav {
    position: absolute;
    top: 0;
    height: 100%;
    left: calc(800px);
    padding: .5rem 0;
    width: calc(50vw - 405px);
    .btn {
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      padding: .5rem 0 .5rem .5rem;
      text-align: left;
    }
  }
}

.plugin--overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 0 3rem;
  overflow: auto;
  background-color: #1b1f32;
  z-index: 60;
}
</style>
