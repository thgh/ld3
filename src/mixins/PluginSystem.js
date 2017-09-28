export default {
  data () {
    return {
      capabilities: [],
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

      if (!this.$options.components[name]) {
        this.$options.components[name] = () => import('../plugins/' + name + '.vue')
      }

      return name
    },
    addCapability (capability) {
      if (this.capabilities.find(c => c.id === capability.id)) {
        return
      }
      this.capabilities.push(capability)
    }
  }
}
