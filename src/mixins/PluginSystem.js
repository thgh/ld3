export default {
  data () {
    return {
      plugins: {
        list: ['Invoice'],
        fetched: [],
        loaded: [],
      }
    }
  },
  methods: {
    loadPlugin (name) {
      if (typeof name === 'object') {
        name = name['@type']
      }
      if (!name) {
        return
      }
      if (name.startsWith('schema:')) {
        name = name.slice(7)
      }
      if (!this.plugins.list.includes(name)) {
        return
      }
      if (this.plugins.loaded.includes(name)) {
        return name
      }

      setTimeout(() => {
        require.ensure(['../plugins/Invoice.vue'], (require) => {
          if (!this.plugins.loaded.includes(name)) {
            const plugin = require('../plugins/Invoice.vue');
            this.$options.components[name] = this.$root.extend(plugin)
            this.plugins.loaded.push(name)
            console.log('load inv', name)
          }
        })
      }, 20)

      return 'temp-plugin'
    }
  }
}
