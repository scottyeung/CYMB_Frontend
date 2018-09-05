<template>
  <div class="container project">
    <div class="project__slider" v-swiper:mySwiper="swiperOptions">
      <div class="project__slider--w swiper-wrapper">
        <div 
          class="project__slide"
          :class="[layout.sizing]"
          v-for="layout in layouts"
        >
        <div class="project__slide--inner">
            <div v-if="layout.image1" :style="{backgroundImage: 'url(' + findImage(layout.image1) + ')'}"></div>
            <div v-if="layout.image2" :style="{backgroundImage: 'url(' + findImage(layout.image2) + ')'}"></div>
            <div v-if="layout.image3" :style="{backgroundImage: 'url(' + findImage(layout.image3) + ')'}"></div>
            <div v-if="layout.image4" :style="{backgroundImage: 'url(' + findImage(layout.image4) + ')'}"></div>
        </div>
          <!-- <span>Slide</span> -->
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
          // slidesPerView: 'auto',
          centeredSlides: true,
          // freeMode: true,
          loop: true,
          keyboard: {
            enabled: true,
          },
          // mousewheel: true,
          slideClass: 'project__slide',
          slideActiveClass: 'project__slide--active',
          slideDuplicateActiveClass: 'project__slide--duplicate--active',
          slideVisibleClass: 'project__slide--visible',
          slideDuplicateClass: 'project__slide--duplicate',
          slideNextClass: 'project__slide--next',  
          slideDuplicateNextClass: 'project__slide--duplicate--next',
          slidePrevClass: 'project__slide--prev',
          slideDuplicatePrevClass: 'project__slide--duplicate--prev',
          // wrapperClass: 'project__slider--w'
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
    height: 100%
  &__slide
    &--inner
      display: flex
      align-items: center
      justify-content: center
      flex-wrap: wrap
      width: 100vw
      height: 100vh
    &--left, &--right
      width: 50%
      height: 100%
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      padding: $mp-c*2
      div
        height: 100%;
        width: 100%;
        background-size: contain
        background-repeat: no-repeat
        background-position: center
    &--full
      width: 100%;
      height: 100%;
      padding: $mp-c*2
      div
        height: 100%;
        width: 100%;
        background-size: contain
        background-repeat: no-repeat
        background-position: center

    // div
    //   width: 25vw
    //   height: 100%
    //   background-size: cover
    //   background-repeat: no-repeat
    //   background-position: center
        // div
    //   width: 40vw
    //   height: 100%
    //   background-size: contain
    //   background-repeat: no-repeat
    //   background-position: center
    //   &.landscape.cover
    //     width: 100vw
    //     background-size: cover
    //   &.portrait.cover
    //     width: 50vw
    //     background-size: cover
    //   &.landscape.contained
    //     width: 100vw
    //     background-size: contain
    //   &.portrait.contained
    //     width: 50vw
    //     background-size: contain

</style>