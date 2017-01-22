<template>
  <div class="props-list">
    <prop
      v-for="(value, prop) in fragment" 
      v-if="prop[0] !== '@'"
      :fragment="fragment"
      :prop="prop"
      @focus="childFocused = 1"
    />
    <prop
      v-for="prop in stub"
      :fragment="fragment"
      :prop="prop"
    />
    <prop-add :fragment="fragment"></prop-add>
    <div class="backdrop" :class="{ active: childFocused }" @click.prevent.stop="unfocus"></div>
  </div>
</template>

<script>
import PropAdd from './PropAdd.vue'
import { toStub } from '../libs/stub.js'

export default {
  name: 'props-list',
  props: {
    fragment: {
      default: {
        'schema:name': 'fuckthis'
      }
    }
  },
  data () {
    return {
      childFocused: false,
      suggest: null
    }
  },
  computed: {
    stub () {
      return toStub(this.fragment)
    }
  },
  methods: {
    cancel () {
      // this.blurry = false
    },
    unfocus () {
      console.debug('unfocus')
    }
  },
  components: {
    PropAdd
  }
}
</script>

<style lang="scss">
@import '../scss/variables';

.props-list {
  position: relative;
  margin-left: -1rem;
  margin-right: -1rem;
  flex-basis: 100%;
  flex-shrink: 0;
}
.prop .props-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-left: 0;
  margin-right: 0;
  padding: 0 0 .5rem;
  background-color: $bg;
  // outline: 1px solid purple;
  transition: background 0.3s;
}
.focus-prop:hover .props-list {
  background-color: $bg;
  transition: background 0.2s;
}
.focus-from .props-list {
  background: $bgNav;
  z-index: 12;
}
.focus-from .focus-prop .props-list {
  background-color: $bg;
}
.focus-from .focus-prop:hover .props-list {
  background-color: $bg;
}
.value-array>.value-object>.props-list {
  margin-top: -1.6rem;
}
/*.blurry {
  position: absolute;
  top: 0;
  right: 0;
  left:0;
  bottom:0 ;
  background-color: $bg;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events:none;
}
.props-list.active>.blurry {
  opacity: .9;
  pointer-events:all;
}*/
</style>
