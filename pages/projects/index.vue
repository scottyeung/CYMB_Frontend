<template>
  <div class="container">
    <Menu></Menu>
    <no-ssr>
      <div 
      v-packery='{
        itemSelector: ".projects__block", 
        percentPosition: true, 
        transitionDuration: 0,
        originTop: true,
        originRight: true
      }' 
      class="projects" 
      @layoutComplete="showLayout()"
      >
        <div 
        v-packery-item
        class="projects__block" 
        :class="[
          widthClasses[index%widthClasses.length], 
          project.orientation, {transparent: !loaded} 
        ]" 
        v-for="(project, index) of projects">
          <nuxt-link :to="{path: '/' + project.id }">
          <img 
            v-if="project.randomImage"
            class="projects__img" 
            :src="project.randomImage.url"
          ></img>
          </nuxt-link>
          <ProjectsCaption :project="project"></ProjectsCaption>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import Menu from '~/components/Menu.vue'
import ProjectsCaption from '~/components/ProjectsCaption.vue'

export default {
  name: 'Projects',
  components: {
    Menu,
    ProjectsCaption
  },
  data () {
    return {
      widthClasses: ['small', 'small', 'medium', 'large'],
      loaded: false,
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
    },
    randomImage () {
      if(process.browser) { 
        const self = this
        for(let i = 0; i < self.projects.length; i++) {

          // Choose random image
          let randomImage = _.sample(self.projects[i].content.cover)
          self.$set(self.projects[i], 'randomImage', randomImage)

          // Load image
          const newImage = new Image()
          newImage.src = randomImage.url

          // Get orientation
          newImage.onload = function() {
            let orientation = ''
            orientation = newImage.naturalWidth >= newImage.naturalHeight ? 'landscape' : orientation
            orientation = newImage.naturalWidth < newImage.naturalHeight ? 'portrait' : orientation
            self.$set(self.projects[i], 'orientation', orientation)
          }
        }
      }
    },
    showLayout () {
      setTimeout(
        () => this.loaded = true
      , 300);
    }
  },
  created () {
    this.randomImage ()
    this.shuffleClasses ()
  }
}
</script>

<style lang="sass">
@import "../../assets/sass/variables.sass"

.projects
  @include center
  padding: $mp-c*2 0
  display: flex
  align-items: flex-end
  justify-content: center
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

