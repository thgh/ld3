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
    url: 'http://id.thomasg.be/lblod'
  }]
}

const user = ls.get('user') || U.inert(LD3_USER)
user.auth = !!user['@id']

export default {
  data: {
    user: user
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
        user.auth = true
        for (let key in body) {
          user[key] = body[key]
        }
        ls.set('user', user)
        return user
      }).catch(function (error) {
        if (error.status === 404) {
          user.auth = false
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
        user.auth = true
        user.org = body.org || null
        user.person = body.person || null
        user.workspace = body.workspace || null
        body.status = 200
        return body
      }).catch(function (error) {
        if (error.status !== 404) {
          return error.response
        }
        user.auth = false
        user.org = null
        user.person = null
        user.workspace = null
        return error.response
      })
    },
    userLoad () {
      var root = this.$root
      root.fetch(user['@id'], true)
      for (var i = 0; i < user.workspace.length; i++) {
        root.fetch(user.workspace[i].url, true)
      }
    }
  }
}
