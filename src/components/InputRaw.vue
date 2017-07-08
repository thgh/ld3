<template>
  <span class="inp-subtle" style="white-space: pre-wrap;font-family: consolas, monospace;">
    <span class="inp-subtle-span" :class="{ 'input-raw--invalid': invalid }" v-text="(invalid || model || placeholder) + '.'"></span>
    <textarea
      ref="ta"
      class="input"
      @input="input"
      @change="change"
      :placeholder="placeholder"
    />
  </span> 
</template>

<script>
export default {
  name: 'input-json',
  props: ['value', 'placeholder'],
  data () {
    return {
      invalid: false
    }
  },
  computed: {
    model () {
      return JSON.stringify(this.value, null, 2)
    }
  },
  methods: {
    input (evt, change) {
      const str = evt.target.value
      try {
        const val = JSON.parse(str)
        if (val && val['@id'] && val['@type']) {
          this.invalid = false
          this.freeze = true
          if (change || (val['@id'] === this.value['@id'])) {
            this.$root.setFragment(val)
          }
        } else {
          this.invalid = str
        }
      } catch (e) {
        this.invalid = str
      }
    },
    change (evt) {
      this.input(evt, true)
    }
  },
  mounted () {
    this.$refs.ta.value = this.model
  },
  watch: {
    value () {
      if (this.freeze) {
        this.freeze = false
      } else {
        this.$refs.ta.value = this.model
      }
    }
  }
}
</script>

<style>
.input-raw--invalid {
  background-color: red;
  color: white;
}
</style>