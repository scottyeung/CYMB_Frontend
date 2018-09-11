<template>
  <div class="project__slider">
    <div class="project__next" @click="next"/>
    <div class="project__prev" @click="prev"/>
    <div class="project__slider--tg">
      <div class="project__slide">
        <div class="project__slide--inner" :class="layouts[number].sizing">
          <div 
            class="project__slide--img" 
            v-if="layouts[number].image1" 
            :class="[{'solo': !layouts[number].image2}]"
          >
            <div 
              :style="{backgroundImage: 'url(' + findImage(layouts[number].image1) + ')'}"
            />
          </div>
          <div 
            class="project__slide--img" 
            v-if="layouts[number].image2" 
            :class="[{'solo': !layouts[number].image1}]"
          >
            <div 
              :style="{backgroundImage: 'url(' + findImage(layouts[number].image2) + ')'}"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProjectSlider',
    props: ['layouts', 'images', 'number'],
    methods: {
      findImage (id) {
        const self = this
        let img = _.find(this.images.data, function(e) { return e.id === id })
        return img.url
      },
      next () {
        if(this.number < this.layouts.length - 1) {
          this.$emit('numberChanged', this.number + 1)
        } else {
          this.$emit('numberChanged', 0)
        }
        // const first = this.layouts.shift()
        // const newLayouts = this.layouts.concat(first)
        // this.$emit('layoutsChanged', newLayouts)
      },
      prev () {
        if(this.number > 0) {
          this.$emit('numberChanged', this.number - 1)
        } else {
          this.$emit('numberChanged', this.layouts.length - 1)
        }
        // const last = this.layouts.pop()
        // const newLayouts = [last].concat(this.layouts)
        // this.$emit('layoutsChanged', newLayouts)
      },
      keyListener (key) {
        if (key.keyCode === 27) {
          this.$router.push({path: '/projects'})
        } else if (key.keyCode === 39) {
          this.next ()
        } else if (key.keyCode === 37) {
          this.prev ()
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
  &__next
    position: fixed
    top: 0
    right: 0
    width: 50%
    height: 100%
    z-index: 90
    cursor: e-resize
  &__prev
    position: fixed
    top: 0
    left: 0
    width: 50%
    height: 100%
    z-index: 90
    cursor: w-resize
  &__slider
    height: 90vh
    &--tg 
      height: 100%
      display: flex
      @include center()
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
        padding: $mp-d*2 $mp-d*1.5 50px $mp-d*3
        div
          background-position: center right
      &:nth-child(2) 
        padding: $mp-d*2 $mp-d*3 50px $mp-d*1.5
        div
          background-position: center left
      &.solo
        padding: $mp-d*2 $mp-d*3 50px $mp-d*3
        width: 100%;
        div
          background-position: center
</style>