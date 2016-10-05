<template>
  <div class="modal">
    <div class="modal-body" :class="{'modal-nudge':status}">
      <form class="auth" @submit.prevent="submit">
        <label class="inp-text inp-auth" :class="{'inp-error':status}" @input="input">
          <div class="inp-label">Fill in your username:</div>
          <input class="inp-big-focus" v-model="name" placeholder=". . . . . . . . . .">
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
// .modal: transition=modal
export default {
  name: 'modal-auth',
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
      this.$root.userFetch(this.name).then(function (user) {
        self.status = null
        if (!user || !user.auth || !user['@id']) {
          return console.warn('weird, the profile is not complete')
        }
        self.$root.userLoad()
        window.location.href = '#!' + user['@id']
      }).catch(function (error) {
        self.status = error.status
      })
    },
    add () {
      var self = this
      this.$root.userAdd(this.name).then(function (response) {
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
  mounted () {
    // console.log('recent', this.$route.path)
  }
}
</script>
