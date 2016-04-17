<template>
  <span class="inp-subtle">{{model||placeholder}} <input type="text" v-model="model" :placeholder="placeholder"></span> 
</template>

<script>
export default {
  props: {
    model: {
      twoWay: true
    },
    placeholder: null
  }
}
</script>
