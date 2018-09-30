<template>
  <div class="project__slider" :style="{overflow: hideScroll}">
    <a class="project__button" @click="setInfo(true)">?</a>
    <a class="project__next" @click="scrollToNext(currentSlide)"/>
    <!-- <a class="project__prev" @click="scrollToPrev(currentSlide)"/> -->
    <div class="project__slide" v-for="(layout, index) in layouts" :id="index" ref="slide">
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
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'ProjectSlider',
    props: ['layouts'],
    data () {
      return {
        // currentSlide: 0,
        scrollTop: 0,
        slidesOffset: [],
      }
    },
    computed: {
      slides () {
        return this.$refs.slide
      },
      currentSlide () {
        return this.$store.state.currentSlide
      },
      hideScroll () {
        let vis = this.$store.state.infoVisible ? 'hidden' : 'visible'
        return vis
      }
    },
    methods: {
      ...mapMutations([
        'setSlide',
        'setInfo'
      ]),
      findImage (id) {
        const self = this
        let img = _.find(this.images.data, function(e) { return e.id === id })
        return img.url
      },
      scrollToNext (index) {
        // Change currentSlide
        let currentSlide = index < this.layouts.length - 1 ? index + 1 : 0
        this.setSlide(currentSlide)
        if(process.browser) {
          // Scroll to next Slide
          const newSlide = document.getElementById(this.currentSlide)
          newSlide.scrollIntoView(true)
        }
      },
      scrollToPrev (index) {
        let currentSlide = index > 0 ? index - 1 : this.layouts.length -  1
        this.setSlide(currentSlide)
        if(process.browser) {
          const newSlide = document.getElementById(this.currentSlide)
          newSlide.scrollIntoView(true)
        }
      },
      keyListener (key) {
        if (key.keyCode === 27) {
          if(!this.$store.state.infoVisible) {
            this.setInfo(true)
          } else {
            this.$router.push({ path: '/projects' })
          }
        } else if (key.keyCode === 39) {
          this.scrollToNext (this.currentSlide)
        } else if (key.keyCode === 37) {
          this.scrollToPrev (this.currentSlide)
        }
      },
      scrollListener () {
        // Check current active slide
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop
        for(let s = 0; s < this.slides.length; s++) {
          let offsetTop = this.slides[s].getBoundingClientRect().top
          this.slidesOffset[s] = Math.abs(offsetTop)
        }
        let currentSlide = this.slidesOffset.indexOf(Math.min.apply(null, this.slidesOffset))
        this.setSlide(currentSlide)
      }
    },
    // watch: {
    //   currentSlide (index) {
    //     this.scrollToNext (this.currentSlide - 1)
    //   }
    // },
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
  &__next
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 90
    cursor: s-resize
  // &__prev
  //   position: fixed
  //   top: 0
  //   left: 0
  //   width: 50%
  //   height: 100%
  //   z-index: 90
  //   cursor: n-resize
  &__button
    position: fixed
    top: 0
    right: 0
    padding: $mp-a $mp-b
    z-index: 95
    cursor: help
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
      padding: $mp-d
      &.triple
        padding: $mp-d
    &--img
      height: 100%;
      width: 50%;
      div
        height: 100%;
        width: 100%;
        background-size: contain
        background-repeat: no-repeat
      &:first-child 
        padding: $mp-d $mp-d $mp-d $mp-d
        div
          background-position: center right
      &:nth-child(2) 
        padding: $mp-d $mp-d $mp-d $mp-d
        div
          background-position: center left
      &.solo
        padding: $mp-d $mp-d $mp-d $mp-d
        width: 100%;
        div
          background-position: center
      &.triple
        padding: $mp-d $mp-d $mp-d $mp-d
        div
          background-position: center
</style>