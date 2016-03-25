<template>
  <div class="props-list" :class="{active:blurry}">
    <prop v-for="(prop, value) in fragmentprops" v-if="prop[0]!=='@'" :fragment.sync="fragmentprops" :prop="prop"></prop>
  </div>
</template>

<script>
export default {
  name: 'props-list',
  props: {
    blurry: false,
    fragmentprops: {
      default: {
        'schema:name': 'fuckthis'
      }
    }
  },
  methods: {
    cancel () {
      this.blurry = false
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables';
.props-list {
  position: relative;
  margin-left: -1rem!important;
}
.prop .props-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-left: 0!important;
  padding: .5rem 0;
  background-color: #000;
  // outline: 1px solid purple;
}
.focus-from .props-list {
  background: #090909;
  z-index: 12;
}
.focus-from .focus-prop .props-list {
  background-color: #000;
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
  transition: opacity 1s;
  pointer-events:none;
}
.props-list.active>.blurry {
  opacity: .9;
  pointer-events:all;
}*/
</style>
