<template>
  <div class="container project">

    <ProjectSlider :layouts="this.project.content.layouts" :images="images" @layoutsChanged="changeLayouts"></ProjectSlider>
    <ProjectScroll :layouts="this.project.content.layouts" :images="images" @layoutsChanged="changeLayouts"></ProjectScroll>

  </div>
</template>

<script>
  import axios from '~/node_modules/axios'
  import ProjectSlider from '~/components/ProjectSlider'
  import ProjectScroll from '~/components/ProjectScroll'

  export default {
    name: "Project",
    components: {
      ProjectSlider,
      ProjectScroll
    },
    data () {
      return {

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
      layouts: {
        get: function() {
          return this.project.content.layouts
        },
        set: function(newLayouts) {
          this.project.content.layouts = newLayouts
        }
      }
    },
    methods: {
      findImage (id) {
        const self = this
        let img = _.find(this.images.data, function(e) { return e.id === id })
        return img.url
      },
      changeLayouts (layouts) {
        console.log(layouts)
        this.layouts= layouts
      }
    }
  }
</script>

<style lang="sass">
@import "../../../assets/sass/variables.sass"

.project
  height: 100vh

  &__minislider
    height: 75px
    width: 100%
    position: fixed
    z-index: 99
    bottom: 0
    margin: $mp-a 0
    &--w
      width: 1500px
      height: 100%
  &__minislide
    width: 150px
    height: 100%
    display: inline-block
    &--inner
      display: flex
      align-items: center
      justify-content: space-evenly
      flex-wrap: wrap
      width: 100%
      height: 100%
    &--img
      height: 100%
      width: 50%
      div
        height: 100%
        width: 100%;
        background-size: contain
        background-repeat: no-repeat
      &:first-child div
        background-position: center right
      &:nth-child(2) div
        background-position: center left
      &.solo
        width: 100%
        div
          background-position: center
      &.large
        &:first-child
          padding: 8px 6px 8px 6px
        &:nth-child(2)
          padding: 8px 6px 8px 6px

</style>