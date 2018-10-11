<template>
  <div class="container project">
    <ProjectInfo
      :project="project"
      :nextProject="nextProject"
      :prevProject="prevProject"
      :layouts="layouts"
    />
    <a class="project__button" @click="setInfo(true)">&#215;</a>
    <ProjectSlider
      :layouts="layouts"
    />
  </div>
</template>

<script>
  import ProjectInfo from '~/components/ProjectInfo'
  import ProjectSlider from '~/components/ProjectSlider'
  import { mapMutations } from 'vuex'


  export default {
    name: "Project",
    components: {
      ProjectSlider,
      ProjectInfo
    },
    // async asyncData ({ params, app }) {
    //   let { data } = await app.$axios.get(
    //     '/pages/projects+' + params.project + '/files'
    //   )
    //   return { images: data }
    // },
    computed: {
      project () {
        const self = this
        let proj = _.find(this.$store.state.projects.data, function(e) { return e.slug === self.$route.params.project })
        return proj
      },
      images () {
        return this.project.images
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
    methods: {
      ...mapMutations([
        'setInfo'
      ]),
    },
    created () {
      this.setInfo (true)
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
