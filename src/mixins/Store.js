var namespaces = [
  {ns: '::', url: 'https://schema.org/'},
  {ns: '::', url: 'http://schema.org/'},
  {ns: 'dev:', url: 'https://ld.dev/'},
  {ns: 'dev:', url: 'http://ld.dev/'},
  {ns: 'store:', url: 'dev:store/public/'},
  {ns: 'projects:', url: 'store:projects/'},
  {ns: 'invoices:', url: 'store:invoices/'},
  {ns: 'orgs:', url: 'store:orgs/'}
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

function json (response) {
  return response.json()
}
function inert (s) {
  return JSON.parse(JSON.stringify(s))
}

var fetching = {}

export default {
  data: {
    fragments: {},
    syncAgo: 0,
    interval: 0
  },
  methods: {
    checkSave () {
      this.syncAgo++
    },
    sync (fragment) {
      let $this = this
      if (typeof uri !== 'object') {
        console.error('type error')
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
        console.error('type error')
      }
      uri = ns.undo(uri)
      if (fetching[uri]) {
        return console.log(' cancel', uri)
      }
      fetching[uri] = true
      window.fetch(uri, {
        redirect: 'follow'
      }).then(json).then(function (body) {
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
        }
        console.log(inert($this.fragments))
      })
      return 'blub'
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
