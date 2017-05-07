<template>
  <transition name="opacity">
    <div class="section-content" v-show="fetchDiffs.length">
      <div v-show="fetchDiffs.length">
        The following data is out of sync:
        <p v-for="diff in fetchDiffs" @click="visit(diff.id)">
          <span style="float:right">
            <button class="btn" @click.stop="$root.syncLocal" v-if="localDiffs.includes(diff.id)">Local</button>
            <button class="btn" @click.stop="sync(diff.id)">Save</button>
            <button class="btn" @click.stop="discard(diff.id)">Discard</button>
          </span>
          {{ diff.id }}
          <br><small>{{ Object.keys(diff.diff).join(', ') }}</small>
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
import { default as equals, differs } from '../libs/equals'
import { inert } from '../libs/util'

export default {
  name: 'app-sync',
  computed: {
    localDiffs () {
      return Object.keys(this.$root.storedFragments).filter(
        id => !equals(this.$root.fragments[id], this.$root.storedFragments[id])
      )
    },
    fetchDiffs () {
      this.$nextTick(() => {
        this.$root.syncLocal()
      })
      return Object.keys(this.$root.fetchedFragments).filter(
        id => !equals(this.$root.fragments[id], this.$root.fetchedFragments[id])
      ).map(
        id => ({ id, diff: differs(this.$root.fetchedFragments[id], this.$root.fragments[id]) })
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
