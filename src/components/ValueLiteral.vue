<template>
  <div class="inp-subtle">
    <span class="inp-subtle-span" v-text="placeholder + '.'"></span>
    <input v-model="atValue" :id="id" v-if="inputType == 'text'" type="text">
    <input v-model="atValue" :id="id" v-else-if="inputType == 'date'" type="date">
    <input v-model="atValue" :id="id" v-else-if="inputType == 'number'" type="number">
    <input v-model="atValue" :id="id" v-else-if="inputType == 'checkbox'" type="checkbox">
    <textarea class="inp-big-focus" :id="id" v-else v-model="atValue"></textarea>
    <input-type v-model="atType" placeholder="wut" @blur="blur"></input-type>
  </div> 
</template>

<script>
import InputType from './InputType.vue'

const acceptedTypes = [
  'xsd:boolean',
  'xsd:date',
  'xsd:dateTime',
  'xsd:decimal',
  'xsd:integer',
  'xsd:string'
]

export default {
  name: 'value-literal',
  props: ['value', 'id'],
  computed: {
    atValue: {
      get () {
        return this.value['@value'] || ''
      },
      set (val) {
        this.$set(this.value, '@value', val)
      }
    },
    atType: {
      get () {
        return this.value['@type'] || ''
      },
      set (val) {
        this.$set(this.value, '@type', val)
      }
    },
    placeholder () {
      var alt = ''
      if (this.value['@type'] === 'xsd:date') {
        alt = 'ww/ww/wwww'
      }
      return this.model || alt
    },
    inputType () {
      if (this.atType && !this.atType.includes(':')) {
        this.atType = 'xsd:' + this.atType
      }
      switch (this.atType) {
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
      console.debug('value-literal blur')
      if (!acceptedTypes.includes(this.atType)) {
        console.log('to ValueObject')
        this.$set(this.value, 'schema:name', this.model)
        this.$delete(this.value, '@value')
      }
    }
  },
  mounted () {
    if (this.atType === '') {
      this.$nextTick(() => this.$el.querySelector('.inp-type input').focus())
    }
  },
  components: {
    InputType
  }
}
</script>
