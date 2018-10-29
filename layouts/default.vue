<template>
  <nuxt/>
</template>

<style>
</style>

<script>
export default {
  head() {
    return {
      title: this.$store.state.siteInfo.title,
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.siteInfo.content.metadescription }
      ]
    }
  }
}
</script>


