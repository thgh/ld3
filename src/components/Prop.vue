<template>
  <div class="inp-text prop" :class="{ 'focus-prop': focusProp, 'focus-from': focusFrom }" @click.stop>
    <label class="inp-label" :for="_uid" :title="prop">{{ niceProp }}</label>
    <component
      :is="renderType"
      v-model="fragment[prop]"
      :id="_uid"
      :focus="focusProp || focusFrom"
      @focus="propFocus"
    />
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
  props: ['fragment', 'prop'],
  computed: {
    level () {
      return this.$parent.level
    },
    focusProp () {
      return this.$root.listFocus[this.level] === this.prop
    },
    focusFrom () {
      const index = this.$root.listFocus.indexOf(this.prop)
      console.log('from', index)
      return index > -1 && index < this.level
    },
    renderType () {
      return toType(this.fragment[this.prop])
    },
    niceProp () {
      return typeof this.prop === 'string' && this.prop.substr(this.prop.indexOf(':') + 1)
    }
  },
  methods: {
    propFocus (val) {
      console.debug('propFocus', this.prop, val)
      this.$emit('focus', val)
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
