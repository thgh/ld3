<template>
  <main>
    <section class="section section-browser">
      <p>
        <a href="#!home">home</a>
        <a href="#!conf">config</a>
        <a href="#!dataset/wut">dataset/wut</a>
        <a href="#!projects:dekastart">projects:dekastart</a>

      </p>
      <recent-fragments :list="fragmentCache" :route="route"></recent-fragments>
      <p>
      {{blub}}
      </p>

    </section>
    <section class="section section-editor">
    <h1>conf</h1>
    </section>
  </main>
</template>

<script>
export default {
  components: {
  },
  ready () {
    console.log('conf', this)
  }
}
</script>

<style lang="scss">
</style>
