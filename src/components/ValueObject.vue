<template>
  <div class="value-object" :class="{active:active}" @click.prevent.stop="activate">
    <span>{{ value.name || value['@id'] || 'Unnamed' }}</span>
    <span class="ld-propclass">{{ value['@type'] }}</span> 
    <div class="props-list" v-if="active && value">
      <div is="props-list" :fragmentprops.sync="value"></div>
    </div>
  </div>
</template>

<script>
import PropsList from './PropsList'

export default {
  name: 'value-object',
  props: ['fragment', 'prop', 'index'],
  data () {
    return {
      active: false
    }
  },
  computed: {
    value () {
      return typeof this.index === 'number' ? this.fragment[this.prop][this.index] : this.fragment[this.prop]
    },
    list () {
      console.log('list', this.value)
      return this.active ? 'propsList' : ''
    }
  },
  methods: {
    activate () {
      this.active = true
      this.activeLock = true
      this.$dispatch('objectActivated')
      this.activeLock = false
    },
    renderType (o) {
      return typeof o !== 'object' ? (o.length < 50 ? 'ValueString' : 'ValueText') : Array.isArray(o) ? 'ValueArray' : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference' : 'ValueObject'
    }
  },
  events: {
    deactivate () {
      if (!this.activeLock) {
        this.active = false
      }
    }
  },
  components: {
    PropsList
  }
}
</script>

<style lang="scss">
@import '../scss/variables';
.value-object.active {
  outline: 1px solid green;
}
.prop.active .value-object {
  opacity: .2
}
.prop.active .value-object.active {
  opacity: 1
}
</style>
