<template>
  <div class="container">
    <Menu></Menu>
    <no-ssr>
      <div
      v-packery='layoutOptions'
      class="projects"
      ref="packery"
      @layoutComplete="showLayout(true)"
      >
        <div
        v-packery-item
        class="projects__block"
        :class="[
          {transparent: !layoutComplete},
          $store.state.widthClasses[index%$store.state.widthClasses.length],
          $store.state.alignClasses[index%$store.state.alignClasses.length],
          project.randomImage.orientation
        ]"
        v-for="(project, index) of projects"
        :key="index"
        >
          <nuxt-link :to="{path: '/' + project.id }">
            <clazy-load
              :src="project.randomImage.url"
              class="projects__img__wrapper"
              ref="image"
              margin="100%"
            >
              <img
                v-if="project.randomImage"
                class="projects__img"
                :src="project.randomImage.url"
              />
              <div class="projects__placeholder" :style="{height: project.randomImage.height}" slot="placeholder"></div>
            </clazy-load>
          </nuxt-link>
          <ProjectsCaption ref="caption" :project="project"></ProjectsCaption>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>
<script>
import ProjectsCaption from '~/components/ProjectsCaption.vue'

export default {
  name: 'ProjectsCards',
  components: {
    ProjectsCaption,
  },
  data () {
    return {
      layoutComplete: false,
      layoutOptions: {
        initLayout: true,
        itemSelector: ".projects__block",
        percentPosition: true,
        transitionDuration: 0,
        originTop: true,
        originLeft: true
      }
    }
  },
  computed: {
    projects () {
      return this.$store.state.projects.data
    }
  },
  methods: {
    randomImage () {
      if(process.browser && !this.$store.state.projects.data[0].randomImage) {
        const self = this
        this.projects.forEach((project, index) => {
          // Choose random image
          let randomImage = _.sample(project.content.cover)
          this.$set(project, 'randomImage', randomImage)

          // Find original image
          const ogImage = _.find(project.images, function(img) {
            return img.id === randomImage.id
          })

          // Set ratio and orientation
          if(ogImage) {
            self.$set(project.randomImage, 'orientation', ogImage.dimensions.orientation)
            self.$set(project.randomImage, 'ratio', ogImage.dimensions.ratio)
          }

          // new Image()
          // newImage.src = randomImage.url

          // Get orientation
          // newImage.onload = async function() {
          //   let orientation = ''
          //   let ratio = null
          //   orientation = await newImage.naturalWidth >= newImage.naturalHeight ? 'landscape' : orientation
          //   orientation = await newImage.naturalWidth < newImage.naturalHeight ? 'portrait' : orientation
          //   ratio = await newImage.naturalHeight / newImage.naturalWidth
          //   self.$set(project.randomImage, 'orientation', orientation)
          //   self.$set(project.randomImage, 'ratio', ratio)
          // }
        })
      }
    },
    showLayout (bool) {
      this.layoutComplete = bool
      // setTimeout( () => this.layoutComplete = bool, 150);
    },
    setHeight () {
      const images = this.$refs.image
      console.log(images)
      this.projects.forEach((project, index) => {
        console.log(index)
        const img = images[index].$el
        const ratio = project.randomImage.ratio
        const height = (img.clientWidth / ratio) + 'px'
        console.log(img, ratio)
        this.$set(project.randomImage, 'height', height)
      })
    }
  },
  created () {
    this.randomImage ()
  },
  mounted () {
    this.$nextTick(function () {
      this.setHeight()
    }),
    window.addEventListener('resize', this.setHeight)
  },
  destroyed () {
    window.removeEventListener('resize', this.setHeight)
  }
}
</script>

<style lang="sass">
@import "~/assets/sass/variables.sass"

.projects
  @include center
  padding: $mp-d 0
  display: flex
  align-items: flex-end
  justify-content: flex-start
  flex-wrap: wrap
  width: 100vw
  width: calc(100vw + 30px)
  margin-left: $mp-c/2 * -1
  &__block
    padding: $mp-c
    display: inline-block
    vertical-align: bottom
    width: 30%
    a
      display: block
    &.small.portrait
      width: 22.5%
    &.medium.portrait
      width: 25%
    &.large.portrait
      width: 27.5%
    &.small.landscape, &.small.square
      width: 35%
    &.medium.landscape, &.medium.square
      width: 40%
    &.large.landscape, &.large.square
      width: 45%
    &.flexStart
      align-self: flex-start
    &.flexEnd
      align-self: flex-end
  &__img
    width: 100%
    vertical-align: top
    &__wrapper
      display: block;

</style>

