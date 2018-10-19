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
    name: "Project",
    components: {
      ProjectInfo
    },
    computed: {
      project () {
        const self = this
        let proj = _.find(this.$store.state.projects.data, function(e) { return e.slug === self.$route.params.project })
        return proj
      },
      layouts () {
        return this.project.content.layouts
      },
      nextProject () {
        let projects = this.$store.state.projects.data
        let currentIndex = projects.indexOf(this.project)
        let nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0
        return projects[nextIndex]
      },
      prevProject () {
        let projects = this.$store.state.projects.data
        let currentIndex = projects.indexOf(this.project)
        let prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1
        return projects[prevIndex]
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
          this.$router.push({ path: '/projects' })
        }
      },
    },
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
