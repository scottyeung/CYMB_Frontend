<template>
  <div class="project__thumbs">
    <nuxt-link
      v-for="(layout, index) in layouts"
      :key="index"
      :style="{width: slideWidth + 'px'}"
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
            'triple': layout.images.length === 3
          }]"
          class="project__thumb--img"
        >
          <div
            :style="{backgroundImage: 'url(' + image.thumb + ')'}"
          />
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
        slideWidth: 0,
        containerWidth: 0
      }
    },
    mounted () {
      window.addEventListener('resize', this.setWidth)
      this.setWidth ()
    },
    destroyed () {
      window.removeEventListener('resize', this.setWidth)
    },
    methods: {
      ...mapMutations([
        'setSlide'
      ]),
      setWidth () {
        if(process.browser && this.$refs.thumb) {
          const windowWidth = window.innerWidth
          const windowHeight = window.innerHeight
          const ratio = windowWidth/windowHeight
          const thumbHeight = this.$refs.thumb[0].clientHeight

          this.slideWidth = thumbHeight * ratio
          this.containerWidth = ((thumbHeight * ratio)) * this.layouts.length
        }
      }
    }
  }
</script>

<style lang="sass">
  .project
    &__thumbs
      width: 100vw
      display: block
    &__thumb
      width: 12.75vw
      height: 12.75vh
      @include pointer()
      transition: opacity 0.25s
      display: inline-block
      margin: $mp-b $mp-b 0 0
      &--inner
        display: flex
        align-items: center
        justify-content: space-evenly
        user-select: none
        width: 100%
        height: 100%
        padding: 4px
        &.triple
          padding: 4px
      &--img
        height: 100%
        width: 50%
        padding: 4px
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
