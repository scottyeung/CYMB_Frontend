<template>
  <div class="container project">
    <ProjectMenu
      :project="project"  
    />
<!--     <nuxt-link to="/projects" class="project__close">Close</nuxt-link>
 -->
    <!-- <ProjectInfo
      :project="project"
      :showInfo="showInfo"
      @infoChanged="changeInfo"
    /> -->
    <ProjectSlider 
      :layouts="layouts" 
      :images="images"
      :number="number"
      @numberChanged="changeNumber"
    />
    <!-- <ProjectScroll 
      :layouts="layouts" 
      :images="images"
      :number="number"
      :scrollPosition="scrollPosition" 
      @numberChanged="changeNumber"
      @infoChanged="changeInfo"
      @scrollChanged="changeScroll"
      />
 -->
  </div>
</template>

<script>
  import axios from '~/node_modules/axios'
  import ProjectSlider from '~/components/ProjectSlider'
  import ProjectScroll from '~/components/ProjectScroll'
  import ProjectInfo from '~/components/ProjectInfo'
  import ProjectMenu from '~/components/ProjectMenu'

  export default {
    name: "Project",
    components: {
      ProjectSlider,
      ProjectScroll,
      ProjectInfo,
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
      let { data } = await axios.get('http://127.0.0.1:8888/rest/pages/projects+' + params.project + '/files')
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
    },
    methods: {
      findImage (id) {
        const self = this
        let img = _.find(this.images.data, function(e) { return e.id === id })
        return img.url
      },
      changeLayouts (layouts) {
        this.layouts = layouts
      },
      changeNumber (number) {
        this.number = number
        this.scrollPosition = 0
      },
      changeInfo (boolean) {
        this.showInfo = boolean
      },
      changeScroll (number) {
        this.scrollPosition = number
      }
    }
  }
</script>

<style lang="sass">
@import "../../../assets/sass/variables.sass"

.project
  user-select: none
  &__close
    position: fixed
    bottom: 10vh
    right: 0
    z-index: 99
    height: 50px
    width: 50px
    display: flex
    align-items: center
    justify-content: center
    margin: $mp-b
    background: $grey
    border-radius: 50%;
    @include fs-s()
    line-height: 1
    transform: rotate(20deg)
  

</style>