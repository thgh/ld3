<template>
  <span class="inp-subtle"><span class="inp-subtle-span" v-text="value||placeholder"></span> <input class="inp-big-focus" type="text" v-model="value" :placeholder="placeholder"></span> 
</template>

<script>
export default {
  name: 'input-subtle',
  props: ['model', 'prop', 'placeholder'],
  computed: {
  	value () {
  		return this.model && this.model[this.prop]
  	}
  }
}
</script>
