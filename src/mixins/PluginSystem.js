export default {
  data () {
    return {
      plugins: {
        list: ['Invoice'],
        loaded: []
      }
    }
  },
  methods: {
    loadPlugin (name) {
      if (!this.$root.config.allowPlugins) {
        return
      }
      if (!name) {
        return
      }
      if (name.startsWith('schema:')) {
        name = name.slice(7)
      }
      if (this.plugins.loaded.indexOf(name) > -1) {
        return name
      }
      if (this.plugins.list.indexOf(name) < 0) {
        return false
      }
      var vm = this
      var script = document.createElement('script')
      script.onload = function () {
        vm.$options.components[name] = vm.$root.extend(window[name])
        vm.plugins.loaded.push(name)
      }
      script.src = './dist/static/plugins/' + name + '.js'
      document.body.appendChild(script)
      return false
    }
  }
}
