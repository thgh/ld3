<template>
  <div class="inp-text prop" :class="propClasses" @click.stop>
    <label class="inp-label" :for="_uid" :title="prop">{{ niceProp }}</label>
    <component
      :is="renderType"
      :id="_uid"
      :focus="hasPropFocus"
      @focus="propFocus"
      :value="fragment[prop]"
      @input="$set(fragment, prop, $event)"
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
    propClasses () {
      const level = this.$parent.level
      const list = this.$root.listFocus
      const isFocused = list[level] === this.prop
      const distance = list.length - level
      return {
        'focus-prop': isFocused && distance === 1,
        'focus-from': isFocused && distance > 1,
        'focus-sibling': !isFocused && distance > 0
      }
    },
    hasPropFocus () {
      return this.propClasses['focus-prop'] || this.propClasses['focus-from']
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

.prop  {
  .inp--label-prop, .prop {
    padding-top: 0;
    padding-bottom: 0;
  }
}

.prop {
  &:hover {
    // z-index: 11;
  }
}
// > normal
.inp-label {
  // padding-left: 1rem!important;
  padding-left: 1rem;
}

// .focused > low

.focus-from {
  transition: opacity .3s, background .3s;
  background: rgba(0, 0, 0, 0);
}

.focus-sibling {
  transition: opacity .3s, background .3s;
  opacity: 0.2;
}
.focus-from > .fragment-cta,
.focus-prop ~ form,
.focus-from ~ form,
.focus-from ~ .focus-sibling {
  opacity: 0;
}

// .focus-prop > normal
.focus-prop {
  z-index: 11;
  background: $bg;
  transition: none;
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
