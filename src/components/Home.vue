<template>
  <section class="section-content section-intro">
    <div class="hero">
      <h1>ld3: Linked Data Driven Documents</h1>
      <p>
        This is a proof of concept for a generic Linked Data editor interface.
      </p>
    </div>
    <p>
      Login to save your workspace, it's optional.
    </p>
    <p v-if="$root.auth">
      <button type="button" class="btn" @click="$root.user['@id']='ld3:no-user'">Logout</button>
    </p>
    <p v-else>
      <button type="button" class="btn" @click="$root.userLogout()">Login</button>
    </p>
  </section>
</template>

<script>
export default {

}
</script>
