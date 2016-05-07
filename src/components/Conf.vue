<template>
  <main>
    <section class="section-browser">
      <p>
        <a href="#!home">home</a>
        <a href="#!conf">config</a>
        <a href="#!dataset/wut">dataset/wut</a>
        <a href="#!projects:dekastart">projects:dekastart</a>
      </p>
      <recent-fragments :list="$root.fragments"></recent-fragments>
    </section>
    <section class="section-content">
      <h1>conf</h1>
      qsdf  
      <h2>Workspaces</h2>
      <table style="max-width:100%;">
        <thead>
          <tr align="left">
            <th>Workspace</th>
            <th>fetch</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ns in $root.workspaces">
            <td style="padding-right:1em;">{{ ns.name }}</td>
            <td style="white-space:pre-wrap;">{{ ns.fetch.join('\n') }}</td>
          </tr>
        </tbody>
      </table>
      <h2>Namespaces</h2>
      <table style="min-width:300px;max-width:100%;">
        <thead>
          <tr align="left">
            <th>Namespace</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ns in $root.namespaces">
            <td>{{ ns.ns }}</td>
            <td>{{ ns.url }}</td>
          </tr>
        </tbody>
      </table>
      <h2>Local Storage</h2>
      <p>Volgende instellingen worden bewaard in {{ browser }}:</p>
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
            <td align="right">{{ u.size&&u.size.toLocaleString() }} b</td>
          </tr>
          <tr>
            <td> </td>
            <td> </td>
            <td align="right">{{ percent.toLocaleString() }}% of 5 MB</td>
          </tr>
        </tbody>
      </table>
      <p>
        
      </p>
      <p>
        <button type="button" class="btn btn-save" @click="forceCache">Force cache</button>
      </p>
      <h2>Memory</h2>
      <table style="min-width:300px;max-width:100%;">
        <thead>
          <tr align="left">
            <th>#</th>
            <th>Item</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in memory">
            <td>{{ u.count }}</td>
            <td>{{ u.key }}</td>
            <td>{{ u.size&&u.size.toLocaleString() }} bytes</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import browser from '../libs/browser'

export default {
  data () {
    return {
      browser: browser(),
      usage: [{key: 'calculating...'}],
      percent: 0
    }
  },
  computed: {
    memory () {
      return [{
        key: 'fragments',
        count: Object.keys(this.$root.fragments).length,
        size: JSON.stringify(this.$root.fragments).length
      }]
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
      }
      usage.sort(function (a, b) {
        return b.size - a.size
      })
      this.percent = parseFloat((usage.reduce((a, b) => a + b['size'], 0) / 50000).toPrecision(2))
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
