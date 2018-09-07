<template>
  <div class="project__slider" @click="next">
    <div class="project__slider--tg">
      <div class="project__slide" v-for="layout in layouts" :key="layout.image1 + ' ' + layout.image2">
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
</template>

<script>
  export default {
    name: 'ProjectSlider',
    props: ['layouts', 'images'],
    data () {
      return {
      }
    },
    methods: {
      findImage (id) {
        const self = this
        let img = _.find(this.images.data, function(e) { return e.id === id })
        return img.url
      },
      next () {
        const first = this.layouts.shift()
        const newLayouts = this.layouts.concat(first)
        this.$emit('layoutsChanged', newLayouts)
      },
      previous () {
        const last = this.layouts.pop()
        const newLayouts = [last].concat(this.layouts)
        this.$emit('layoutsChanged', newLayouts)
      },
      keyListener (key) {
        if (key.keyCode === 27) {
          this.$router.push({path: '/projects'})
        } else if (key.keyCode === 39) {
          this.next ()
        } else if (key.keyCode === 37) {
          this.previous ()
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
  &__slider
    height: 90vh
    &--tg 
      height: 100%
      display: flex
      flex-direction: row
      flex-wrap: no-wrap
      align-items: center
      overflow: hidden;
  &__slide
    background: $white
    width: 100%
    height: 100%
    include pointer()
    &--inner
      display: flex
      align-items: center
      justify-content: space-evenly
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
      &:first-child 
        padding: $mp-d*2 $mp-d*1.5 $mp-d*2 $mp-d*3
        div
          background-position: center right
      &:nth-child(2) 
        padding: $mp-d*2 $mp-d*3 $mp-d*2 $mp-d*1.5
        div
          background-position: center left
      &.solo
        padding: $mp-d*2 $mp-d*3 $mp-d*2 $mp-d*3
        width: 100%;
        div
          background-position: center
</style>