<template>
  <div class="value-object" :class="{'focus-object':focus}" @click.prevent.stop="focusObject">
    <span v-if="ref">=></span>
    <span v-if="value['@value']">
      <input-subtle :model.sync="value['@value']" placeholder="Just a value"></input-subtle>
    </span>
    <span v-else>
      <span v-if="label" v-text="label"></span>
      <input-reference :model.sync="value" :placeholder="placeholder" @click.prevent.stop></input-reference>
    </span>
    <span class="ld-propclass" v-if="value['@type']">{{ value['@type'] }}</span> 
    <props-list v-if="focus && value" :fragment.sync="value"></props-list>
  </div>
</template>

<script>
import InputReference from './InputReference'
import InputSubtle from './InputSubtle'
import PropsList from './PropsList'

export default {
  name: 'value-object',
  props: ['fragment', 'prop', 'index', 'ref'],
  data () {
    return {
      focus: false,
      search: ''
    }
  },
  computed: {
    value () {
      return typeof this.prop !== 'string' ? this.fragment : typeof this.index === 'number' ? this.fragment[this.prop][this.index] : this.fragment[this.prop]
    },
    label () {
      var fragment = this.value
      return !fragment['rdfs:label'] ? false : typeof fragment['rdfs:label'] === 'string' ? fragment['rdfs:label'] : Array.isArray(fragment['rdfs:label']) ? fragment['rdfs:label'][0]['@value'] : fragment['rdfs:label']['@value']
    },
    placeholder () {
      return this.label || this.value['schema:name'] || this.value['@id'] || 'Unnamed'
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
    InputReference,
    InputSubtle,
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
