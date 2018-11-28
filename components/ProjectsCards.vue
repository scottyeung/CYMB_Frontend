<template>
  <div class="container">
    <div
      v-packery="layoutOptions"
      ref="packery"
      class="projects"
      @layoutComplete="preloadImages(), showImages(true)"
    >
      <div
        v-packery-item
        v-for="(project, index) of projects"
        v-if="project.randomImage"
        :class="[
          $store.state.widthClasses[index%$store.state.widthClasses.length],
          project.randomImage.orientation,
          {visible: visible}
        ]"
        :key="index"
        class="projects__block"
      >
        <nuxt-link
          ref="link"
          :to="{path: '/' + project.id }"
          :name="project.title"
          :style="{height: project.randomImage.height}"
        >
          <img
            v-if="project.randomImage.load"
            ref="image"
            :alt="project.title"
            :src="project.randomImage.url"
            :srcset="getSrcSet(project.randomImage)"
            class="projects__img"
          >
        </nuxt-link>
        <ProjectsCaption ref="caption" :project="project"/>
      </div>
    </div>
  </div>
</template>

<script>
  import ProjectsCaption from '~/components/ProjectsCaption.vue'

  export default {
    name: 'ProjectsCards',
    components: {
      ProjectsCaption,
    },
    data () {
      return {
        visible: false,
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
        return this.$store.state.projects
      }
    },
    created () {
      this.randomImage()
    },
    mounted () {
      this.$nextTick(() => {
        this.setHeight()
      })
      window.addEventListener('resize', this.setHeight)
      window.addEventListener('scroll',  this.scrollListener)
    },
    destroyed () {
      window.removeEventListener('resize', this.setHeight)
      window.removeEventListener('scroll', this.scrollListener)
    },
    methods: {
      randomImage () {
        if(process.browser && !this.$store.state.projects[0].randomImage) {
          this.projects.forEach(project => {

            // Choose random image
            let randomImage = _.sample(project.content.cover)
            this.$set(project, 'randomImage', randomImage)

            // Match with original image
            if(randomImage) {
              const ogImage = _.find(project.images, function(img) {
                return img.id === project.randomImage.id
              })

              // Set ratio, orientation, width and sizes
              this.$set(project.randomImage, 'orientation', ogImage.dimensions.orientation)
              this.$set(project.randomImage, 'ratio', ogImage.dimensions.ratio)
              this.$set(project.randomImage, 'width', ogImage.dimensions.width)
              this.$set(project.randomImage, 'medium', ogImage.medium)
              this.$set(project.randomImage, 'small', ogImage.small)
            }
          })
        }
      },
      getSrcSet (img) {
        return img.small + ' 600w, ' + img.medium + ' 900w, ' + img.large + ' 1200w, ' + img.url + ' ' + img.width + 'w'
      },
      setHeight () {
        const links = this.$refs.link
        if (links.length > 0) {
          this.projects.forEach((project, index) => {
            const link = links[index].$el
            const width = link.offsetWidth
            const ratio = project.randomImage.ratio
            const height = (width / ratio) + 'px'
            this.$set(project.randomImage, 'height', height)
          })
        }
      },
      showImages (boolean) {
        this.visible = boolean
      },
      preloadImages () {
        const links = this.$refs.link
        if (links.length > 0) {
          this.projects.forEach((project, index) => {
            if (index in links) {
              const link = links[index].$el
              const boundingBox = link.getBoundingClientRect()
              if (boundingBox.height > 0) {
                const top = parseFloat(boundingBox.top)
                const bottom = boundingBox.bottom
                if (top <= window.innerHeight * 2 && bottom >= window.innerHeight * - 1) {
                  this.$set(project.randomImage, 'load', true)
                }
              }
            }
          })
        }
      },
      scrollListener: _.throttle( function () {
        this.preloadImages()
      }, 500)
    }
  }
</script>

<style lang="sass" scoped>
  .projects
    @include center
    padding: $mp-d 0 0 0
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
      opacity: 0
      &.visible
        opacity: 1
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
    &__img
      width: 100%
      vertical-align: top
      &__wrapper
        display: block

  @media (max-width: $tablet-ls)
    .projects
      width: calc(100vw + 10px)
      margin-left: -5px
      &__block
        padding: $mp-b
        &.small.portrait
          width: 25%
        &.medium.portrait
          width: 30%
        &.large.portrait
          width: 32.5%
        &.small.landscape, &.small.square
          width: 40%
        &.medium.landscape, &.medium.square
          width: 45%
        &.large.landscape, &.large.square
          width: 50%

  @media (max-width: $tablet-pt)
    .projects
      &__block
        &.small.portrait
          width: 50%
        &.medium.portrait
          width: 50%
        &.large.portrait
          width: 50%
        &.small.landscape, &.small.square
          width: 50%
        &.medium.landscape, &.medium.square
          width: 50%
        &.large.landscape, &.large.square
          width: 50%

    @media (max-width: $phone-ls)
      .projects
        width: calc(100vw - 15px)
        margin-bottom: $mp-a
        margin-left: 7.5px
        &__block
          padding: $mp-c/4
</style>

