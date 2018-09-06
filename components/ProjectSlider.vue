<template>
  <div class="project__slider" @click="next">
    <transition-group class="project__slider--tg" name="project__trs" tag="div">
      <div class="project__slide" v-for="layout in layouts" :key="layout.image1 + ' ' + layout.image2">
        <div class="project__slide--inner" :class="layout.sizing" :key="layout.image2">
          <div class="project__slide--img" v-if="layout.image1" :class="[layout.sizing, {'solo': !layout.image2}]">
            <div :style="{backgroundImage: 'url(' + findImage(layout.image1) + ')'}"></div>
          </div>
          <div class="project__slide--img" v-if="layout.image2" :class="[layout.sizing, {'solo': !layout.image2}]">
            <div :style="{backgroundImage: 'url(' + findImage(layout.image2) + ')'}"></div>
          </div>
          {{ layout }}
        </div>
      </div>
    </transition-group>
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
      enter (el, done) {
        console.log("enter")
        done()
      }
    }
  }
</script>

<style lang="sass">
@import "../assets/sass/variables.sass"

.project__trs-leave-to

.project
  &__slider
    height: calc(100% - 85px)
    &--tg 
      height: 100%
      display: flex
      flex-direction: row
      flex-wrap: no-wrap
      align-items: center
      overflow: hidden;
  &__trs
    &-move, &-enter-active, &-leave-active
      transition: all 2s
  &__slide
    background: $white
    width: 100%
    height: 100%
    display: inline-block
    // transition: opacity 0.5s
    // &:nth-of-type(2)
    //   opacity: 0
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

</style>