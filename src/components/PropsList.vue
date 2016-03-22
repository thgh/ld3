<template>
  <div class="props-list" :class="{active:blurry}">
    <div v-for="(prop, value) in fragmentprops" v-if="prop[0]!=='@'">
      <prop :fragment.sync="fragmentprops" :prop="prop"></prop>
    </div>
    <div class="blurry" @click.prevent.stop="cancel"></div>
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
      this.$broadcast('deactivate')
      this.blurry = false
    }
  },
  events: {
    objectActivated () {
      this.blurry = true
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables';
.props-list {
  position: relative;
}
.prop .props-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  background-color: $bg;
}
.blurry {
  position: absolute;
  top: 0;
  right: 0;
  left:0;
  bottom:0 ;
  background-color: $bg;
  opacity: 0;
  transition: .2s opacity;
  pointer-events:none;
}
.props-list.active>.blurry {
  opacity: .9;
  pointer-events:all;
}
</style>
