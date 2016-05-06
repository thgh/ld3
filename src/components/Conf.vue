<template>
  <main>
    <section class="section section-browser">
      <p>
        <a href="#!home">home</a>
        <a href="#!conf">config</a>
        <a href="#!dataset/wut">dataset/wut</a>
        <a href="#!projects:dekastart">projects:dekastart</a>
      </p>
      <recent-fragments :list="$root.fragments"></recent-fragments>
    </section>
    <section class="section section-editor">
      <h1>conf</h1>
      qsdf  
      <h2>Local Storage</h2>
      <p>Volgende instellingen worden bewaard in {{ browser }} op deze computer:</p>
      <table style="min-width:300px;max-width:100%;">
        <thead>
          <tr align="left">
            <th>#</th>
            <th>Item</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in usage">
            <td>{{ u.count }}</td>
            <td>{{ u.key }}</td>
            <td>{{ u.size&&u.size.toLocaleString() }} bytes</td>
          </tr>
        </tbody>
      </table>
      <p>
        <button type="button" class="btn btn-save" @click="forceCache">Force cache</button>
      </p>
    </section>
  </main>
</template>

<script>
import browser from '../libs/browser'

export default {
  data () {
    return {
      browser: browser(),
      usage: [{key: 'calculating...'}]
    }
  },
  methods: {
    recalculate () {
      var usage = []
      for (var key in window.localStorage) {
        // Special cases
        usage.push({
          key: key,
          count: key === 'fragments' ? Object.keys(JSON.parse(window.localStorage[key])).length || 'error' : '',
          size: window.localStorage[key].length
        })
        usage.sort(function (a, b) {
          return b.size - a.size
        })
      }
      this.usage = usage
    },
    forceCache () {
      this.$root.syncLocal()
      this.recalculate()
    }
  },
  attached () {
    this.recalculate()
    var self = this
    setTimeout(function () {
      self.recalculate()
    })
  }
}
</script>

<style lang="scss">
</style>
