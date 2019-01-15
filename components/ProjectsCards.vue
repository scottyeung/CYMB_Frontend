<template>
  <div class="container">
    <div
      v-packery="layoutOptions"
      ref="packery"
      class="projects"
      @layoutComplete="preloadImages()"
    >
      <div
        v-packery-item
        v-for="(project, index) of projects"
        v-if="project.randomImage"
        :class="[
          $store.state.widthClasses[index%$store.state.widthClasses.length],
          project.randomImage.orientation
        ]"
        :key="index"
        class="projects__block"
      >
        <nuxt-link
          ref="link"
          :to="{path: '/' + project.id }"
          :name="project.content.title"
          :style="{height: project.randomImage.height}"
          class="projects__block-img"
        >
          <img
            v-if="'load' in project.randomImage && 'height' in project.randomImage"
            ref="image"
            :alt="project.content.title"
            :src="project.randomImage.url"
            :srcset="getSrcSet(project.randomImage)"
            class="projects__img"
          >
        </nuxt-link>
        <ProjectsCaption
          v-if="'height' in project.randomImage"
          ref="caption"
          :project="project"
        />
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
      },
      loadCounter () {
        return _.filter(this.projects, { randomImage: { load: true } }).length
      }
    },
    created () {
      this.randomImage()
    },
    mounted () {
      window.addEventListener('resize', this.resizeListener)
      const links = this.$refs.link
      if (links.length > this.loadCounter) {
        window.addEventListener('scroll',  this.scrollListener)
      }
    },
    destroyed () {
      window.removeEventListener('resize', this.resizeListener)
      window.removeEventListener('scroll', this.scrollListener)
    },
    methods: {
      randomImage () {
        if(process.browser && !this.$store.state.projects[0].randomImage) {
          this.projects.forEach( async (project, index) => {

            // Choose random image
            let randomImage = project.content.cover[0]
            await this.$set(project, 'randomImage', randomImage)
            this.setHeight(project.randomImage, index)
          })
        }
      },
      getSrcSet (img) {
        return img.small + ' 600w, ' + img.medium + ' 900w, ' + img.large + ' 1200w, ' + img.url + ' ' + img.width + 'w'
      },
      setHeight (randomImage, index) {
        const links = this.$refs.link
        if (links) {
          const link = links[index].$el
          const width = link.offsetWidth
          const ratio = randomImage.ratio
          const height = (width / ratio) + 'px'
          this.$set(this.projects[index].randomImage, 'height', height)
        }
      },
      preloadImages () {
        const links = this.$refs.link

        // Remove scrollListener after all images are loaded
        if(this.loadCounter === links.length) {

          window.removeEventListener('scroll', this.scrollListener)

        } else if (links.length > this.loadCounter) {

          this.projects.forEach((project, index) => {
            if (!('load' in project.randomImage)) {
              const link = links[index].$el
              const boundingBox = link.getBoundingClientRect()
              if (boundingBox.height > 0) {
                const top = parseFloat(boundingBox.top)
                const bottom = parseFloat(boundingBox.bottom)
                if (top <= window.innerHeight * 2 && bottom >= window.innerHeight * - 1) {
                  this.$set(project.randomImage, 'load', true)
                }
              }
            }
          })

        }
      },
      resizeListener () {
        this.projects.forEach( (project, index) => {
          this.setHeight(project.randomImage, index)
        })
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
      display: block
      vertical-align: bottom
      width: 30%
      &-img
        will-change: contents, scroll-position
        &.loaded
          will-change: auto
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

