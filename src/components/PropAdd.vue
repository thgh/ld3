<template>
  <form @submit.prevent="submit">
    <label class="inp-text label-prop" :class="special" v-if="show.prop">
      <input-subtle :model.sync="prop" placeholder="property..." @blur="submit" @keydown.enter="submit" style="opacity:.7"></input-subtle>
      <input v-model="value" placeholder="value..." @blur="submit" @keyup.enter="submit">
    </label>
    <label class="inp-text label-prop" v-if="prop||!show.prop">
      <button class="btn-add" @click="start">Add</button>
    </label>
  </form>
</template>

<script>
import InputSubtle from './InputSubtle'

export default {
  props: ['fragment'],
  data () {
    return {
      prop: '',
      value: '',
      show: {
        prop: false
      }
    }
  },
  computed: {
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
      this.show.prop = true
      this.$nextTick(function () {
        this.$el.querySelector('input').focus()
      })
    },
    submit () {
      if (!this.prop.length) {
        return
      }
      if (!this.value.length) {
        if (this.$el.querySelector('input') === document.activeElement) {
          this.$el.querySelector('.label-prop>input').focus()
        }
        return
      }
      this.$set('fragment[\'' + this.prop + '\']', this.value)
      this.prop = ''
      this.value = ''
      this.$el.querySelector('input').focus()
      // Lookup
    },
    loadProps () {
      this.addPropShow = true
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