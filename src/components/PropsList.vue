<template>
  <div class="props-list">
    <prop
      v-for="(value, prop) in fragment" 
      v-if="prop[0] !== '@'"
      :fragment="fragment"
      :prop="prop"
      @focus="listFocus(prop)"
    />
    <prop
      v-for="prop in stub"
      :fragment="fragment"
      :prop="prop"
    />
    <prop-add :fragment="fragment"></prop-add>
    <div class="backdrop" :class="backdropClasses" @click.prevent.stop="listBlur"></div>
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
    },
    backdropClasses () {
      return {
        'backdrop--active': this.$root.listFocus.length > this.level,
        'backdrop--fixed': this.level === 1
      }
    },
    level () {
      let vm = this.$parent
      while (vm && typeof vm.level !== 'number') {
        vm = vm.$parent
      }
      return vm.level + 1
    }
  },
  methods: {
    listFocus (prop) {
      console.debug('listFocus', this.level, this.$root.listFocus)
      const listFocus = this.$root.listFocus
      if (listFocus[this.level]) {
        this.$set(listFocus, this.level, prop)
      } else if (listFocus.length === this.level) {
        listFocus.push(prop)
      }
      this.$root.listFocus[this.level] = prop
    },
    listBlur () {
      console.debug('listBlur', this.level)
      this.$root.listFocus =this.$root.listFocus.slice(0, this.level)
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
  // outline: 1px solid purple;
  transition: background .3s;
}
.prop.focus-prop .props-list {
  background-color: $bg;
}
.focus-prop:hover {
  background: $bg;
  // z-index: 12;
  // transition: background .1s 3s;
}
.focus-from .props-list {
  // background: $bgNav;
  // z-index: 12;
  // transition: background .1s 3s;
}
.focus-prop .props-list {
  background-color: $bg;
}
// .focus-from .focus-prop:hover .props-list {
//   background-color: $bg;
// }
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
