<template>
  <div class="project__thumbs">
    <div ref="height" class="helper__height"/>
    <nuxt-link
      v-for="(layout, index) in layouts"
      :key="index"
      :style="{height: slideHeight + 'px'}"
      to="images"
      class="project__thumb"
      @click.native="setSlide(index)"
    >
      <div
        ref="thumb"
        :class="{'triple': layout.images.length === 3}"
        class="project__thumb--inner"
      >
        <div
          v-for="(image, index) in layout.images"
          :key="index"
          :class="[{
            'solo': layout.images.length === 1,
            'double': layout.images.length === 2,
            'triple': layout.images.length === 3
          }]"
          class="project__thumb--img"
        >
          <img
            :src="image.thumb"
          >
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'ProjectThumbs',
    props: ['layouts'],
    data () {
      return {
        slideHeight: 0,
        windowHeight: 0,
      }
    },
    mounted () {
      window.addEventListener('resize', this.getWindowHeight)
      window.addEventListener('orientationchange', this.getWindowHeight)
      this.getWindowHeight ()
    },
    destroyed () {
      window.removeEventListener('resize', this.getWindowHeight)
      window.removeEventListener('orientationchange', this.getWindowHeight)
    },
    methods: {
      ...mapMutations([
        'setSlide'
      ]),
      async getWindowHeight () {
        this.windowHeight = await this.$refs.height.clientHeight
        this.setHeight()
      },
      setHeight () {
        if(process.browser && this.$refs.thumb) {
          const windowWidth = window.innerWidth
          const windowHeight = this.windowHeight
          const ratio = windowHeight/windowWidth
          const thumbWidth = this.$refs.thumb[0].clientWidth

          this.slideHeight = thumbWidth * ratio
        }
      }
    }
  }
</script>

<style lang="sass">

  .helper
    &__height
      height: 100vh
      position: fixed
      top: 0
      left: 0
      z-index: -1
  .project
    &__thumbs
      width: calc(100% + 30px)
      height: 100%
      margin-left: $mp-c/2 * -1
      margin-top: $mp-a
    &__thumb
      width: calc(100% / 7)
      @include pointer()
      display: inline-block
      vertical-align: top
      padding: $mp-a $mp-a/2 0 $mp-a/2
      &--inner
        display: flex
        align-items: center
        justify-content: space-evenly
        user-select: none
        width: 100%
        height: 100%
        padding: 5px
      &--img
        height: 100%;
        width: 50%;
        padding: 5px
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

  @media (max-width: $desktop)
    .project
      &__thumb
        width: calc(100% / 6)

  @media (max-width: $tablet-ls)
    .project
      &__thumb
        width: calc(100% / 5)

  @media (max-width: $tablet-pt)
    .project
      &__thumb
        width: calc(100% / 4)
        padding: $mp-a 9px 0 9px
        &--inner
          padding: 3px
          &.triple
            flex-wrap: wrap
        &--img
          padding: 3px
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
      &__thumb
        width: calc(100% / 4)

  @media (max-width: $phone-pt)
    .project
      &__thumb
        width: calc(100% / 3)
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
