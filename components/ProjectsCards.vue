<template>
  <div class="container">
    <Menu></Menu>
    <no-ssr>
      <div
      v-packery='{
        initLayout: true,
        itemSelector: ".projects__block",
        percentPosition: true,
        transitionDuration: 0,
        originTop: true,
        originLeft: true
      }'
      class="projects"
      ref="packery"
      @layoutComplete="showLayout(true)"
      >
        <div
        v-packery-item
        class="projects__block"
        ref="image"
        :class="[
          {transparent: !layoutComplete},
          $store.state.widthClasses[index%$store.state.widthClasses.length],
          $store.state.alignClasses[index%$store.state.alignClasses.length],
          project.orientation
        ]"
        v-for="(project, index) of projects"
        :key="index"
        >
          <nuxt-link :to="{path: '/' + project.id }">
          <img
            v-if="project.randomImage"
            class="projects__img"
            :src="project.randomImage.url"
          />
          </nuxt-link>
          <ProjectsCaption :project="project"></ProjectsCaption>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import ProjectsCaption from '~/components/ProjectsCaption.vue'

export default {
  name: 'ProjectsCards',
  components: {
    ProjectsCaption
  },
  data () {
    return {
      layoutComplete: false
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
        this.projects.forEach(project => {
          // Choose random image
          let randomImage = _.sample(project.content.cover)
          this.$set(project, 'randomImage', randomImage)

          // Load image
          const newImage = new Image()
          newImage.src = randomImage.url

          // Get orientation
          newImage.onload = function() {
            let orientation = ''
            orientation = newImage.naturalWidth >= newImage.naturalHeight ? 'landscape' : orientation
            orientation = newImage.naturalWidth < newImage.naturalHeight ? 'portrait' : orientation
            self.$set(project, 'orientation', orientation)
          }
        })
      }
    },
    showLayout (bool) {
      setTimeout( () => this.layoutComplete = bool, 150);
    }
  },
  created () {
    this.randomImage ()
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

</style>

