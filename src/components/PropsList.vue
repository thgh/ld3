<template>
  <div class="props-list" :class="{active:blurry}">
    <prop v-for="(prop, value) in fragment" v-if="prop[0]!=='@'" :fragment.sync="fragment" :prop="prop"></prop>
    <prop-add :fragment.sync="fragment"></prop-add>
  </div>
</template>

<script>
import PropAdd from './PropAdd'

export default {
  name: 'props-list',
  props: {
    blurry: false,
    fragment: {
      default: {
        'schema:name': 'fuckthis'
      }
    }
  },
  methods: {
    cancel () {
      this.blurry = false
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
  margin-left: -1rem!important;
  flex-basis: 100%;
  flex-shrink: 0;
}
.prop .props-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-left: 0!important;
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
