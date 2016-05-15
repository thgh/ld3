<template>
  <div class="value-array">
    <component v-for="_nope in fragment[prop]" :is="renderType[$index]" :fragment.sync="fragment" :prop="prop" :index="$index"></component>
    <button class="btn-add" @click="push">Add</button>
  </div>
</template>

<script>
import ValueObject from './ValueObject'
import ValueReference from './ValueReference'

export default {
  props: ['fragment', 'prop'],
  computed: {
    renderType () {
      return this.fragment[this.prop].map(function (o) {
        return typeof o !== 'object' ? console.log('ErrorType') : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference' : 'ValueObject'
      })
    }
  },
  methods: {
    push () {
      var a = this.fragment[this.prop]
      if (!a || !a[a.length - 1]) {
        this.fragment[this.prop].push({
          '@type': 'schema:Thing',
          '@id': '_:' + Date.now() % 1000000
        })
      }
      var b = JSON.parse(JSON.stringify(a[a.length - 1]))
      b['@id'] = '_:' + Date.now() % 1000000
      b['@type'] = b['@type'] || 'schema:Thing'
      this.fragment[this.prop].push(b)
    }
  },
  events: {
    arrayFocused () {
      this.$broadcast('siblingObjectActivated')
    }
  },
  components: {
    ValueObject,
    ValueReference
  }
}
</script>
