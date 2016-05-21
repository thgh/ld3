<template>
    <section class="section-content section-editor">
      <h1>conf</h1>
      <p>
        <button type="button" class="btn btn-save" @click="forceCache">Cache fragments</button>
        <button type="button" class="btn btn-save" @click="clearCache">Clear cache</button>
        <button type="button" class="btn btn-save" @click="$root.userLoad()">Load workspace</button>
        <a href="#!auth" class="btn btn-save" @click="$root.userLogout()">logout</a>
      </p>
      <h2>Namespaces</h2>
      <table class="tbl-conf" style="min-width:300px">
        <thead>
          <tr>
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
      <table class="tbl-conf" style="min-width:300px">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th class="right">Size</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in usage">
            <td>{{ u.count }}</td>
            <td>{{ u.key }}</td>
            <td class="right">{{ u.size&&u.size.toLocaleString() }} b</td>
          </tr>
          <tr>
            <td>Total</td>
            <td colspan="2" class="right">{{ percent.toLocaleString() }}% of 5 MB</td>
          </tr>
        </tbody>
      </table>
      <h2>Memory</h2>
      <table class="tbl-conf" style="min-width:300px">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th class="right">Size</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in memory">
            <td>{{ u.count }}</td>
            <td>{{ u.key }}</td>
            <td class="right">{{ u.size&&u.size.toLocaleString() }} b</td>
          </tr>
        </tbody>
      </table>
    </section>
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
      }, {
        key: 'user',
        count: '',
        size: JSON.stringify(this.$root.user).length
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
          count: key === 'fragments' ? Object.keys(JSON.parse(window.localStorage.getItem(key))).length || '0' : '',
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
    },
    clearCache () {
      this.$root.clearCache()
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
