<template>
  <div class="project__scroll">
    <div class="project__scroll--inner" ref="scrollContainer" :style="{width: containerWidth + 'px'}">
      <div 
        class="project__spread" 
        v-for="(layout, index) in sortedLayouts"
        :key="layout.image1 + ' ' + layout.image2"
        :style="{width: slideWidth + 'px'}"
        ref="projectSpread"
        @click="select(index)"
      >
        <div class="project__spread--inner" :class="layout.sizing">
          <div 
            class="project__spread--img" 
            v-if="layout.image1" 
            :class="[{'solo': !layout.image2}]"
          >
            <div :style="{backgroundImage: 'url(' + findImage(layout.image1) + ')'}"/>
          </div>
          <div 
            class="project__spread--img" 
            v-if="layout.image2" 
            :class="[{'solo': !layout.image1}]"
          >
            <div :style="{backgroundImage: 'url(' + findImage(layout.image2) + ')'}"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProjectScroll',
    props: ['layouts', 'images', 'number'],
    data () {
      return {
        slideWidth: 50,
        containerWidth: 0,
      }
    },
    computed: {
      sortedLayouts () {
        const firstHalf = this.layouts.slice(this.number)
        const secondHalf = this.layouts.slice(0, this.number)
        const newLayouts = firstHalf.concat(secondHalf)

        return newLayouts
      }
    },
    methods: {
      findImage (id) {
        const self = this
        let img = _.find(this.images.data, function(e) { return e.id === id })
        return img.url
      },
      select (index) {
        // let restLayouts = this.layouts.splice(index)
        // const newLayouts = restLayouts.concat(this.layouts)
        // this.$emit('layoutsChanged', newLayouts)
        if(index < this.layouts.length - this.number) {
          this.$emit('numberChanged', index + this.number)
        } else {
          const actualNumber = Math.abs(this.layouts.length - this.number - index)
          this.$emit('numberChanged', actualNumber)
        }
      },
      setWidth () {
        if(process.browser) {
          const windowWidth = window.innerWidth
          const windowHeight = window.innerHeight
          const ratio = windowWidth/windowHeight
          const containerHeight = this.$refs.scrollContainer.clientHeight

          this.slideWidth = containerHeight * ratio
          this.containerWidth = ((containerHeight * ratio) + 10) * this.layouts.length
        }
      },
      moveScroll () {
        const self = this
        const spreads = this.$refs.projectSpread
        const distance = ((self.slideWidth + 10) * self.layoutNumber) * -1

        // Move
        spreads.forEach(function(spread) {
          spread.style.transition = 'all 0.3s'
          spread.style.webkitTransform = 'translate3D(' + distance + 'px, 0, 0)'
        })
      }
    },
    mounted () {
      window.addEventListener('resize', this.setWidth)
      this.setWidth ()
    },
    destroyed () {
      window.removeEventListener('resize', this.setWidth)
    }
  }
</script>

<style lang="sass">
@import "../assets/sass/variables.sass"

.project__trs-leave-to

.project
  &__scroll
    position: fixed
    height: 10vh
    padding: 4px $mp-a
    width: 100vw
    z-index: 99
    bottom: 0
    overflow: hidden
    background: $white
    &--inner 
      height: 100%
      width: 1000vw
      display: flex
      flex-wrap: no-wrap
      justify-content: flex-start
      overflow: hidden
  &__spread
    background: $white
    margin: 0 $mp-a
    width: 125px
    height: 100%
    &--inner
      display: flex
      align-items: center
      justify-content: space-evenly
      width: 100%
      height: 100%
    &--img
      height: 100%
      width: 50%
      @include pointer()
      div
        height: 100%;
        width: 100%;
        background-size: contain
        background-repeat: no-repeat
      &:first-child 
        padding: 6px 4.5px 6px 9px
        div
          background-position: center right
      &:nth-child(2) 
        padding: 6px 9px 6px 4.5px
        div
          background-position: center left
      &.solo
        width: 100%;
        padding: 6px 9px
        div
          background-position: center

</style>