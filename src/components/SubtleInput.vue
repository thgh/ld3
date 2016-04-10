<template>
  <span class="inp-subtle">{{model[prop]||placeholder}} <input type="text" v-model="model[prop]" :placeholder="placeholder"></span> 
</template>

<script>
// Must get 'prop' because model would be a string and we need a reference
export default {
  props: {
    model: {
      twoWay: true
    },
    prop: {
      default: 'schema:name'
    },
    placeholder: null
  }
}
</script>
