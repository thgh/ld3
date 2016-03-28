<template>
  <textarea v-model="fragment[prop]" placeholder="{placeholder}"></textarea>
</template>

<script>
export default {
  name: 'value-text',
  props: ['fragment', 'prop'],
  attached () {
    var textarea = this.$el
    textarea.oninput = function () {
      textarea.style.height = ''
      textarea.style.height = 1 + Math.min(textarea.scrollHeight, 500) + 'px'
    }
  }
}
</script>
