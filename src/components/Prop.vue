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

import Value from '../libs/Value.js'

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
      return Value.getType(this.fragment[this.prop])
    }
  },
  events: {
    deactivate () {
      this.focus = false
      return true
    },
    propFocus (val) {
      // console.log('pf', val, this._uid)
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
  transition: opacity 0.3s, background 0.3s;
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
  background: $bg;
}

.focus-prop:hover{
  color: white;
  background: $bg;
  transition: opacity 0.3s, background 0.2s;
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
.focus-prop .focus-object>.props-list>.prop {
  opacity: 1;
}

// .focus-prop.focus-from > low
.focus-from {
  //outline: 1px solid grey;
}

// .focus-prop .focus-object .focus-prop > normal
.focus-prop {
  z-index: 11;
  //outline: 1px solid orange;
}
</style>
