import U from '../libs/util'
import ls from 'local-storage'

export const LD3_PROFILES = 'http://id.thomasg.be/ld3-profiles/'

export const LD3_PERSON = {'@type': 'schema:Person', '@id': 'ld3:anonymous', 'schema:name': 'Anonymous person'}
export const LD3_SERVER = [{'@id': 'http://id.thomasg.be/#server'}]

export const LD3_USER = {
  '@type': 'ld3:Profile',
  '@id': null,
  person: LD3_PERSON,
  server: LD3_SERVER,
  workspace: [{
    'schema:name': 'LBLOD test data',
    'schema:url': 'http://id.thomasg.be/lblod/'
  }]
}

const user = ls.get('user') || U.inert(LD3_USER)

export default {
  data: {
    user: user
  },
  computed: {
    auth () {
      return this.user['@id']
    }
  },
  methods: {
    userFetch (uri) {
      if (!uri.startsWith('http')) {
        uri = LD3_PROFILES + uri
      }
      return window.fetch(uri, U.getJson)
      .then(U.checkStatus)
      .then(U.json)
      .then(function (body) {
        for (let key in body) {
          user[key] = body[key]
        }
        ls.set('user', user)
        return user
      }).catch(function (error) {
        if (error.status === 404) {
          user.org = null
          user.person = null
          user.workspace = null
          ls.set('user', user)
        }
        throw error
      })
    },
    userAdd (uri) {
      if (!uri.startsWith('http')) {
        uri = LD3_PROFILES + uri
      }
      var data = U.inert(LD3_USER)
      data['@id'] = uri
      return U.putJson(data)
      .then(U.checkStatus)
      .then(U.json)
      .then(function (body) {
        user.org = body.org || null
        user.person = body.person || null
        user.workspace = body.workspace || null
        body.status = 200
        return body
      }).catch(function (error) {
        if (error.status !== 404) {
          return error.response
        }
        user.org = null
        user.person = null
        user.workspace = null
        return error.response
      })
    },
    userLoad () {
      var root = this.$root
      for (let ns of user.workspace) {
        // Backwards compatibility
        ns['schema:url'] = ns['schema:url'] || ns.url
        // stop
        root.$nextTick(function () {
          root.fetch(ns['schema:url'])
        })
        if (!ns['ld3:prefix']) {
          continue
        }
        let dup = root.namespaces.findIndex(n => n.ns === ns['ld3:prefix'] + ':')
        if (dup >= 0) {
          root.namespaces.splice(dup, 1)
        }
        root.namespaces.push({
          ns: ns['ld3:prefix'] + ':',
          url: ns['schema:url']
        })
      }
      for (var i = 0; i < user.workspace.length; i++) {
        root.fetch(user.workspace[i]['schema:url'], true)
      }
    },
    userLogout () {
      ls.remove('user')
      this.user = U.inert(LD3_USER)
    }
  }
}
