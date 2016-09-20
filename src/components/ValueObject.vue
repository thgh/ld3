<template>
  <div class="value-object" :class="{'focus-object':focus}" @click.prevent.stop="focusObject">
    <a href="#" class="inp-type-icon" v-html="ref||search?'&rarr;':'&bullet;'" @click.prevent="toggleRef"></a>
    <span v-if="focus||search">
      <input-reference v-if="inpref" :model.sync="model" :placeholder="placeholder" @click.prevent.stop></input-reference>
      <input-subtle v-if="!inpref&&value['@value']" :model.sync="value['@value']" placeholder="Just a value"></input-subtle>
      <input-subtle v-if="!inpref&&!value['@value']" :model.sync="fragment['schema:name']" placeholder="Unnamed"></input-subtle>
    </span>
    <span v-else v-text="placeholder"></span>
    <input-class :model.sync="fragment['@type']" placeholder="wut"></input-class>
    <span class="icon-clear" @click="clear">&times;</span>
    <props-list v-if="focus && value" :fragment.sync="value"></props-list>
  </div>
</template>

<script>
import U from '../libs/util'

import InputClass from './InputClass'
import InputReference from './InputReference'
import InputSubtle from './InputSubtle'
import PropsList from './PropsList'

export default {
  name: 'value-object',
  props: ['fragment', 'ref'],
  data () {
    return {
      focus: false,
      search: false
    }
  },
  computed: {
    inpref () {
      return this.ref || this.search
    },
    niceType () {
      var t = this.value['@type']
      return t ? t.slice(t.lastIndexOf(':') + 1) : '?'
    },
    value () {
      return this.fragment || {}
    },
    label () {
      var fragment = this.value
      return !fragment['rdfs:label'] ? false : typeof fragment['rdfs:label'] === 'string' ? fragment['rdfs:label'] : Array.isArray(fragment['rdfs:label']) ? fragment['rdfs:label'][0]['@value'] : fragment['rdfs:label']['@value']
    },
    placeholder () {
      return this.label || this.value['schema:name'] || this.value['@id'] || this.value['@value'] || 'Unnamed'
    },
    name () {
      return this.fragment['dcterms:title'] || this.fragment['schema:name']
    },
    model: {
      get () {
        return this.ref || this.fragment || console.log('falsy value object') || {}
      },
      set (ref) {
        console.log('object => ref', U.inert(ref))
        if (typeof this.ref === 'object') {
          this.ref = ref
        } else {
          this.fragment = ref
        }
      }
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
    toggleRef (evt) {
      if (this.focus) {
        return console.warn('toggle: should not be focused')
      }
      // evt.stopPropagation()
      if (this.ref) {
        let f = U.inert(this.fragment || {})
        console.log('toggle ref=>object', f)
        f['@fromid'] = f['@id']
        delete f['@id']
        this.ref = f
        this.$dispatch('arrayFocused')
      } else if (!this.search) {
        console.log('toggle object=>ref')
        evt.stopPropagation()
        if (this.fragment['@fromid']) {
          this.model = {'@id': this.fragment['@fromid']}
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
      if (typeof this.$parent.renderType === 'object') {
        this.$emit('splice')
      } else if (this.ref) {
        this.ref = this.fragment && (this.fragment['schema:name'] || this.fragment.name) || ' '
      } else {
        this.fragment = this.fragment && (this.fragment['schema:name'] || this.fragment.name) || ' '
      }
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
