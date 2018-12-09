<template>
  <div class="container">
    <div
      class="projects"
    >
      <div
        v-for="(project, index) of projects"
        v-if="project.randomImage"
        :class="[
          $store.state.widthClasses[index%$store.state.widthClasses.length],
          project.randomImage.orientation,
        ]"
        :key="index"
        class="projects__block"
      >
        <nuxt-link
          ref="link"
          :to="{path: '/' + project.id }"
          :name="project.title"
          :class="{loaded: project.randomImage.load}"
          class="projects__block-img"
        >
          <img
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
    <!-- <div
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
          :class="{loaded: project.randomImage.load}"
          class="projects__block-img"
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
    </div> -->
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
      },
      loadCounter () {
        return _.filter(this.projects, { randomImage: { load: true } }).length
      }
    },
    created () {
      this.randomImage()
    },
    mounted () {
      this.$nextTick(() => {
        // this.setHeight()
        this.preloadImages()
      })
      window.addEventListener('resize', this.setHeight)
      const links = this.$refs.link
      if (links.length > this.loadCounter) {
        console.log()
        window.addEventListener('scroll',  this.scrollListener)
      }
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
      scrollListener: _.throttle( function () {
        this.preloadImages()
      }, 1500)
    }
  }
</script>

<style lang="sass" scoped>
  .projects
    @include center
    padding: $mp-d $mp-c/2 0 $mp-c/2
    display: grid
    grid-auto-flow: dense
    grid-template-columns: repeat(40, auto)
    grid-auto-rows: minmax(2.5vw, auto)
    grid-column-gap: $mp-c
    width: 100vw
    // width: calc(100vw + 30px)
    // margin-left: $mp-c/2 * -1
    &__block
      padding: $mp-c 0
      display: inline-block
      grid-column: span 14;
      grid-row: span auto;
      &-img
        will-change: contents, scroll-position
        &.loaded
          will-change: auto
      a
        display: block
      &.small.portrait
        grid-column: span 9
      &.medium.portrait
        grid-column: span 10
      &.large.portrait
        grid-column: span 11
      &.small.landscape, &.small.square
        grid-column: span 14
      &.medium.landscape, &.medium.square
        grid-column: span 16
      &.large.landscape, &.large.square
        grid-column: span 18
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
          grid-column: span 10
        &.medium.portrait
          grid-column: span 12
        &.large.portrait
          grid-column: span 13
        &.small.landscape, &.small.square
          grid-column: span 16
        &.medium.landscape, &.medium.square
          grid-column: span 18
        &.large.landscape, &.large.square
          grid-column: span 20

  @media (max-width: $tablet-pt)
    .projects
      display: block
      columns: 2
      column-gap: 0
      &__block
        &.small.portrait
          grid-column: span 20
        &.medium.portrait
          grid-column: span 20
        &.large.portrait
          grid-column: span 20
        &.small.landscape, &.small.square
          grid-column: span 20
        &.medium.landscape, &.medium.square
          grid-column: span 20
        &.large.landscape, &.large.square
          grid-column: span 20

    @media (max-width: $phone-ls)
      .projects
        width: calc(100vw - 15px)
        margin-bottom: $mp-a
        margin-left: 7.5px
        &__block
          padding: $mp-c/4
</style>

