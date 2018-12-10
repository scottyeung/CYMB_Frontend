<template>
  <div class="project__slider">
    <a class="project__next" @click="scrollToNext(currentSlide)"/>
    <a class="project__prev" @click="scrollToPrev(currentSlide)"/>
    <div ref="loop" class="project__loop">
      <div
        v-for="(layout, index) in loopLayouts"
        ref="slide"
        :key="index"
        class="project__slide"
      >
        <div
          v-if="layout.load"
          :class="{'triple': layout.images.length === 3, 'loaded': layout.load}"
          class="project__slide--inner"
        >
          <div
            v-for="(image, index) in layout.images"
            :key="index"
            :class="[{
              'solo': layout.images.length === 1,
              'double': layout.images.length === 2,
              'triple': layout.images.length === 3
            }]"
            class="project__slide--img"
          >
            <img :src="image.url" >
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
    props: ['layouts', 'loopLayouts'],
    data () {
      return {
        pageHeight: 0,
        scrollTop: 0,
        slidesOffset: []
      }
    },
    computed: {
      slides () {
        return [].slice.call(document.getElementsByClassName("project__slide"))
      },
      currentSlide () {
        return this.$store.state.currentSlide
      },
      loadCounter () {
        return _.filter(this.loopLayouts, { load: true }).length
      }
    },
    mounted () {
      this.getDimensions()
      this.$nextTick(function() {
        this.initialScroll()
      })
      window.addEventListener('resize', this.getDimensions)
      document.addEventListener('keyup', this.keyListener)
      window.addEventListener('scroll',  this.scrollListener)
    },
    destroyed () {
      window.removeEventListener('resize', this.getDimensions)
      document.removeEventListener('keyup', this.keyListener)
      window.removeEventListener('scroll', this.scrollListener)
    },
    methods: {
      ...mapMutations([
        'setSlide'
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
          this.scrolling()
        } else if (index === this.layouts.length - 1) {
          await this.setSlide(0)
          this.scrolling()
        } else {
          await this.setSlide(1)
          this.scrolling()
        }
      },
      scrollToPrev (index) {
        // Change currentSlide
        let currentSlide = index > 0 ? index - 1 : this.layouts.length -  1
        this.setSlide(currentSlide)
        this.scrolling()
      },
      scrolling () {
        if(process.browser) {
          const newSlide = this.$refs.slide[this.currentSlide]
          newSlide.scrollIntoView(true)
        }
      },
      keyListener (key) {
        if (key.keyCode === 27) {
          this.$router.push({ path: 'overview' })
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
      scrollListener: _.throttle( function () {
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
        this.setSlide (currentSlide)
        if (this.loadCounter <= this.layouts.length) {
          this.preloadSlides () // Show Slides
        }
      }, 25),
      async initialScroll () {
        window.scrollTo (0, 0)
        const newSlide = this.$refs.slide[this.$store.state.currentSlide]
        const top = await newSlide.getBoundingClientRect().top
        window.scrollTo (0, top)
        this.preloadSlides ()
      },
      preloadSlides () {
        if (!('load' in this.loopLayouts[this.currentSlide])) {
          this.$set(this.loopLayouts[this.currentSlide], 'load', true)
        } // Current
        if (this.currentSlide - 1 > 0 && !('load' in this.loopLayouts[this.currentSlide - 1])) {
          this.$set(this.loopLayouts[this.currentSlide - 1], 'load', true)
        } // Next
        if (this.currentSlide + 1 <= this.loopLayouts.length && !('load' in this.loopLayouts[this.currentSlide + 1])) {
          this.$set(this.loopLayouts[this.currentSlide + 1], 'load', true)
        } // Prev
        if (!('load' in this.loopLayouts[0])) {
          this.$set(this.loopLayouts[0], 'load', true)
        } // First
        if (this.currentSlide === 0 && !('load' in this.loopLayouts[this.loopLayouts.length - 2])) {
          this.$set(this.loopLayouts[this.loopLayouts.length - 2], 'load', true)
        } // Last
      }
    }
  }
</script>

<style lang="sass">
  .project
    &__next
      position: fixed
      top: 0
      left: 50%
      width: 50%
      height: 100%
      z-index: 90
      cursor: s-resize
      @include tap()
    &__prev
      position: fixed
      top: 0
      left: 0
      width: 50%
      height: 100%
      z-index: 90
      cursor: n-resize
      @include tap()
    &__slider
      position: relative
      user-select: none
    &__slide
      min-height: 100vh
      width: 100%
      height: 100vh
      &--inner
        display: flex
        align-items: center
        justify-content: space-evenly
        user-select: none
        width: 100%
        height: 100%
        padding: $mp-d
        will-change: contents, scroll-position
        &.loaded
          will-change: auto
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

  @media (max-width: $tablet-ls)
    .project
      &__slide
        &--inner
          padding: $mp-c
        &--img
          padding: $mp-c

  @media (max-width: $tablet-pt)
    .project
      &__slide
        padding: $mp-a 0
        &--inner
          padding: $mp-b
          &.triple
            flex-wrap: wrap
        &--img
          padding: $mp-b
          &.triple
            height: 50%
            &:nth-child(1)
              width: 50%
              margin: 0 25%
              img
                object-position: 50% 100%
            &:nth-child(2)
              img
                object-position: 100% 0%
            &:nth-child(3)
              img
                object-position: 0% 0%

    @media (max-width: $phone-ls)
      .project
        &__slide
          padding: $mp-c 0
          &--inner
            padding: $mp-a
          &--img
            padding: $mp-a

    @media (max-width: $phone-pt)
      .project
        &__next
          width: 100%
          height: 50%
          top: 50%;
          left: 0
        &__prev
          width: 100%
          height: 50%
          top: 0
          left: 0
        &__slide
          &--inner
            flex-wrap: wrap
          &--img
            &.double
              width: 100%
              height: 50%
              &:nth-child(1)
                img
                  object-position: 50% 100%
              &:nth-child(2)
                img
                  object-position: 50% 0%


</style>
