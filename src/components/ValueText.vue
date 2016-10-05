<template>
  <div class="inp-subtle">
    <span class="inp-subtle-span" v-text="(fragment||'')+'.'"></span>
    <textarea class="inp-big-focus" :id="id" type="text" v-model="fragment" @focus="show=1" @blur="show=0"></textarea>
    <span class="inp-actions" v-if="show">
      <button type="button" class="btn-reset fragment-type" @click="literal">+</button>
    </span>
  </div> 
</template>

<script>
// inp-subtle>inp-actions: transition=opacity
export default {
  name: 'value-text',
  props: ['parent', 'prop', 'id'],
  data () {
    return {
      show: false
    }
  },
  computed: {
    fragment () {
      return this.parent[this.prop]
    }
  },
  methods: {
    literal () {
      this.$set(this.parent, this.prop, {
        '@type': '',
        '@value': this.fragment || ''
      })
    }
  }
}
</script>
