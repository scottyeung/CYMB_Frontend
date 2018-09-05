<template>
  <div class="projects__caption">
    <nuxt-link :to="project.id">
      <span>{{ projectTitle }}</span>
      <span class="nobr">{{ projectSecondary }}</span>
    </nuxt-link>
  </div>
</template>

<script>

export default {
	name: 'IndexCaption',
  props: ['project'],
  computed: {
    projectTitle () {
      return this.project.title
    },
    projectSecondary () {
      if(this.project.content.client.length > 0 && this.project.content.client !== this.project.title) {
        return ' for ' + this.project.content.client
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/variables.sass"

  .projects__caption
    @include center
    @include fs-s
    padding: 0
    span
      display: inline;

</style>

