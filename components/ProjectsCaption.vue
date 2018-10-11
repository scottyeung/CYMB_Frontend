<template>
  <nuxt-link class="projects__caption" :to="project.id">
    <span class="projects__title">{{ projectTitle }}</span>
    <span class="nobr italic">{{ projectSecondary }}</span>
  </nuxt-link>
</template>

<script>

export default {
	name: 'ProjectsCaption',
  props: ['project'],
  computed: {
    projectTitle () {
      return this.project.title
    },
    projectSecondary () {
      if(this.project.content.client && this.project.content.client !== this.project.title) {
        return this.project.content.client
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~/assets/sass/variables.sass"

  .projects__caption
    @include center()
    @include fs-s()
    padding: $mp-a/2 0 0 0
    span
      display: block;

</style>

