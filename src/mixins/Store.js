import throttle from '../libs/throttle'
import U from '../libs/util'
import ls from 'local-storage'

var fragments = ls.get('fragments')

// TODO: get this context from actual server, can be found in user object
export const STORE_CONTEXT = {
  'dce': 'http://purl.org/dc/elements/1.1/',
  'dcterms': 'http://purl.org/dc/terms/',
  'foaf': 'http://xmlns.com/foaf/0.1/',
  'ld3': 'http://ld3.link/',
  'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
  'schema': 'http://schema.org/',
  'skos': 'http://www.w3.org/2004/02/skos/core#',
  'xsd': 'http://www.w3.org/2001/XMLSchema#'
}

// TODO: sort namespaces in a way that subnamespaces still work
const namespaces = []
for (let ns in STORE_CONTEXT) {
  namespaces.push({
    ns: ns + ':',
    url: STORE_CONTEXT[ns]
  })
}

var ns = {
  min (s) {
    for (var i = 0; i < namespaces.length; i++) {
      s = s.replace(namespaces[i].url, namespaces[i].ns)
    }
    return s
  },
  minF (s) {
    s['@id'] = this.min(s['@id'])
    return s
  },
  undo (s) {
    if (s.endsWith('#id')) {
      s = s.slice(0, -3)
    }
    for (var i = namespaces.length - 1; i >= 0; i--) {
      s = s.replace(namespaces[i].ns, namespaces[i].url)
    }
    return s
  },
  undoF (s) {
    s['@id'] = this.undo(s['@id'])
    return s
  }
}

function hideSchema (obj) {
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

var storeLocally = throttle(function (fragments) {
  window.fragments = U.inert(fragments)
  ls('fragments', fragments)
}, 5000)

var fetching = {}

export default {
  data () {
    return {
      fragments: fragments || {},
      namespaces: namespaces || [],
      syncAgo: 0,
      interval: 0
    }
  },
  computed: {
    fragmentCount () {
      console.log('counting fragments')
      return Object.keys(this.fragments).length
    }
  },
  methods: {
    checkSave () {
      this.syncAgo++
    },
    sync (fragment) {
      let $this = this
      if (typeof fragment !== 'object') {
        return console.error('Store.sync expects object, but got', typeof fragment)
      }
      fragment = U.inert(fragment)
      ns.undoF(fragment)
      if (fragment['@temp']) {
        delete fragment['@temp']
      }
      U.putJson(fragment)
      .then(U.json)
      .then(function (body) {
        if (!body.success) {
          console.warn(body)
        }
        $this.syncAgo = 0
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
      uri = ns.undo(uri)
      if (fetching[uri] && !force) {
        return console.log(' cancel', uri)
      }
      if (uri.slice(0, 4) !== 'http') {
        return console.log(' this aint no uri', uri)
      }
      fetching[uri] = true
      window.fetch(uri, U.getJson)
      .then(U.checkStatus)
      .then(U.json)
      .then(function (body) {
        if (!body) {
          return console.warn('no data in response')
        }
        if (typeof body !== 'object') {
          return console.warn('no object in data of response')
        }
        if (body.length && body[0]) {
          for (let s of body) {
            if (s['@id']) {
              s = ns.minF(s)
              $this.$set('fragments[\'' + s['@id'] + '\']', s)
            }
          }
        } else if (body['@id']) {
          let s = ns.minF(body)
          $this.$set('fragments[\'' + s['@id'] + '\']', s)
        } else if (body['@graph']) {
          for (let s of body['@graph']) {
            if (s['@id']) {
              s = ns.minF(s)
              $this.$set('fragments[\'' + s['@id'] + '\']', s)
            }
          }
        }
        $this.syncLocal()
      }).catch(function (body) {
        console.error('Store.fetch didnt retrieve', uri, body)
        let s = ns.minF({
          '@id': uri
        })
        $this.$set('fragments[\'' + s['@id'] + '\']', s)
      })
      return this.setFragment({
        '@temp': true,
        '@id': uri
      })
    },
    copy (uri, to) {
      if (!this.fragments[uri]) {
        return console.warn('Store.rename: cant find', uri)
      }
      if (this.fragments[to]) {
        return console.warn('Store.rename: overwriting is disabled', to)
      }
      var temp = U.inert(this.fragments[uri])
      temp['@id'] = to
      this.setFragment(temp)
      console.log('copied', uri, 'to', to)
      return to
    },
    setFragment (f) {
      f = ns.minF(f)
      this.$set('fragments[\'' + f['@id'] + '\']', f)
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
      uri = ns.min(uri)
      if (!this.fragments[uri]) {
        return // console.warn(uri, 'was not found in storage')
      }
      var obj = U.inert(this.fragments[uri])
      for (let prop in obj) {
        // Recursive
        if (options > 0 && typeof obj[prop] === 'object' && Object.keys(obj[prop]).length === 1 && obj[prop]['@id']) {
          obj[prop] = this.resolve(obj[prop]['@id'], options - 1)
        }
      }
      obj = hideSchema(obj)
      return obj
    },
    syncLocal () {
      storeLocally(this.fragments)
    },
    clearCache () {
      ls.clear()
    }
  },
  init () {
    this.ns = ns
  },
  attached () {
    this.interval = setInterval(this.checkSave, 1000)
    this.syncInterval = setInterval(this.syncLocal, 1000)
  },
  detached () {
    clearInterval(this.interval)
    clearInterval(this.syncInterval)
  }
}
