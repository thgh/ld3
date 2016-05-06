<template>
<div>
  <component :is="route.view" :route="route"></component></div>
</template>

<script>
import Home from './components/Home'
import Conf from './components/Conf'
import Edit from './components/Edit'

import Router from './mixins/Router.js'

export default {
  data () {
    return {
      namespaces: {}
    }
  },
  mixins: [Router],
  components: {
    Home,
    Conf,
    Edit
  }
}
</script>

<style lang="scss">
@import 'scss/variables.scss';
@import 'scss/shame.scss';

@import 'scss/reset';
@import 'scss/structure';
@import 'scss/browser';
@import 'scss/editor';
@import 'scss/inp';
@import 'scss/btn';
</style>
