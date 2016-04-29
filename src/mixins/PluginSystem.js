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
      if (this.plugins.loaded.indexOf(name) > -1) {
        return true
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
      script.src = '/static/plugins/' + name + '.js'
      document.body.appendChild(script)
      return false
    }
  }
}
