<template>
  <div class="value-object" :class="{'focus-object':focus}" @click.prevent.stop="focusObject">
    <span v-if="ref">=></span>
    <subtle-input v-if="value['@value']" :model.sync="value['@value']"></subtle-input>
    <span v-if="!value['@value']&&label" v-text="label || 'Woops, no label after all'"></span>
    <subtle-input v-if="!value['@value']&&!label" :model.sync="value['schema:name']" :placeholder="value['@id'] || 'Unnamed'"></subtle-input>
    <span class="ld-propclass" v-if="value['@type']">{{ value['@type'] }}</span> 
    <props-list v-if="focus && value" :fragmentprops.sync="value"></props-list>
  </div>
</template>

<script>
import SubtleInput from './SubtleInput'
import PropsList from './PropsList'

export default {
  name: 'value-object',
  props: ['fragment', 'prop', 'index', 'ref'],
  data () {
    return {
      focus: false
    }
  },
  computed: {
    value () {
      return typeof this.prop !== 'string' ? this.fragment : typeof this.index === 'number' ? this.fragment[this.prop][this.index] : this.fragment[this.prop]
    },
    label () {
      return Array.isArray(this.value['rdfs:label']) ? this.value['rdfs:label'][2]['@value'] : this.value['rdfs:label']['@value']
    },
    list () {
      console.log('list', this.value)
      return this.focus ? 'propsList' : ''
    }
  },
  methods: {
    focusObject () {
      if (this.focus) {
        return
      }
      // Unfocus siblings
      this.$dispatch('arrayFocused')
      // Focus parent
      this.$dispatch('propFocus', true)
      // Focus this
      this.focus = true
      this.activeLock = true
      this.$dispatch('objectFocused', this._uid)
      this.activeLock = false
    },
    renderType (o) {
      return typeof o !== 'object' ? (o.length < 50 ? 'ValueString' : 'ValueText') : Array.isArray(o) ? 'ValueArray' : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference' : 'ValueObject'
    }
  },
  events: {
    unfocus (uid) {
      if (this._uid === uid) {
        this.focus = false
        this.$dispatch('propFocus', false)
      }
      return true
    },
    siblingObjectActivated () {
      if (!this.activeLock && this.focus) {
        this.focus = false
        this.$dispatch('siblingUnfocused', this._uid)
      }
    }
  },
  components: {
    SubtleInput,
    PropsList
  }
}
</script>

<style lang="scss">
@import '../scss/variables';
.value-object {
  cursor: pointer;
}

// > normal


.focus-object {
  // outline: 1px solid green;
}
// .focus-prop (unfocused) > low
.focus-from .value-object,
.focus-prop .value-object {
  opacity: 0.1
}
// .focus-prop .focus-object .focus-prop > normal
.prop .props-list .value-object,
// .focus-prop .focus-object > normal
.prop .focus-object {
  opacity: 1
}

// .focus-prop.focus-from (unfocused) > low
// .focus-prop.focus-from .focus-object > low
.focus-from .focus-object {
  // outline: 1px solid red;
}
.focus-from .focus-prop .focus-object {
  //outline: 1px solid green;
}

</style>
