<template>
  <div
    class="app-left"
    @mouseenter="$root.show.appLeft = $root.show.appLeft || 1"
  >
    <a class="btn btn-soft" href="#!create" @mouseenter="$root.show.appLeft = 1">New</a>
    <a class="btn btn-soft" href="#!create" @mouseenter="$root.show.appLeft = 2">Recent</a>
    <div class="app-left-nested" v-if="$root.show.appLeft === 2">
      <nav class="nav-content">
        <recent-fragments class="nav-fixwidth" />
      </nav>
    </div>
    <div class="app-left-nested" v-if="$root.show.appLeft === 1">
      <div class="app-left__btns">
        <button type="button" class="btn-type fragment-type" @click="createByType('Address')">Address</button>
        <button type="button" class="btn-type fragment-type" @click="createByType('Invoice')">Invoice</button>
        <button type="button" class="btn-type fragment-type" @click="createByType('LocalBusiness')">LocalBusiness</button>
        <button type="button" class="btn-type fragment-type" @click="createByType('Person')">Person</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    createByType () {
      const id = '_:' + Math.random().toString(36).slice(2)
      this.$root.setFragment({
        '@type': null,
        '@id': id,
        'schema:name': null,
        'schema:description': null,
        'schema:url': null
      })
      window.location.hash = '!' + id
    }
  }
}
</script>

<style lang="scss">
.app-left {
  position: absolute;
  top: 48px;
  right: calc(400px + 50vw);
  >.btn {
    display: block;
    text-align: right;
    padding: .5rem .5rem .5rem 0;
    &:first-child {
      padding-top: 1rem;
    }
    &:last-child {
      padding-bottom: 1rem;
    }
  }
}
.app-left-nested {
  position: absolute;
  top: 0;
  left: 100%;
  width: 16rem;
}
.app-left__btns {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 13px;
  .btn-type {
    border: 0;
    color: white;
    margin: 0 0 .5em;
    font: inherit;
    font-size: 18px;
    line-height: 1.4em;
    font-weight: 400;
  }
}
</style>
