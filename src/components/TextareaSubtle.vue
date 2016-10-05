<template>
  <span class="inp-subtle">
    <span class="inp-subtle-span" v-text="(model[prop]||placeholder)+'.'"></span>
    <textarea type="text" v-model="model[prop]" :placeholder="placeholder"></textarea>
  </span> 
</template>

<script>
export default {
  name: 'textarea-subtle',
  props: ['model', 'prop', 'placeholder']
}
</script>
