<template>
  <div class="container project">
    <nuxt-link class="project__button" to="overview">&#215;</nuxt-link>
    <ProjectSlider
      :layouts="layouts"
    />
  </div>
</template>

<script>
  import ProjectSlider from '~/components/ProjectSlider'

  export default {
    name: "Project",
    components: {
      ProjectSlider
    },
    computed: {
      project () {
        const self = this
        let proj = _.find(this.$store.state.projects.data, function(e) { return e.slug === self.$route.params.project })
        return proj
      },
      layouts () {
        return this.project.content.layouts
      }
    }
  }
</script>

<style lang="sass">
@import "~/assets/sass/variables.sass"

.project
  &__button
    position: fixed
    top: 0
    right: 0
    padding: 12px $mp-c/2
    z-index: 95
    cursor: pointer

</style>
