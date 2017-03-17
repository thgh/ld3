<template>
  <label class="input input--single" :class="classes">
    <div class="input__help" v-if="help">{{ help }}</div>
    <div class="input__label" v-if="label">{{ label }}</div>
    <span class="input__input inp-subtle">
      <span class="inp-subtle-span" v-text="(model || '') + '.'"></span>
      <textarea
        class="input__input__textarea"
        type="text"
        v-model="model"
        :autofocus="!model"
        :placeholder="placeholder"
        @focus="focus = 1"
        @blur="focus = 0"
      ></textarea>
    </span> 
  </label>
</template>

<script>
export default {
  name: 'input-text',
  props: {
    help: null,
    label: null,
    placeholder: null,
    value: null
  },
  data () {
    return {
      focus: false
    }
  },
  computed: {
    classes () {
      return {
        'input--empty': !this.model,
        'input--focus': this.focus
      }
    },
    model: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>
