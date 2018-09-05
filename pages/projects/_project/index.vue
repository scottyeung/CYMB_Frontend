<template>
  <div class="container project">
    <!-- <span class="project__title">
      {{project.title}} for {{project.content.client}} (<span class="project__pagination"></span>)
    </span> -->
    <div class="project__slider" v-swiper:bigSwiper="swiperOptions">
      <div class="project__slider--w swiper-wrapper">
        <div 
          class="project__slide"
          v-for="layout in layouts"
        >
          <div class="project__slide--inner" :class="layout.sizing">
            <div class="project__slide--img" v-if="layout.image1" :class="[layout.sizing, {'solo': !layout.image2}]">
              <div :style="{backgroundImage: 'url(' + findImage(layout.image1) + ')'}"></div>
            </div>
            <div class="project__slide--img" v-if="layout.image2" :class="[layout.sizing, {'solo': !layout.image2}]">
              <div :style="{backgroundImage: 'url(' + findImage(layout.image2) + ')'}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="project__minislider">
      <div class="project__minislider--w">
        <div 
          class="project__minislide"
          v-for="layout in layouts"
        >
          <div class="project__minislide--inner" :class="layout.sizing">
            <div class="project__minislide--img" v-if="layout.image1" :class="[layout.sizing, {'solo': !layout.image2}]">
              <div :style="{backgroundImage: 'url(' + findImage(layout.image1) + ')'}"></div>
            </div>
            <div class="project__minislide--img" v-if="layout.image2" :class="[layout.sizing, {'solo': !layout.image2}]">
              <div :style="{backgroundImage: 'url(' + findImage(layout.image2) + ')'}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/node_modules/axios'

  export default {
    data () {
      return {
        swiperOptions: {
          centeredSlides: true,
          loop: true,
          effect: 'fade',
          speed: 0,
          keyboard: {
            enabled: true,
          },
          slideClass: 'project__slide',
          slideActiveClass: 'project__slide--active',
          slideDuplicateActiveClass: 'project__slide--duplicate--active',
          slideVisibleClass: 'project__slide--visible',
          slideDuplicateClass: 'project__slide--duplicate',
          slideNextClass: 'project__slide--next',  
          slideDuplicateNextClass: 'project__slide--duplicate--next',
          slidePrevClass: 'project__slide--prev',
          slideDuplicatePrevClass: 'project__slide--duplicate--prev'
        },
        swiperMiniOptions: {
          freeMode: true,
          slidesPerView: 'auto',
          grabCursor: true,
          mousewheelControl: true,
          loop: true,
          keyboard: {
            enabled: true,
          },
          slideClass: 'project__minislide',
          slideActiveClass: 'project__minislide--active',
          slideDuplicateActiveClass: 'project__minislide--duplicate--active',
          slideVisibleClass: 'project__minislide--visible',
          slideDuplicateClass: 'project__minislide--duplicate',
          slideNextClass: 'project__minislide--next',  
          slideDuplicateNextClass: 'project__minislide--duplicate--next',
          slidePrevClass: 'project__minislide--prev',
          slideDuplicatePrevClass: 'project__minislide--duplicate--prev'
        }
      }
    },
    async asyncData ({ params }) {
      let { data } = await axios.get('http://127.0.0.1:8888/rest/pages/projects+' + params.project + '/files')
      return { images: data }
    },
    computed: {
      project () {
        const self = this
        let proj = _.find(this.$store.state.projects.data, function(e) { return e.slug === self.$route.params.project })
        return proj
      },
      layouts () {
        return this.project.content.layouts
      }
    },
    methods: {
      findImage (id) {
        const self = this
        let img = _.find(this.images.data, function(e) { return e.id === id })
        return img.url
      }
    }
  }
</script>

<style lang="sass">
@import "../../../assets/sass/variables.sass"

.project
  height: 100vh
  &__slider
    height: calc(100% - 100px)
  &__slide
    background: $white
    &--inner
      display: flex
      align-items: center
      justify-content: space-evenly
      flex-wrap: wrap
      width: 100vw
      height: 100%
    &--img
      height: 100%;
      width: 50%;
      div
        height: 100%;
        width: 100%;
        background-size: contain
        background-repeat: no-repeat
      &:first-child div
        background-position: center right
      &:nth-child(2) div
        background-position: center left
      &.solo
        width: 100%;
        div
          background-position: center
      &.cover
        div
          background-size: cover
      &.large
        &:first-child
          padding: $mp-d*2 $mp-d*1.5 $mp-d*2 $mp-d*3
        &:nth-child(2)
          padding: $mp-d*2 $mp-d*3 $mp-d*2 $mp-d*1.5
      &.cover-large
        &:first-child div
          background-size: cover
        &:nth-child(2)
          padding: $mp-d*2
          div
            background-position: center
      &.large-cover
        &:first-child
          padding: $mp-d*2
          div
            background-position: center
        &:nth-child(2) div
          background-size: cover
  &__minislider
    height: 80px
    width: 100%
    position: fixed
    // overflow: scroll
    z-index: 99
    bottom: 0
    margin: $mp-a 0
    &--w
      width: 1500px
      height: 100%
  &__minislide
    width: 150px
    height: 100%
    display: inline-block
    &--inner
      display: flex
      align-items: center
      justify-content: space-evenly
      flex-wrap: wrap
      width: 100%
      height: 100%
    &--img
      height: 100%
      width: 50%
      div
        height: 100%
        width: 100%;
        background-size: contain
        background-repeat: no-repeat
      &:first-child div
        background-position: center right
      &:nth-child(2) div
        background-position: center left
      &.solo
        width: 100%
        div
          background-position: center
      &.large
        &:first-child
          padding: 8px 6px 8px 6px
        &:nth-child(2)
          padding: 8px 12px 8px 6px

</style>