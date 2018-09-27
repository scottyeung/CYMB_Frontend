<template>
  <div class="container project">
    <ProjectMenu
      :project="project"  
    />
    <ProjectSlider 
      :layouts="layouts" 
      :images="images"
    />
  </div>
</template>

<script>
  import axios from '~/node_modules/axios'
  import ProjectSlider from '~/components/ProjectSlider'
  import ProjectMenu from '~/components/ProjectMenu'

  export default {
    name: "Project",
    components: {
      ProjectSlider,
      ProjectMenu
    },
    data () {
      return {
        number: 0,
        showInfo: true,
        scrollPosition: 0
      }
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
      }
    }
  }
</script>

<style lang="sass">
@import "../../../assets/sass/variables.sass"


</style>