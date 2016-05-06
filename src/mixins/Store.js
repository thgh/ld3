import throttle from '../libs/throttle'

var namespaces = [
  // Official
  {ns: 'schema:', url: 'https://schema.org/'},
  {ns: 'schema:', url: 'http://schema.org/'},
  {ns: 'rdf:', url: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'},
  {ns: 'rdfs:', url: 'http://www.w3.org/2000/01/rdf-schema#'},
  {ns: 'dcterms:', url: 'http://purl.org/dc/terms/'},

  // Personal
  {ns: 'dev:', url: 'https://ld.dev/'},
  {ns: 'dev:', url: 'http://ld.dev/'},
  {ns: 'dev:', url: window.location.hostname.indexOf('localhost') === -1 ? 'https://thomasg.be/ld/' : 'http://ld.dev/'},
  {ns: 'store:', url: 'dev:store/public/'},
  {ns: 'projects:', url: 'store:projects/'},
  {ns: 'invoices:', url: 'store:invoices/'},
  {ns: 'ppl:', url: 'store:ppl/'},
  {ns: 'orgs:', url: 'store:orgs/'},

  // Converted
  {ns: 'https://opencorporates.com/companies/', url: 'http://rdf-translator.appspot.com/convert/detect/json-ld/https://opencorporates.com/companies/'},
  {ns: 'http://data.kbodata.be/', url: 'http://rdf-translator.appspot.com/convert/detect/json-ld/http://data.kbodata.be/'},
  {ns: 'schema:', url: 'store:schema/'}
]

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

function checkStatus (response) {
  if (response.status < 400) {
    return response
  }
  console.warn(response.status)
  var error = new Error(response.statusText)
  error.response = response
  throw error
}
function json (response) {
  return response.json()
}
function inert (s) {
  return JSON.parse(JSON.stringify(s))
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
  window.fragments = inert(fragments)
  window.localStorage['fragments'] = JSON.stringify(fragments)
}, 5000)

var fetching = {}

export default {
  data () {
    var fragments
    try {
      fragments = JSON.parse(window.localStorage['fragments'])
    } catch (e) {}
    return {
      fragments: fragments || {},
      syncAgo: 0,
      interval: 0
    }
  },
  methods: {
    checkSave () {
      this.syncAgo++
    },
    sync (fragment) {
      let $this = this
      if (typeof fragment !== 'object') {
        return console.error('Store.fetch expects object, but got', typeof fragment)
      }
      fragment = inert(fragment)
      ns.undoF(fragment)
      window.fetch(fragment['@id'] + '?secret=insecure', {
        method: 'put',
        body: JSON.stringify(fragment)
      }).then(json).then(function (body) {
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
      fetching[uri] = true
      window.fetch(uri, {
        redirect: 'follow'
      }).then(checkStatus).then(json).then(function (body) {
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
          console.log(body)
          for (let s of body['@graph']) {
            console.log(s)
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
      return {
        '@id': uri
      }
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
    syncLocal () {
      storeLocally(this.fragments)
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
