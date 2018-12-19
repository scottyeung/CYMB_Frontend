<template>
  <div class="container project">
    <div class="project__text">
      <span class="project__caption">{{ loopLayouts[$store.state.currentSlide].caption }}</span>
      <nuxt-link class="project__close" to="overview">Close</nuxt-link>
    </div>
    <ProjectSlider
      :layouts="layouts"
      :loop-layouts="loopLayouts"
    />
  </div>
</template>

<script>
  import ProjectSlider from '~/components/ProjectSlider'

  export default {
    name: "ProjectImages",
    head() {
      return {
        titleTemplate: '%s: ' + this.project.content.title,
      }
    },
    components: {
      ProjectSlider
    },
    computed: {
      project () {
        const self = this
        let proj = _.find(this.$store.state.projects, function(e) { return e.slug === self.$route.params.project })
        return proj
      },
      layouts () {
        return this.project.content.layouts
      },
      loopLayouts () {
        const first = this.layouts[0]
        const loopLayouts = this.layouts.concat(first)
        return loopLayouts
      },
    }
  }
</script>

<style lang="sass" scoped>
  .project
    &__text
      display: flex
      position: fixed
      top: 0
      right: 0
      padding: $mp-a $mp-c/2
      z-index: 95
    &__close
      cursor: pointer
    &__caption
      margin-right: $mp-c

  @media (max-width: $phone-pt)
    .project
      &__text
        width: 100%
      &__close
        margin-left: auto

</style>
