<template>
  <div class="project__slider">
    <!-- <div class="project__next" @click="next(1)"/> -->
<!--     <div class="project__prev" @click="prev(2)"/> -->
    <a @click="scrollToNext(index)" v-for="(layout, index) in layouts">
      <div class="project__slide" :id="index">
        <div 
          class="project__slide--inner"
          :class="{'triple': layout.image1 && layout.image2 && layout.image3}"
        >
          <div 
            class="project__slide--img" 
            v-if="layout.image1" 
            :class="[{
              'solo': !layout.image2 && !layout.image3, 
              'triple': layout.image1 && layout.image2 && layout.image3
            }]"
          >
            <div 
              :style="{backgroundImage: 'url(' + findImage(layout.image1) + ')'}"
            />
          </div>
          <div 
            class="project__slide--img" 
            v-if="layout.image2" 
            :class="[{
              'solo': !layout.image1 && !layout.image3,
              'triple': layout.image1 && layout.image2 && layout.image3
            }]"
          >
            <div 
              :style="{backgroundImage: 'url(' + findImage(layout.image2) + ')'}"
            />
          </div>
          <div 
            class="project__slide--img" 
            v-if="layout.image3" 
            :class="[{
              'solo': !layout.image1 && !layout.image2,
              'triple': layout.image1 && layout.image2 && layout.image3
            }]"
          >
            <div 
              :style="{backgroundImage: 'url(' + findImage(layout.image3) + ')'}"
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
        nextSlide: 1,
        currentSlide: 0
      }
    },
    methods: {
      findImage (id) {
        const self = this
        let img = _.find(this.images.data, function(e) { return e.id === id })
        return img.url
      },
      scrollToNext (index) {
        if(index < this.layouts.length - 1) {
          this.nextSlide = index + 1
          this.currentSlide = index
        } else {
          this.nextSlide = 0
          this.currentSlide = this.layouts.length - 1
        }
        if(process.browser) {
          const current = document.getElementById(this.currentSlide)
          const next = document.getElementById(this.nextSlide)
          current.style.opacity = 0
          next.style.opacity = 0
          setTimeout( () => { 
            next.scrollIntoView(true)
            next.style.opacity = 1
            current.style.opacity = 1
          }, 350)
        }
      },
      scrollToPrev (index) {
        if(index > 0) {
          this.nextSlide = index - 1
          this.curentSlide = index
        } else {
          this.nextSlide = this.layouts.length -  1
          this.currentSlide = 0
        }
        if(process.browser) {
          const current = document.getElementById(this.currentSlide)
          const next = document.getElementById(this.nextSlide)
          current.style.opacity = 0
          next.style.opacity = 0
          setTimeout( () => { 
            next.scrollIntoView(true)
            next.style.opacity = 1
            current.style.opacity = 1
          }, 350)
        }
      },
      keyListener (key) {
        if (key.keyCode === 27) {
          this.$router.push({path: '/projects'})
        } else if (key.keyCode === 39) {
          this.scrollToNext (this.nextSlide)
        } else if (key.keyCode === 37) {
          this.scrollToPrev (this.nextSlide)
        }
      }
    },
    mounted () {
      document.addEventListener('keyup', this.keyListener)
    },
    destroyed () {
      document.removeEventListener('keyup', this.keyListener)
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
    transition: opacity 0.35s
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