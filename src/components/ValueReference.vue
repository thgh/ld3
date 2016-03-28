<template>
	<div>=> {{value['@id']}} <span class="ld-propclass" v-text="atType"></span></div>
</template>

<script>
export default {
  name: 'value-reference',
  props: ['fragment', 'prop', 'index'],
  computed: {
    value () {
      return typeof this.index === 'number' ? this.fragment[this.prop][this.index] : this.fragment[this.prop]
    }
  },
  ready () {
    // console.log('PE', this.fragment)
    console.log(this)
  }
}
</script>
