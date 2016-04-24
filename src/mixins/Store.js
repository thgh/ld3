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

var fetching = {}

export default {
  data () {
    return {
      fragments: {},
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
    },
    fetch (uri) {
      let $this = this
      if (typeof uri !== 'string') {
        return console.error('Store.fetch expects string, but got', typeof uri)
      }
      uri = ns.undo(uri)
      if (fetching[uri]) {
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
        console.log(inert($this.fragments))
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
    }
  },
  init () {
    this.ns = ns
  },
  attached () {
    this.interval = setInterval(this.checkSave, 1000)
  },
  detached () {
    clearInterval(this.interval)
  }
}
