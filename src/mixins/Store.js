import throttle from '../libs/throttle.js'
import { inert, getJSON, putJSON, toMin, fromMin } from '../libs/util.js'
import ls from 'local-storage'
import Vue from 'vue'

const fragments = {}

function hideSchema (obj) {
  // Collapse @value
  if (typeof obj['@value'] !== 'undefined') {
    return obj['@value']
  }
  // Hide in current object
  for (let prop in obj) {
    if (prop.startsWith('schema:')) {
      obj[prop.slice(7)] = obj[prop]
      delete obj[prop]
    }
  }
  // Hide nested props
  for (let prop in obj) {
    if (typeof obj[prop] === 'object' && Object.keys(obj[prop]).length > 1) {
      obj[prop] = hideSchema(obj[prop])
    }
  }
  return obj
}

var storeLocally = throttle(function (f) {
  ls('fragments', f)
}, 5000)

var fetching = {}

export default {
  data () {
    return {
      fragments: fragments

      // syncAgo: 0,
      // interval: 0
    }
  },
  computed: {
    currentFragment () {
      return this.fragments && this.route && this.route.uri && this.fragments[this.route.uri] || this.fetch(this.route.uri)
    },
    fragmentCount () {
      return Object.keys(this.fragments).length
    }
  },
  methods: {
    checkSave () {
      // this.syncAgo++
    },
    sync (fragment) {
      let $this = this
      if (typeof fragment === 'string') {
        fragment = inert(this.fragments[toMin(fragment)])
      }
      if (typeof fragment !== 'object') {
        return console.error('Store.sync expects object, but got', typeof fragment)
      }
      fragment = fromMin(inert(fragment))
      if (fragment['@temp']) {
        delete fragment['@temp']
      }
      putJSON(fragment)
      .then(function (body) {
        if (!body.success) {
          console.warn(body)
        }
        // $this.syncAgo = 0
      }).catch(function (body) {
        console.warn(body)
      })
      this.syncLocal()
    },
    fetch (uri, force) {
      let $this = this
      if (typeof uri !== 'string') {
        return console.error('Store.fetch expects string, but got', typeof uri)
      }
      uri = fromMin(uri)
      if (fetching[uri] && !force) {
        return console.log(' cancel', uri)
      }
      if (!uri.startsWith('http')) {
        return console.log(' this aint no uri', uri)
      }
      if (uri.endsWith('anonymous')) {
        return this.setFragment({'@type': 'schema:Person', '@id': 'ld3:anonymous', 'schema:name': 'Anonymous person'})
      }
      fetching[uri] = true
      getJSON(uri)
      .then(this.addGraph).catch(function (body) {
        console.error('Store.fetch didnt retrieve', uri, body)
        $this.setFragment({
          '@id': uri,
          'schema:name': 'Not found'
        })
      })
      // this.$root.route.uri += '#temp'
      return {
        '@temp': true,
        '@id': uri,
        'schema:name': 'Temporary'
      }
    },
    addGraph (body) {
      if (!body) {
        return console.warn('no data in response')
      }
      if (typeof body !== 'object') {
        return console.warn('no object in data of response')
      }
      if (body.length && body[0]) {
        for (let s of body) {
          if (s['@id']) {
            this.setFragment(s)
          }
        }
      } else if (body['@id']) {
        this.setFragment(body)
      } else if (body['@graph']) {
        for (let s of body['@graph']) {
          if (s['@id']) {
            this.setFragment(s)
          }
        }
      }
      this.syncLocal()
    },
    copyFragment (uri, to) {
      if (!this.fragments[uri]) {
        return console.warn('Store.rename: cant find', uri)
      }
      if (this.fragments[to]) {
        return console.warn('Store.rename: overwriting is disabled', to)
      }
      var temp = inert(this.fragments[uri])
      temp['@id'] = to
      this.setFragment(temp)
      console.log('copied', uri, 'to', to)
      return to
    },
    setFragment (f) {
      f = toMin(f)
      if (f['@id'].endsWith(':')) {
        return
      }
      Vue.set(this.fragments, f['@id'], f)
      // if (this.$root.route.uri.endsWith('#temp')) {
      //   this.$nextTick(() => this.$root.route.uri = this.$root.route.uri.slice(0, -5))
      // }
      return f
    },
    resolve (uri, options) {
      options = options || 0
      if (!this.fragments) {
        return console.warn('No fragments in storage..')
      }
      if (typeof uri === 'object') {
        uri = uri['@id']
      }
      if (!uri) {
        return // console.warn('This uri is falsy', uri)
      }
      uri = toMin(uri)
      if (!this.fragments[uri]) {
        this.fetch(uri)
        return // console.warn(uri, 'was not found in storage')
      }
      var obj = inert(this.fragments[uri])
      for (let prop in obj) {
        // Recursive
        if (options > 0 && typeof obj[prop] === 'object' && Object.keys(obj[prop]).length === 1 && obj[prop]['@id']) {
          obj[prop] = this.resolve(obj[prop]['@id'], options - 1)
        }
      }
      obj = hideSchema(obj)
      return obj
    },
    loadWorkspace (list) {
      if (!list || !list.length) {
        return console.warn('No workspaces to load!')
      }
      for (let ns of list) {
        if (ns['ld3:prefix'] || ns.prefix) {
          namespaces.push({
            prefix: (ns['ld3:prefix'] || ns.prefix) + ':',
            url: ns.url || ns['@id']
          })
        }
      }
      // Reverse sort to allow efficient dedup and correct namespace minification
      namespaces.sort((a, b) => b.url.localeCompare(a.url))
      // Dedup
      for (var last, i = namespaces.length - 1; i >= 0; i--) {
        last = last === namespaces[i].url ? namespaces.splice(i, 1)[0].url : namespaces[i].url
      }
      console.log(Object.keys(this.fragments).filter(k => k.startsWith('http')))
    },
    syncLocal () {
      storeLocally(this.fragments)
    },
    clearCache () {
      this.fragments = {}
      ls.remove('fragments')
    },
    initStorage () {
      this.loadWorkspace(ls.get('namespaces') || STORE_NAMESPACES)
      const fragments = ls.get('fragments') || {}
      this.addGraph({'@graph': Object.keys(fragments).map(k => fragments[k])})
    }
  }
}
