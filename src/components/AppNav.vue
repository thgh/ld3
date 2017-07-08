<template>
  <form class="app-nav" @submit.prevent="submit">
    <div class="nav-left">
      <a class="btn btn-soft" href="#">ld3</a>
    </div>
    <div class="nav-center">
      <input class="app-nav__input" v-model="search" type="text" :placeholder="placeholder" autofocus autocomplete autosave>
    </div>
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
  position: relative;
  min-height: $navHeight;
  margin: 0 auto;
  transition: transform .3s;
  .btn {
    flex-basis: 70px;
    padding: 0 1rem;
    min-height: $navHeight;
    line-height: $navHeight;
    text-decoration: none;
  }
}
.app-nav__input {
  width: 100%;
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

.nav-left {
  position: absolute;
  top: 0;
  height: 100%;
  right: calc(400px + 50vw);
  >.btn {
    display: block;
  }
}
.nav-center {
  margin: 0 auto;
  padding-top: 6px;
  max-width: 800px;
  >.btn {
    display: block;
  }
}
</style>