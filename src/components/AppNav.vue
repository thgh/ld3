<template>
  <form class="app-nav" @submit.prevent="submit">
    <a class="btn btn-soft" href="/">ld3</a>
    <input class="app-nav__input" v-model="search" type="text" :placeholder="placeholder" autofocus>
    <a class="btn btn-soft" href="/#!create">New</a>
  </form>
</template>

<script>
export default {
  data () {
    return {
      searchURI: null
    }
  },
  computed: {
    placeholder () {
      return this.$root.route && this.$root.route.uri || 'Search for data...'
    },
    search: {
      get () {
        return this.$root.route && this.$root.route.uri || null
      },
      set (v) {
        this.searchURI = v
        window.location.hash = '!' + v
      }
    }
  },
  methods: {
    submit () {
      window.location.hash = '!' + this.search
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables';

.app-nav {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: transform .3s;
  .btn {
    flex-basis: 70px;
    padding: 0 1rem;
    height: 48px;
    line-height: 48px;
    text-decoration: none;
  }
  .app--wide & {
    transform: translateY(10vh);
  }
}
.app-nav__input {
  flex: 0 1 50rem;
  border: 2px solid $bg;
  border-radius: 6px;
  padding: 0 1rem;
  height: 36px;
  background: none;
  color: transparentize($fg, .5);
  outline: none;
  &:focus {
    background: $bg;
  }
}
</style>