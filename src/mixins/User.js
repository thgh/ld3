import { inert, getJSON, putJSON } from '../libs/util.js'
import throttle from '../libs/throttle.js'
import ls from 'local-storage'

export const LD3_PROFILES = 'https://id.thomasg.be/ld3-profiles/'

export const LD3_PERSON = {'@type': 'schema:Person', '@id': 'ld3:anonymous', 'schema:name': 'Anonymous person'}
export const LD3_SERVER = [{'@id': 'https://id.thomasg.be/#server'}]

export const LD3_USER = {
  '@type': 'ld3:Profile',
  '@id': 'ld3:no-user',
  'schema:name': '',
  person: LD3_PERSON,
  server: LD3_SERVER,
  ui: {
    tabs: [],
  },
  workspace: [{
    'schema:name': 'LBLOD test data',
    'ld3:prefix': 'lblod',
    url: 'https://id.thomasg.be/lblod'
  }]
}

const user = ls('user') || inert(LD3_USER)

export default {
  data: {
    user: user
  },
  computed: {
    auth () {
      return this.user['@id'] && this.user['@id'] !== 'ld3:no-user'
    }
  },
  methods: {
    userFetch (uri) {
      if (!uri.startsWith('http')) {
        uri = LD3_PROFILES + uri
      }
      var self = this
      return getJSON(uri)
      .then(function (body) {
        self.setFragment(inert(body), true)
        for (let key in body) {
          user[key] = body[key]
        }
        ls('user', user)
        return user
      }).catch(function (error) {
        if (error.status === 404) {
          user['@id'] = null
          user.person = null
          user.workspace = null
          ls('user', user)
        }
        throw error
      })
    },
    userAdd (uri) {
      if (!uri.startsWith('http')) {
        uri = LD3_PROFILES + uri
      }
      var data = inert(LD3_USER)
      data['@id'] = uri
      return putJSON(data)
      .then(function (body) {
        for (let key in body) {
          user[key] = body[key] || null
        }
        body.status = 200
        return body
      }).catch(function (error) {
        if (error.status !== 404) {
          return error.response
        }
        user['@id'] = null
        user.person = null
        user.workspace = null
        return error.response
      })
    },
    userLoad () {
      // this.$root.loadWorkspace(user.workspace)
      for (let w of user.workspace) {
        this.$root.fetch(w.url, true)
      }
    },
    userLogout () {
      ls.remove('user')
      let u = inert(LD3_USER)
      u['@id'] = null
      for (let key in u) {
        user[key] = u[key] || null
      }
    }
  },
  mounted () {
    if (!this.auth) {
      return
    }
    this.userLoad()
    console.log('User.ready', user.workspace && user.workspace.length, inert(user))
  },
  watch: {
    user: {
      deep: true,
      handler: throttle(function () {
        console.debug('ls save user')
        ls('user', user)
      })
    }
  }
}
