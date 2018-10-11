<template>
  <div class="project__slider">
    <a class="project__next" @click="scrollToNext(currentSlide)"/>
    <a class="project__prev" @click="scrollToPrev(currentSlide)"/>
    <div class="project__loop" ref="loop">
      <div
        class="project__slide"
        v-for="(layout, index) in layouts"
        :key="index"
        :id="index"
        ref="slide">
        <div
          class="project__slide--inner"
          :class="{'triple': layout.images.length === 3}"
        >
          <div
            v-for="(image, index) in layout.images"
            :key="index"
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
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'ProjectSlider',
    props: ['layouts'],
    data () {
      return {
        pageHeight: 0,
        duplicated: false,
        isTouch: false,
        scrollTop: 0,
        slidesOffset: [],
      }
    },
    computed: {
      slides () {
        return [].slice.call(document.getElementsByClassName("project__slide"))
      },
      currentSlide () {
        return this.$store.state.currentSlide
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
      async scrollToNext (index) {
        // Change currentSlide
        if (index < this.layouts.length - 1) {
          await this.setSlide(index + 1)
        } else if (index === this.layouts.length - 1) {
          await this.setSlide(0)
        } else {
          await this.setSlide(1)
        }
        this.scroll()

      },
      scrollToPrev (index) {
        // Change currentSlide
        let currentSlide = index > 0 ? index - 1 : this.layouts.length -  1
        this.setSlide(currentSlide)
        this.scroll()
      },
      scroll () {
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
      createDuplicate() {
        const container = this.$refs.loop
        if (container.hasChildNodes()) {
          container.appendChild(container.childNodes[0].cloneNode(true))
        }
        return true
      },
      getDimensions() {
        const container = this.$refs.loop
        if (this.duplicated === false) {
          this.duplicated = this.createDuplicate()
        }
        const numOfItems = this.$refs.slide.length
        for (var i = 0; i < numOfItems; i++) {
          const itemHeight = this.$refs.slide[i].clientHeight
          this.pageHeight = this.pageHeight + itemHeight
        }
      },
      scrollListener () {
        // Get scroll position
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop

        // Loop
        const container = this.$refs.loop
        if (this.scrollTop === this.pageHeight) {
          window.scrollTo(0, 0)
				}

        // Check current active slide
        for (let s = 0; s < this.slides.length; s++) {
          let offsetTop = this.slides[s].getBoundingClientRect().top
          this.slidesOffset[s] = Math.abs(offsetTop)
        }
        let currentSlide = this.slidesOffset.indexOf(Math.min.apply(null, this.slidesOffset))
        this.setSlide(currentSlide)
      }
    },
    mounted () {
      this.getDimensions()
      window.addEventListener('resize', this.getDimensions)
      document.addEventListener('keyup', this.keyListener)
      document.addEventListener('scroll', this.scrollListener)
    },
    destroyed () {
      window.removeEventListener('resize', this.getDimensions)
      document.removeEventListener('keyup', this.keyListener)
      document.removeEventListener('scroll', this.scrollListener)
    }
  }
</script>

<style lang="sass">
@import "~/assets/sass/variables.sass"

.project
  &__next
    position: fixed
    top: 0
    left: 50%
    width: 50%
    height: 100%
    z-index: 90
    cursor: s-resize
  &__prev
    position: fixed
    top: 0
    left: 0
    width: 50%
    height: 100%
    z-index: 90
    cursor: n-resize
  &__slider
    position: relative
    user-select: none
    -webkit-tap-highlight-color: red
  &__slide
    min-height: 100vh
    width: 100%
    height: 100vh
    transform: translate3d(0,0,0)
    &--inner
      display: flex
      align-items: center
      justify-content: space-evenly
      user-select: none
      width: 100vw
      height: 100%
      padding: $mp-d
    &--img
      height: 100%;
      width: 50%;
      padding: $mp-d
      div
        height: 100%;
        width: 100%;
        background-size: contain
        background-repeat: no-repeat
      &:first-child
        div
          background-position: center right
      &:nth-child(2)
        div
          background-position: center left
      &.solo
        width: 100%;
        div
          background-position: center
      &.triple
        div
          background-position: center
</style>
