<template>
  <div class="inp-text prop" :class="{'focus-prop':focus&&!focusFrom,'focus-from':focusFrom}" title="{placeholder}" @click.stop>
    <label class="inp-label" :for="_uid">{{prop}}</label>
    <component :is="renderType" :fragment.sync="fragment" :prop="prop" :id="_uid"></component>
  </div>
</template>

<script>
import ValueText from './ValueText'
import ValueString from './ValueString'
import ValueObject from './ValueObject'
import ValueArray from './ValueArray.vue'
import ValueReference from './ValueReference.vue'

export default {
  name: 'prop',
  props: ['fragment', 'prop'],
  data () {
    return {
      focus: false,
      focusFrom: false
    }
  },
  computed: {
    renderType () {
      let o = this.fragment[this.prop]
      return typeof o !== 'object' ? (typeof o === 'boolean' ? 'ValueString' : typeof o === 'number' ? 'ValueString' : o.length > 50 ? 'ValueText' : 'ValueString') : Array.isArray(o) ? 'ValueArray' : o['@id'] && o['@id'].charAt(0) !== '_' ? 'ValueReference' : 'ValueObject'
    }
  },
  events: {
    deactivate () {
      this.focus = false
      return true
    },
    propFocus (val) {
      console.log('pf', val, this._uid)
      this.focus = val
      if (!val) {
        this.focusFrom = val
      }
      this.$dispatch('focusFrom', val, this._uid)
    },
    focusFrom (val, uid) {
      if (this._uid === uid) {
        return true
      }
      this.focusFrom = val
    },
    arrayFocused () {
      // Catch it here, don't want it dispatched further
    }
  },
  components: {
    ValueText,
    ValueString,
    ValueObject,
    ValueArray,
    ValueReference
  }
}
</script>

<style lang="scss">
@import '../scss/variables';

.prop {
  transition: opacity 0.3s;
}
// > normal
.inp-label {
  padding-left: 1rem!important;
}

// .focused > low
.focused .prop {
  opacity: 0.1;
}

.focus-from {
  background: #090909;
}

// .focus-prop > normal
.focus-prop{
  color: white;
  background: black;
}

.focus-prop:hover{
  color: white;
  background: $bg;
}
.focus-from.prop,
.focus-prop.prop {
  opacity: 1;
}

.focus-prop>.value-array>.value-object>.props-list>.prop,
.focus-prop>.value-object>.props-list>.prop {
  opacity: 1;
}

// .focus-prop .focus-object > normal

// .focus-prop.focus-from > low
.focus-from {
  //outline: 1px solid grey;
}

// .focus-prop .focus-object .focus-prop > normal
.focus-prop {
  z-index: 11;
  //outline: 1px solid orange;
}
.props-list {
  flex-basis: 100%;
  flex-shrink: 0;
}
</style>
