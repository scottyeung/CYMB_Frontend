<template>
  <div class="container project">

    <ProjectSlider :layouts="this.project.content.layouts" :images="images" @layoutsChanged="changeLayouts"></ProjectSlider>

    <!-- <div class="project__minislider">
      <div class="project__minislider--w">
        <div class="project__minislide" v-for="(layout, index) in layouts" :key="index">
          <div class="project__minislide--inner" :class="layout.sizing">
            <div class="project__minislide--img" v-if="layout.image1" :class="[layout.sizing, {'solo': !layout.image2}]">
              <div :style="{backgroundImage: 'url(' + findImage(layout.image1) + ')'}"></div>
            </div>
            <div class="project__minislide--img" v-if="layout.image2" :class="[layout.sizing, {'solo': !layout.image2}]">
              <div :style="{backgroundImage: 'url(' + findImage(layout.image2) + ')'}"></div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
  import axios from '~/node_modules/axios'
  import ProjectSlider from '~/components/ProjectSlider'

  export default {
    name: "Project",
    components: {
      ProjectSlider
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
          padding: 8px 12px 8px 6px

</style>