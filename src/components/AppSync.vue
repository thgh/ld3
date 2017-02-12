<template>
  <transition name="opacity">
    <div class="section-content" v-show="diffs.length">
      The following data is out of sync:
      <div v-for="diff in diffs">
        {{ diff}}
      </div>
    </div>
  </transition>
</template>

<script>
import equals from '../libs/equals'

export default {
  name: 'app-sync',
  computed: {
    diffs () {
      return this.$root.fragmentList.filter(
        id => !equals(this.$root.fragments[id], this.$root.fetchedFragments[id])
      )
    }
  }
}
</script>
