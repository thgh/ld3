// import throttle from '../libs/throttle.js'
import { inert, getJSON, putJSON, toMin, fromMin, timestamp } from '../libs/util.js'
import ls from 'local-storage'
import throttle from 'lodash/throttle'

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
    if (typeof obj[prop] === 'object' && obj[prop] && Object.keys(obj[prop]).length > 1) {
      obj[prop] = hideSchema(obj[prop])
    }
  }
  return obj
}

var fetching = {}

const CREATED_AT = '@created_at';
const FETCHED_AT = '@fetched_at';
const UPDATED_AT = '@updated_at';

export default {
  data () {
    const fragments = ls('fragments') || {}
    // const fetchedFragments = {}
    const fetchedFragments = ls('fetchedFragments') || {}

    if (!fragments['_:config']) {
      console.warn('Initial config')
      fragments['_:config'] = {
        '@id': '_:config',
        '@type': 'Config',
        plugins: false,
        serviceWorker: false
      }
      fetchedFragments['_:config'] = inert(fragments['_:config'])
    }

    return {
      // Project setup
      config: fragments['_:config'],

      // Data
      fragments,
      fetchedFragments,
      storedFragments: inert(fragments),

      // UI state
      listFocus: ['uri'],
      showURI: false,
      show: {
        appLeft: false,
        view: false,
      },

      // deprecated
      // syncAgo: 0,
      // interval: 0
    }
  },
  computed: {
    currentFragment () {
      const inCache = this.fragments && this.route && this.route.uri && this.fragments[this.route.uri]
          console.log(new Date().toJSON().slice(0, 16))
      if (inCache) {
        if (inCache[FETCHED_AT] && inCache[FETCHED_AT].startsWith(new Date().toJSON().slice(0, 16))) {
          console.log()
          this.fetch(this.route.uri)
        }
        return inCache
      }

      // Prepare reactivity
      this.$set(this.fragments, this.route.uri, null)
      this.$set(this.fetchedFragments, this.route.uri, null)
      const notInCache = this.fragments[this.route.uri] || {}

      return this.fetch(this.route.uri)
    },
    fragmentCount () {
      return this.fragmentList.length
    },
    fragmentList () {
      return Object.keys(this.fragments)
    }
  },
  methods: {
    checkSave () {
      // this.syncAgo++
    },
    discard (uri) {
      if (typeof uri !== 'string') {
        return console.error('Store.discard expects string, but got', typeof uri)
      }
      if (this.fetchedFragments[uri]) {
        this.fragments[uri] = inert(this.fetchedFragments[uri])
        this.syncLocal()
      } else {
        this.$set(this.fetchedFragments, uri, null)
        this.fetch(uri)
      }
    },
    sync (fragment) {
      if (typeof fragment === 'string') {
        fragment = inert(this.fragments[toMin(fragment)])
      }
      if (typeof fragment !== 'object' || fragment === null) {
        return console.error('Store.sync expects object, but got', typeof fragment)
      }

      // Save local fragments to localStorage
      const id = fragment['@id']
      if (id && id.startsWith('_:')) {
        this.fetchedFragments[id] = inert(fragment)
        this.syncLocal()
        return
      }

      //
      fragment = fromMin(inert(fragment))
      delete fragment['@temp']
      delete fragment['@fake']
      delete fragment[FETCHED_AT]

      // Update timestamps
      fragment[UPDATED_AT] = timestamp()
      if (!fragment[CREATED_AT]) {
        fragment[CREATED_AT] = timestamp()
      }

      putJSON(fragment)
      .then((body) => {
        if (!body.success) {
          console.warn(body)
        } else {
          this.fetch(id, true)
        }
      }).catch((body) => {
        console.warn(body)
      })
    },
    fetch (uri, force) {
      if (typeof uri !== 'string') {
        return console.error('Store.fetch expects string, but got', typeof uri)
      }
      uri = fromMin(uri)
      if (fetching[uri] && !force) {
        return console.log(' cancel', uri)
      }
      if (!uri.startsWith('http')) {
        console.log(this.fragments, uri,this.fragments[uri] )
        return console.log(' this aint no uri', uri) || this.fragments[uri]
      }
      if (uri.endsWith('anonymous')) {
        // Fetched is set to true, but might have to be flagged in another way
        return this.setFragment({'@type': 'schema:Person', '@id': 'ld3:anonymous', 'schema:name': 'Anonymous person'}, true)
      }
      fetching[uri] = true
      getJSON(uri)
      .then(data => this.addGraph(data, true)).catch(function (body) {
        console.error('Store.fetch didnt retrieve', uri, body)
      })
      // this.$root.route.uri += '#temp'
      return {
        '@temp': true,
        '@id': uri,
        'schema:name': 'Temporary'
      }
    },
    addGraph (body, fetched) {
      if (!body) {
        return console.warn('no data in response')
      }
      if (typeof body !== 'object') {
        return console.warn('no object in data of response')
      }
      if (body.length && body[0]) {
        for (let s of body) {
          if (s['@id']) {
            this.setFragment(s, fetched)
          }
        }
      } else if (body['@id']) {
        this.setFragment(body, fetched)
      } else if (body['@graph']) {
        for (let s of body['@graph']) {
          if (s['@id']) {
            this.setFragment(s, fetched)
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
    setFragment (f, fetched) {
      f = toMin(f)
      if (f['@id'].endsWith(':')) {
        return
      }
      this.$set(this.fragments, f['@id'], f)

      //
      if (fetched) {
        f[FETCHED_AT] = timestamp()
        this.$set(this.fetchedFragments, f['@id'], inert(f))
      } else if (!this.fetchedFragments.hasOwnProperty(f['@id'])){
        this.$set(this.fetchedFragments, f['@id'], null)
      }
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
    syncLocal: throttle(function () {
      this.actualSyncLocal()
    }, 2000),
    actualSyncLocal () {
      console.log('storeLocally', this)
      if (!this) return


      // Keep a copy of what is stored 
      this.storedFragments = inert(this.fragments)

      //
      ls('fragments', this.fragments)
      ls('fetchedFragments', this.fetchedFragments)
      console.log('succes')
    },
    clearCache () {
      this.fragments = {}
      ls.remove('fragments')
      ls.remove('fetchedFragments')
    },
    initStorage () {
      this.loadWorkspace(ls.get('namespaces') || STORE_NAMESPACES)
      const fragments = ls.get('fragments') || {}
      this.addGraph({'@graph': Object.keys(fragments).map(k => fragments[k])})
    }
  }
}
