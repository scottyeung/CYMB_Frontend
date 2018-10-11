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
          //{transparent: !layoutComplete},
          $store.state.widthClasses[index%$store.state.widthClasses.length],
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
                :style="{height: project.randomImage.height}"
              />
              <div
                class="projects__placeholder"
                :style="{height: project.randomImage.height}"
                slot="placeholder"
              ></div>
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
        this.projects.forEach(project => {
          // Choose random image
          let randomImage = _.sample(project.content.cover)
          this.$set(project, 'randomImage', randomImage)

          // Match with original image
          const ogImage = _.find(project.images, function(img) {
            return img.id === project.randomImage.id
          })

          // Set ratio and orientation
          if(ogImage) {
            this.$set(project.randomImage, 'orientation', ogImage.dimensions.orientation)
            this.$set(project.randomImage, 'ratio', ogImage.dimensions.ratio)
          }
        })
      }
    },
    showLayout (bool) {
      this.layoutComplete = bool
      // setTimeout( () => this.layoutComplete = bool, 150);
    },
    setHeight () {
      const images = this.$refs.image
      this.projects.forEach((project, index) => {
        const img = images[index].$el
        const ratio = project.randomImage.ratio
        const height = (img.clientWidth / ratio) + 'px'
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
    window.addEventListener('resize', _.debounce(this.setHeight), 300)
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

