<template>
  <transition name="opacity">
    <div class="section-content" v-show="fetchDiffs.length">
      <div v-show="fetchDiffs.length">
        The following data is out of sync:
        <p v-for="diff in fetchDiffs" @click="visit(diff)">
          <span style="float:right">
            <button class="btn" @click.stop="$root.syncLocal" v-if="localDiffs.includes(diff)">Local</button>
            <button class="btn" @click.stop="sync(diff)">Save</button>
            <button class="btn" @click.stop="discard(diff)">Discard</button>
          </span>
          {{ diff }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
import equals from '../libs/equals'
import { inert } from '../libs/util'

export default {
  name: 'app-sync',
  computed: {
    localDiffs () {
      return this.$root.fragmentList.filter(
        id => !equals(this.$root.fragments[id], this.$root.storedFragments[id])
      )
    },
    fetchDiffs () {
      return this.$root.fragmentList.filter(
        id => !equals(this.$root.fragments[id], this.$root.fetchedFragments[id])
      )
    }
  },
  methods: {
    visit (uri) {
      window.location.hash = '!' + uri
    },
    sync (uri) {
      this.$root.sync(uri)
    },
    discard (uri) {
      this.$root.discard(uri)
    }
  }
}
</script>
