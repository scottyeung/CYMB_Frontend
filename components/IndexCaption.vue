<template>
  <div
    :class="color"
    class="index__caption"
  >
    <nuxt-link :to="project">{{ projectTitle }}</nuxt-link>
  </div>
</template>

<script>

export default {
	name: 'IndexCaption',
  props: ['color', 'project'],
  computed: {
    projectTitle () {
      const self = this
      let proj = _.find(this.$store.state.projects.data, function(e) { return e.id === self.project })
      let title = proj ? proj.title : ''
      return title
    }
  }
}
</script>

<style lang="sass" scoped>
  .index__caption
    position: fixed
    bottom: 0
    width: 100%
    @include center
    padding: $mp-b*1.5 $mp-b
    &.white
      @include white


</style>

