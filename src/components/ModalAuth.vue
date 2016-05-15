<template>
  <div class="modal" transition="modal">
    <div class="modal-body" :class="{'modal-nudge':status}">
      <form class="auth" @submit.prevent="submit">
        <label class="inp-text inp-auth" :class="{'inp-error':status}" @input="input">
          <div class="inp-label">Fill in your username:</div>
          <input v-model="name" placeholder=". . . . . . . . . .">
        </label>
        <button type="submit" class="btn btn-save" :disabled="!name">start</button>
        <div class="auth-feedback" v-if="status===404">
          Unknown user, do you want to <a href="#" @click.prevent="add">add it</a>?
        </div>
        <div class="auth-feedback" v-else v-text="status?'An error occurred':''">
          
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      status: null
    }
  },
  methods: {
    input () {
      this.status = null
    },
    submit () {
      var self = this
      this.userLoad(this.name).then(function (user) {
        self.status = null
        if (!user || !user.auth || !user['@id']) {
          return console.warn('weird, the profile is not complete')
        }
        self.$root.fetch(user['@id'], true)
        for (var i = 0; i < user.workspace.length; i++) {
          console.log(user.workspace[i])
          self.$root.fetch(user.workspace[i].url, true)
        }
        window.location.href = '#!' + user['@id']
      }).catch(function (error) {
        self.status = error.status
      })
    },
    add () {
      var self = this
      this.userAdd(this.name).then(function (response) {
        self.status = response.status
        self.feedback = response.status >= 400 ? 'Failed to create user' : null
        if (self.status < 400) {
          self.submit()
        }
      })
    },
    label (fragment) {
      return !fragment['rdfs:label'] ? false : typeof fragment['rdfs:label'] === 'string' ? fragment['rdfs:label'] : Array.isArray(fragment['rdfs:label']) ? fragment['rdfs:label'][0]['@value'] : fragment['rdfs:label']['@value']
    }
  },
  ready () {
    // console.log('recent', this.$route.path)
  }
}
</script>
