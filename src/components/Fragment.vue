<template>
  <div class="fragment">
    <header>
      <h1 class="fragment-h1">
        <subtle-input :model.sync="fragment['schema:name']" :placeholder="fragment['@id']||'Fatal error'"></subtle-input>
        <span class="ld-propclass" v-if="fragment['@type']" v-text="fragment['@type']"></span> <small><small><small style="opacity:.5">{{fragment['@id']}}</small></small></small>
      </h1>
      <div class="fragment-json mdi mdi-12px mdi-code-braces">
        <pre class="fragment-pre">{{fragment|json}}</pre>
      </div>
    </header>

    <article>
      <props-list :fragment.sync="fragment"></props-list>
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
    var vm = this
    setTimeout(function (argument) {
      var script = document.createElement('script')
      script.onload = function (argument) {
        console.log('check invoice', window.Invoice.prototype)
        vm.$options.components['invoice'] = vm.$root.extend(window.Invoice)
      }
      script.src = '/static/invoice.js'
      document.head.appendChild(script)
    }, 1000)
    // console.log('FE', this.fragment['schema:name'], this.fragment)
    // window.fetch().then(function (argument) {
    //   console.log('check invoice')
    // })
  },
  components: {
    SubtleInput,
    PropsList
  }
}
</script>
