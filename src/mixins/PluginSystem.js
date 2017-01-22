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
      if (!name) {
        return
      }
      if (name.startsWith('schema:')) {
        name = name.slice(7)
      }
      if (this.plugins.loaded.includes(name)) {
        return name
      }
      if (window[name]) {
        this.plugins.loaded.push(name)
        this.finishLoading(name)
        return name
      }
      if (!this.plugins.list.includes(name)) {
        return
      }
      if (this.plugins.fetched.includes(name)) {
        return
      }
      if (!this.$root.config.allowPlugins) {
        this.plugins.fetched.push(name)
        // Try once more after all scripts are loaded
        setTimeout(() => this.loadPlugin(name), 1000)
        return
      }

      // Fetch plugin
      console.debug('plugin fetch', name)
      this.plugins.fetched.push(name)
      const script = document.createElement('script')
      script.onload = () => this.finishLoading(name)
      script.src = './' + name + '.js'
      document.body.appendChild(script)
      return false
    },
    finishLoading (name) {
      console.debug('plugin finish loading', name, window[name])
      this.$options.components[name] = this.$root.extend(window[name])
      this.plugins.loaded.push(name)
    }
  }
}
