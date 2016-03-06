<template>
  <div>
    <header ng-if="!nestedLevel">
      <h1 class="fragment-h1 ng-binding" ng-click="fragment._showid=!fragment._showid">{{fragment['schema:name']}} <span class="ld-propclass" v-text="fragment['@type']"></span> <small><small><small style="opacity:.5">{{uri}}</small></small></small></h1>
      <div class="fragment-json mdi mdi-12px mdi-code-braces">
        <pre class="fragment-pre">{{fragment|json}}</pre>
      </div>
    </header>

    <article ng-if="(!nestedLevel||fragment._mode>1)&amp;&amp;nestedLevel<4" ng-class="{'ld-nested':nestedLevel}">
      <div v-for="(prop, value) in fragment" v-if="prop[0]!=='@'&&prop[0]!=='_'">
        <prop-editor :fragment="fragment" :prop="prop"></prop-editor>
      </div>
    </article>
  </div>
</template>

<script>
import PropEditor from './PropEditor'

export default {
  props: ['fragments', 'uri'],
  computed: {
    fragment () {
      return this.fragments[this.uri]
    }
  },
  ready () {
    console.log('FE', this.fragment)
  },
  components: {
    PropEditor
  }
}
</script>
