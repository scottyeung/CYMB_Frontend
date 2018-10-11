<template>
  <div class="project__slider">
    <a class="project__next" @click="scrollToNext(currentSlide)"/>
    <a class="project__prev" @click="scrollToPrev(currentSlide)"/>
    <div class="project__loop" ref="loop">
      <div
        class="project__slide"
        v-for="(layout, index) in loopLayouts"
        :key="index"
        :id="index"
        ref="slide">
        <div
          class="project__slide--inner"
          :class="{'triple': layout.images.length === 3}"
        >
          <no-ssr>
            <clazy-load
              :src="image.url"
              margin="100%"
              v-for="(image, index) in layout.images"
              :key="index"
              class="project__slide--img"
              :class="[{
                'solo': layout.images.length === 1,
                'triple': layout.images.length === 3
              }]"
            >
              <img :src="image.url" />
            </clazy-load>
          </no-ssr>
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
      loopLayouts () {
        const first = this.layouts[0]
        const loopLayouts = this.layouts.concat(first)
        return loopLayouts
      },
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
      getDimensions() {
        const itemsLength = this.$refs.slide ? this.$refs.slide.length : 0
        this.pageHeight = 0
        for (var i = 0; i < itemsLength - 1; i++) {
          const itemHeight = this.$refs.slide[i].clientHeight
          this.pageHeight = this.pageHeight + itemHeight
        }
      },
      scrollListener () {
        // Get scroll position
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop

        // Loop
        if (this.scrollTop >= this.pageHeight) {
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
      document.addEventListener('scroll',  this.scrollListener)
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
      img
        height: 100%
        width: 100%
        object-fit: contain
      &:first-child
        img
          object-position: 100% 50%
      &:nth-child(2)
        img
          object-position: 0% 50%
      &.solo
        width: 100%;
        img
          object-position: 50% 50%
      &.triple
        img
          object-position: 50% 50%
</style>
