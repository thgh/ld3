<template>
  <div class="inp-subtle">
    <span class="inp-subtle-span" v-text="(fragment||'')+'.'"></span>
    <textarea class="inp-big-focus" :id="id" type="text" v-model="fragment" @focus="show=1" @blur="show=0"></textarea>
    <span class="inp-actions" v-if="show" transition="opacity">
      <button type="button" class="btn-reset fragment-type" @click="literal">+</button>
    </span>
  </div> 
</template>

<script>
export default {
  name: 'value-text',
  props: ['fragment', 'id'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    literal () {
      this.$set('fragment', {
        '@type': '',
        '@value': this.fragment || ''
      })
    }
  }
}
</script>
