<template>
  <div class="inp-subtle">
    <span class="inp-subtle-span" v-text="(value || '') + '.'"></span>
    <textarea
      class="inp-big-focus"
      v-model="model"
      @focus="show = 1"
      @blur="show = 0"
      :id="id"
    ></textarea>
    <transition name="opacity">
      <span class="inp-actions" v-if="show">
        <button type="button" class="btn-reset fragment-type" @click="convertToLiteral">+</button>
      </span>
    </transition>
  </div> 
</template>

<script>
export default {
  name: 'value-text',
  props: ['value', 'id'],
  data () {
    return {
      show: false
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    convertToLiteral () {
      this.$emit('input', {
        '@type': '',
        '@value': this.value || ''
      })
    }
  }
}
</script>
