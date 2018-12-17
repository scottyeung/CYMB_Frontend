<template>
  <div class="container project">
    <ProjectInfo
      :project="project"
      :next-project="nextProject"
      :prev-project="prevProject"
      :layouts="layouts"
    />
  </div>
</template>

<script>
  import ProjectInfo from '~/components/ProjectInfo'

  export default {
    name: "ProjectOverview",
    head() {
      return {
        titleTemplate: '%s: ' + this.project.content.title,
      }
    },
    components: {
      ProjectInfo
    },
    computed: {
      projects () {
        return this.$store.state.projects
      },
      project () {
        const self = this
        let proj = _.find(this.projects, function(e) { return e.slug === self.$route.params.project })
        return proj
      },
      layouts () {
        return this.project.content.layouts
      },
      nextProject () {
        let currentIndex = this.projects.indexOf(this.project)
        let nextIndex = currentIndex < this.projects.length - 1 ? currentIndex + 1 : 0
        return this.projects[nextIndex]
      },
      prevProject () {
        let currentIndex = this.projects.indexOf(this.project)
        let prevIndex = currentIndex > 0 ? currentIndex - 1 : this.projects.length - 1
        return this.projects[prevIndex]
      },
    },
    mounted () {
      document.addEventListener('keyup', this.keyListener)
    },
    destroyed () {
      document.removeEventListener('keyup', this.keyListener)
    },
    methods: {
      keyListener (key) {
        if (key.keyCode === 27) {
          this.$router.push({ path: '/' })
        }
      },
    }
  }
</script>

<style lang="sass">
  .project
    &__button
      position: fixed
      top: 0
      right: 0
      padding: 12px $mp-c/2
      z-index: 95
      cursor: pointer

</style>
