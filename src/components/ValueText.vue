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
      var scroll = textarea.scrollHeight
      if (textarea.parentNode.classList.contains('inp-block')) {
        if (scroll < 30) {
          textarea.parentNode.classList.remove('inp-block')
          scroll = textarea.scrollHeight
        }
      } else if (scroll > 50) {
        textarea.parentNode.classList.add('inp-block')
        scroll = textarea.scrollHeight
      }
      textarea.style.height = 1 + Math.min(scroll, 500) + 'px'
    }
    textarea.oninput()
  }
}
</script>

<style>
.inp-block {
  display: block;
}
.inp-block>.inp-label {
  float: none;
}
.inp-block>textarea {
  margin-top: 8px;
  margin-left: 12px;
  width: calc(100% - 12px);
}
</style>