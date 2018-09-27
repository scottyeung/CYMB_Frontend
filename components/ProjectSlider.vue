<template>
  <div class="project__slider">
    <!-- <div class="project__next" @click="next(1)"/> -->
<!--     <div class="project__prev" @click="prev(2)"/> -->
    <a @click="scrollToNext(index)" v-for="(layout, index) in layouts">
      <div class="project__slide" :id="index" ref="slide">
        <div 
          class="project__slide--inner"
          :class="{'triple': layout.images.length === 3}"
        >
          <div 
            v-for="image in layout.images"
            class="project__slide--img" 
            :class="[{
              'solo': layout.images.length === 1, 
              'triple': layout.images.length === 3
            }]"
          >
            <div 
              :style="{backgroundImage: 'url(' + image.url + ')'}"
            />
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'ProjectSlider',
    props: ['layouts', 'images', 'number'],
    data () {
      return {
        currentSlide: 0,
        scrollTop: 0,
        slidesOffset: [],
      }
    },
    computed: {
      slides () {
        return this.$refs.slide
      }
    },
    methods: {
      findImage (id) {
        const self = this
        let img = _.find(this.images.data, function(e) { return e.id === id })
        return img.url
      },
      scrollToNext (index) {
        this.currentSlide = index < this.layouts.length - 1 ? index + 1 : 0
        if(process.browser) {
          for(let s = 0; s < this.slides.length; s++) {
            this.slides[s].style.opacity = 0
          }
          const newSlide = document.getElementById(this.currentSlide)
          setTimeout( () => { 
            newSlide.scrollIntoView(true)
            for(let s = 0; s < this.slides.length; s++) {
              this.slides[s].style.opacity = 1
            }
          }, 250)
        }
      },
      scrollToPrev (index) {
        this.currentSlide = index > 0 ? index - 1 : this.layouts.length -  1
        if(process.browser) {
          for(let s = 0; s < this.slides.length; s++) {
            this.slides[s].style.opacity = 0
          }
          const newSlide = document.getElementById(this.currentSlide)
          setTimeout( () => { 
            newSlide.scrollIntoView(true)
            for(let s = 0; s < this.slides.length; s++) {
              this.slides[s].style.opacity = 1
            }
          }, 250)
        }
      },
      keyListener (key) {
        if (key.keyCode === 27) {
          this.$router.push({path: '/projects'})
        } else if (key.keyCode === 39) {
          this.scrollToNext (this.currentSlide)
        } else if (key.keyCode === 37) {
          this.scrollToPrev (this.currentSlide)
        }
      },
      scrollListener () {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop
        for(let s = 0; s < this.slides.length; s++) {
          let offsetTop = this.slides[s].getBoundingClientRect().top
          offsetTop = offsetTop < 0 ? offsetTop * -1 : offsetTop
          this.slidesOffset[s] = offsetTop
        }
      }
    },
    mounted () {
      document.addEventListener('keyup', this.keyListener)
      document.addEventListener('scroll', this.scrollListener)
    },
    destroyed () {
      document.removeEventListener('keyup', this.keyListener)
      document.removeEventListener('scroll', this.scrollListener)
    }
  }
</script>

<style lang="sass">
@import "../assets/sass/variables.sass"

.project
  // &__next
  //   position: fixed
  //   top: 0
  //   right: 0
  //   width: 50%
  //   height: 100%
  //   z-index: 90
  //   cursor: e-resize
  // &__prev
  //   position: fixed
  //   top: 0
  //   left: 0
  //   width: 50%
  //   height: 100%
  //   z-index: 90
  //   cursor: w-resize
  &__slider
    position: relative
    user-select: none
    -webkit-tap-highlight-color: red
  &__slide
    width: 100%
    height: 100vh
    @include pointer()
    transition: opacity 0.25s
    &--inner
      display: flex
      align-items: center
      justify-content: space-evenly
      user-select: none
      width: 100vw
      height: 100%
      padding: $mp-c
      &.triple
        padding: $mp-c 35px
    &--img
      height: 100%;
      width: 50%;
      div
        height: 100%;
        width: 100%;
        background-size: contain
        background-repeat: no-repeat
      &:first-child 
        padding: $mp-d 35px $mp-d $mp-d
        div
          background-position: center right
      &:nth-child(2) 
        padding: $mp-d $mp-d $mp-d 35px
        div
          background-position: center left
      &.solo
        padding: $mp-d $mp-d $mp-d $mp-d
        width: 100%;
        div
          background-position: center
      &.triple
        padding: $mp-d 35px $mp-d 35px
        div
          background-position: center
</style>