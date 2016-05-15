<template>
  <div class="inp-text prop" :class="{'focus-prop':focus&&!focusFrom,'focus-from':focusFrom}" @click.stop>
    <label class="inp-label" :for="_uid" :title="prop">{{niceProp}}</label>
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
    },
    niceProp () {
      return this.prop.substr(this.prop.indexOf(':') + 1)
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
  &:hover {
    z-index: 11;
  }
}
// > normal
.inp-label {
  // padding-left: 1rem!important;
  padding-left: 1rem;
}

// .focused > low
.focused .prop {
  opacity: 0.1;
}

.focus-from {
  background: $bgNav;
}

// .focus-prop > normal
.focus-prop{
  z-index: 11;
  color: $fg;
  background: $bg;
}

.focus-prop:hover{
  color: $fg;
  background: $bg;
  //transition: opacity 0.3s, background 0.2s;
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
  //outline: 1px solid orange;
}
</style>
