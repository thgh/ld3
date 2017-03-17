<template>
  <section class="section-content">
  	<h1>Create a new fragment</h1>
    <p>
      <button type="button" class="btn" @click="createByType('Address')">Address</button>
      <button type="button" class="btn" @click="createByType('Invoice')">Invoice</button>
      <button type="button" class="btn" @click="createByType('LocalBusiness')">LocalBusiness</button>
      <button type="button" class="btn" @click="createByType('Person')">Person</button>
    </p>
  </section>
</template>

<script>
export default {
  data () {
    return {
      fragmentURI: null,
      fragmentName: null
    }
  },
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
