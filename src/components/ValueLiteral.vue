<template>
  <div class="inp-subtle">
    <span class="inp-subtle-span" v-text="placeholder + '.'"></span>
    <input v-model="model" :id="id" v-if="inputType == 'text'" type="text">
    <input v-model="model" :id="id" v-else-if="inputType == 'date'" type="date">
    <input v-model="model" :id="id" v-else-if="inputType == 'number'" type="number">
    <input v-model="model" :id="id" v-else-if="inputType == 'checkbox'" type="checkbox">
    <textarea class="inp-big-focus" :id="id" v-else v-model="model"></textarea>
    <input-type :model="value" prop="@type" placeholder="wut" @blur="blur"></input-type>
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
    model: {
      get () {
        return this.value || {
          '@type': '',
          '@value': ''
        }
      },
      set (val) {
        this.$emit('input', val)
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
      if (this.value['@type'] && !this.value['@type'].includes(':')) {
        this.value['@type'] = 'xsd:' + this.value['@type']
      }
      switch (this.value['@type']) {
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
      if (!acceptedTypes.includes(this.value['@type'])) {
        console.log('to ValueObject')
        this.$set(this.value, 'schema:name', this.model)
        this.$delete(this.value, '@value')
      }
    }
  },
  mounted () {
    if (this.value['@type'] === '') {
      this.$nextTick(() => this.$el.querySelector('.inp-type input').focus())
    }
  },
  components: {
    InputType
  }
}
</script>
