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
      // 25px happens to work best
      textarea.style.height = '25px'
      textarea.style.height = 1 + Math.min(textarea.scrollHeight, 500) + 'px'
    }
    textarea.oninput()
  }
}
</script>
