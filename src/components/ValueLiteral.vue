<template>
  <div class="inp-subtle">
    <span class="inp-subtle-span" v-text="placeholder+'.'"></span>
    <input :id="id" v-if="type" :type="type" v-model="fragment['@value']">
    <textarea class="inp-big-focus" :id="id" v-else v-model="fragment['@value']"></textarea>
    <input-type :model.sync="fragment['@type']" placeholder="wut" @blur="blur"></input-type>
  </div> 
</template>

<script>
import InputType from './InputType'

const acceptedTypes = [
  'xsd:boolean',
  'xsd:date',
  'xsd:dateTime',
  'xsd:decimal',
  'xsd:integer',
  'xsd:string'
]

export default {
  props: ['fragment', 'id'],
  computed: {
    placeholder () {
      var alt = ''
      if (this.fragment['@type'] === 'xsd:date') {
        alt = 'ww/ww/wwww'
      }
      return this.fragment['@value'] || alt
    },
    type () {
      if (this.fragment['@type'] && this.fragment['@type'].indexOf(':') === -1) {
        this.fragment['@type'] = 'xsd:' + this.fragment['@type']
      }
      switch (this.fragment['@type']) {
        case 'xsd:boolean': return 'checkbox'
        case 'xsd:date': return 'date'
        case 'xsd:dateTime': return 'text'
        case 'xsd:decimal': return 'number'
        case 'xsd:integer': return 'number'
        case 'xsd:string': return 'text'
      }
    }
  },
  methods: {
    blur () {
      if (acceptedTypes.indexOf(this.fragment['@type']) === -1) {
        console.log('to ValueObject')
        this.$set('fragment[\'@value\']', undefined)
      }
    }
  },
  attached () {
    if (this.fragment['@type'] === '') {
      setTimeout(() => this.$el.querySelector('.inp-type input').focus(), 10)
    }
  },
  components: {
    InputType
  }
}
</script>
