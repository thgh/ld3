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

      if (name === 'Invoice') {
        require.ensure(['../plugins/Invoice.vue'], (require) => {
          this.finishLoading(require('../plugins/Invoice.vue'), name)
        })
      // } else if (name === 'Foobar') {
      //   require.ensure(['../plugins/Foobar.vue'], (require) => {
      //     this.finishLoading(require('../plugins/Foobar.vue'), name)
      //   })
      }

      if (this.plugins.loaded.includes(name)) {
        return name
      }

      return 'temp-plugin'
    },
    finishLoading (plugin, name) {
      if (!this.plugins.loaded.includes(name)) {
        this.$options.components[name] = this.$root.extend(plugin)
        this.plugins.loaded.push(name)
        console.log('finishLoading', name)
      }
    }
  }
}
