<template>
	<div>{{value['@id']}} <span class="ld-propclass" v-text="atType"></span></div>
</template>

<script>
export default {
  props: ['fragment', 'prop', 'index'],
  data () {
    return {
      renderType: typeof this.fragment[this.prop]
    }
  },
  computed: {
    value () {
      return typeof this.index === 'number' ? this.fragment[this.prop][this.index] : this.fragment[this.prop]
    },
    atType () {
      return this.value['@type'] || 'Person'
    },
    actualType () {
      return typeof this.fragment[this.prop]
    }
  },
  created () {
    // wut
  },
  ready () {
    // console.log('PE', this.fragment)
    console.log(this)
  }
}
</script>
