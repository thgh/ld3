<template>
  <span class="inp-subtle"><span class="inp-subtle-span" v-text="model||placeholder"></span> <input class="inp-big-focus" type="text" v-model="model" :placeholder="placeholder"></span> 
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
