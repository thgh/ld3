<template>
  <div class="fragment">
    <header>
      <h1 class="fragment-h1">{{fragment['schema:name']}} <span class="ld-propclass" v-text="fragment['@type']"></span> <small><small><small style="opacity:.5">{{uri}}</small></small></small></h1>
      <div class="fragment-json mdi mdi-12px mdi-code-braces">
        <pre class="fragment-pre">{{fragment|json}}</pre>
      </div>
    </header>

    <article>
      <!-- TODO: change order of props -->
      <div v-for="(prop, value) in fragment" v-if="prop[0]!=='@'">
        <prop :fragment="fragment" :prop="prop"></prop>
      </div>
    </article>
  </div>
</template>

<script>
import Prop from './Prop'

export default {
  props: ['fragments', 'uri'],
  computed: {
    fragment () {
      return this.fragments[this.uri]
    }
  },
  ready () {
    console.log('FE', this.fragment['schema:name'], this.fragment)
  },
  components: {
    Prop
  }
}
</script>
