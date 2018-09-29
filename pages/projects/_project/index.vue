<template>
  <div class="container project">
    <ProjectInfo
      :project="project"
      :nextProject="nextProject"
      :prevProject="prevProject"
      :layouts="layouts"
    />
    <ProjectSlider 
      :layouts="layouts" 
    />
  </div>
</template>

<script>
  import axios from '~/node_modules/axios'
  import ProjectInfo from '~/components/ProjectInfo'
  import ProjectSlider from '~/components/ProjectSlider'

  export default {
    name: "Project",
    components: {
      ProjectSlider,
      ProjectInfo
    },
    async asyncData ({ params }) {
      let { data } = await axios.get(
        'http://127.0.0.1:8888/rest/pages/projects+' + params.project + '/files'
      )
      return { images: data }
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
    }
  }
</script>

<style lang="sass">
@import "../../../assets/sass/variables.sass"


</style>