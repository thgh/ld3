<template>
  <div class="inp-text prop" :class="{'focus-prop':focus&&!focusFrom,'focus-from':focusFrom}" @click.stop>
    <label class="inp-label" :for="_uid" :title="prop">{{niceProp}}</label>
    <component :is="renderType" v-model="parent[prop]" :parent="parent" :prop="prop" :id="_uid"></component>
  </div>
</template>

<script>
import ValueArray from './ValueArray.vue'
import ValueLiteral from './ValueLiteral.vue'
import ValueObject from './ValueObject.vue'
import ValueReference from './ValueReference.vue'
import ValueString from './ValueString.vue'
import ValueText from './ValueText.vue'

import { toType } from '../libs/util.js'

export default {
  name: 'prop',
  props: ['parent', 'prop'],
  data () {
    return {
      focus: false,
      focusFrom: false
    }
  },
  computed: {
    renderType () {
      return toType(this.parent[this.prop])
    },
    niceProp () {
      return typeof this.prop === 'string' && this.prop.substr(this.prop.indexOf(':') + 1)
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
      window.hub.$emit('focusFrom', val, this._uid)
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
    ValueArray,
    ValueLiteral,
    ValueObject,
    ValueReference,
    ValueString,
    ValueText
  }
}
</script>

<style lang="scss">
@import '../scss/variables';

.prop {
  transition: opacity 0.3s;
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
