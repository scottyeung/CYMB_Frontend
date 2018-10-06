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
      @layoutComplete="saveLayout(), showLayout(true)"
      >
        <div
        v-packery-item
        class="projects__block stamp"
        ref="image"
        :class="[
          widthClasses[index%widthClasses.length],
          alignClasses[index%alignClasses.length],
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
      widthClasses: ['small', 'small', 'medium', 'large'],
      alignClasses: ['flex-start', 'flex-start', 'center', 'flex-end'],
      layoutComplete: false
    }
  },
  computed: {
    projects () {
      return this.$store.state.projects.data
    }
  },
  methods: {
    shuffleClasses () {
      this.widthClasses = _.shuffle(this.widthClasses)
      this.alignClasses = _.shuffle(this.alignClasses)
    },
    randomImage () {
      if(process.browser) {
        const self = this
        this.projects.forEach(project => {
        // for(let i = 0; i < self.projects.length; i++) {
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
    saveLayout () {
      const images = this.$refs.image
      console.log(images)
      console.log(images.length)
      images.forEach(image => {
        const left = image.style.left
        const top = image.style.top
        console.log(top)
        console.log(left)
      })
    },
    showLayout (bool) {
      setTimeout(
        () => this.layoutComplete = bool
      , 200);
    }
  },
  created () {
    this.randomImage ()
    this.shuffleClasses ()
  },
  mounted () {
    // packeryEvents.$emit('layout', this.$refs.packery)
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
    width: 37.5%
    &.small, &.portrait
      width: 22.5%
    &.medium.portrait
      width: 25%
    &.large.portrait
      width: 30%
    &.small.landscape, &.small.square
      width: 30%
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

