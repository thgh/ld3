<template>
  <div class="value-object" :class="{ 'focus-object': focus }" @click.prevent.stop="objectFocus">
    <a href="#" class="inp-type-icon" v-html="reference || search ? '&rarr;' : '&bullet;'" @click.prevent="toggleRef"></a>
    <span v-if="focus || search">
      <input-reference v-if="inpref" v-model="model" :placeholder="placeholder" @click.prevent.stop />
      <input-subtle v-if="!inpref && value['@value']" v-model="model['@value']" placeholder="Just a value" />
      <input-subtle v-if="!inpref && !value['@value']" v-model="model['schema:name']" placeholder="Unnamed" />
    </span>
    <span v-else v-text="placeholder"></span>
    <input-class v-model="model['@type']" placeholder="wut"></input-class>
    <span class="icon-clear" @click="clear">&times;</span>
    <props-list v-if="focus" :fragment="value"></props-list>
  </div>
</template>

<script>
import { inert } from '../libs/util.js'

import InputClass from './InputClass.vue'
import InputReference from './InputReference.vue'
import InputSubtle from './InputSubtle.vue'
import PropsList from './PropsList.vue'

export default {
  name: 'value-object',
  props: ['value', 'id', 'reference', 'focus'],
  data () {
    return {
      search: false
    }
  },
  computed: {
    model: {
      get () {
        return this.value || console.debug('falsy value object') || {}
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    inpref () {
      return this.model['@id'] || this.search
    },
    niceType () {
      var t = this.model['@type']
      return t ? t.slice(t.lastIndexOf(':') + 1) : '?'
    },
    label () {
      var model = this.model
      return !model['rdfs:label'] ? false : typeof model['rdfs:label'] === 'string' ? model['rdfs:label'] : Array.isArray(model['rdfs:label']) ? model['rdfs:label'][0]['@value'] : model['rdfs:label']['@value']
    },
    placeholder () {
      return this.label || this.model['schema:name'] || this.model['@id'] || this.model['@value'] || 'Unnamed'
    },
    name () {
      return this.model['dcterms:title'] || this.model['schema:name']
    }
  },
  methods: {
    objectFocus () {
      console.debug('objectFocus')
      this.$emit('focus')
    },
    toggleRef (evt) {
      if (this.focus) {
        return console.warn('toggle: should not be focused')
      }
      // evt.stopPropagation()
      if (this.reference) {
        console.debug('toggle ref=>object')
        this.model = Object.assign({}, this.model, {
          '@id': null,
          '@fromid': this.model['@id']
        })
        window.hub.$emit('arrayFocused')
      } else if (!this.search) {
        console.debug('toggle object=>ref')
        evt.stopPropagation()
        if (this.model['@fromid']) {
          this.model = {'@id': this.model['@fromid']}
        } else {
          this.search = true
          this.$nextTick(function () {
            this.$el.querySelector('input').focus()
          })
        }
      } else {
        this.search = false
      }
    },
    clear () {
      this.$emit('remove')
      if (!Array.isArray(this.$parent.renderType)) {
        this.model = this.model['schema:name'] || this.model.name || ' '
      }
    }
  },
  components: {
    InputClass,
    InputReference,
    InputSubtle,
    PropsList
  }
}
</script>

<style lang="scss">
@import '../scss/variables';

.value-object {
  flex-grow: 1;
  cursor: pointer;
  >.icon-clear {
    visibility: hidden;
    padding: 4px 8px;
  }
  &:hover>.icon-clear {
    visibility: visible;
  }
}

// > normal


.focus-object {
  // outline: 1px solid green;
}
 
// .focus-prop (unfocused) > low
.focus-prop>.value-array>.value-object {
  // opacity: 0.1
  >.inp-type-icon {
    opacity: 0.2;
  }
  &.focus-object>.inp-type-icon {
    opacity: 0.5;
  }
}
// .focus-prop .focus-object .focus-prop > normal
// .focus-prop .focus-object > normal
.value-object:hover,
.focus-object {
  opacity: 1!important;
  >.inp-type-icon {
    color: $focus!important;
    opacity: 1!important;
  }
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
