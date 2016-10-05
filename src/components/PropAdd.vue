<template>
  <form @submit.prevent="submit">
    <label class="inp-text label-prop" :class="special">
      <input-subtle :model="tuple" prop="prop" placeholder="property..." @blur="submit" @keydown.enter="submit" style="opacity:.7"></input-subtle>
      <input class="inp-big-focus" v-model="value" :placeholder="prop&&'value...'" @blur="submit" @keyup.enter="submit">
    </label>
  </form>
</template>

<script>
import InputSubtle from './InputSubtle.vue'

const DEFAULT_NAMESPACE = 'schema:'

export default {
  name: 'prop-add',
  props: ['fragment'],
  data () {
    return {
      tuple: {
        prop: ''
      },
      value: ''
    }
  },
  computed: {
    prop () {
      return this.tuple.prop
    },
    props () {
      return this.fragment
    },
    special () {
      if (!this.prop) {
        return
      }
      if (this.prop[0] === '@') {
        return {'inp-alert': true}
      }
      if (this.prop.indexOf(':') === -1) {
        return {'inp-urify': true}
      }
      return this.fragment
    }
  },
  methods: {
    start () {
      this.$nextTick(function () {
        this.$el.querySelector('input').focus()
      })
    },
    submit () {
      if (!this.prop.length) {
        if (this.$el.querySelector('.label-prop>input') === document.activeElement) {
          this.$el.querySelector('input').focus()
        }
        return
      }
      if (this.prop.indexOf(':') === -1 && this.prop[0] !== '@') {
        this.prop = DEFAULT_NAMESPACE + this.prop
      }
      if (!this.value.length) {
        if (this.$el.querySelector('input') === document.activeElement) {
          this.$el.querySelector('.label-prop>input').focus()
        }
        return
      }
      this.$set(this.fragment, this.prop, this.value)
      this.prop = ''
      this.value = ''
      this.$el.querySelector('input').focus()
      // Lookup
    }
  },
  components: {
    InputSubtle
  }
}
</script>

<style>
.label-prop {
  padding-left: 1em;
}
.label-prop>.inp-subtle {
  margin-right: .75em;
}
.label-prop>.btn-add {
  margin-bottom: 10px;
}
</style>