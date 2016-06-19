<template>
  <span class="inp-subtle">
    <span class="inp-subtle-span" v-text="(model||placeholder)+'.'"></span>
    <textarea type="text" v-model="model" :placeholder="placeholder"></textarea>
  </span> 
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
