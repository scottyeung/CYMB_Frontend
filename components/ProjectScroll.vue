<template>
  <div class="project__scroll">
    <div
      class="project__scroll--move-l"
      @mouseover="moveScroll('right', 'start')"
      @mouseleave="moveScroll('right', 'stop')"
    />
    <div
      class="project__scroll--move-r"
      @mouseover="moveScroll('left', 'start')"
      @mouseleave="moveScroll('left', 'stop')"
    />
    <div
      class="project__scroll--inner"
      ref="scrollContainer"
      :style="{width: containerWidth + 'px', left: scrollPosition + 'px'}"
    >
      <div
        class="project__spread"
        v-for="(layout, index) in sortedLayouts"
        :key="layout.image1 + ' ' + layout.image2"
        :style="{width: slideWidth + 'px'}"
        :class="{'triple': layout.image1 && layout.image2 && layout.image3}"
        ref="projectSpread"
        @click="select(index)"
      >
        <div class="project__spread--inner" :class="layout.sizing">
          <div
            class="project__spread--img"
            v-if="layout.image1"
            :class="[{
              'solo': !layout.image2 && !layout.image3,
              'triple': layout.image1 && layout.image2 && layout.image3
            }]"
          >
            <div :style="{backgroundImage: 'url(' + findImage(layout.image1) + ')'}"/>
          </div>
          <div
            class="project__spread--img"
            v-if="layout.image2"
            :class="[{
              'solo': !layout.image1 && !layout.image3,
              'triple': layout.image1 && layout.image2 && layout.image3
            }]"
          >
            <div :style="{backgroundImage: 'url(' + findImage(layout.image2) + ')'}"/>
          </div>
          <div
            class="project__spread--img"
            v-if="layout.image3"
            :class="[{
              'solo': !layout.image1 && !layout.image2,
              'triple': layout.image1 && layout.image2 && layout.image3
            }]"
          >
            <div :style="{backgroundImage: 'url(' + findImage(layout.image3) + ')'}"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProjectScroll',
    props: ['layouts', 'images', 'number', 'scrollPosition'],
    data () {
      return {
        slideWidth: 50,
        containerWidth: 0,
        move: false
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
        this.$emit('scrollChanged', 0)
        this.$emit('infoChanged', false)
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
          this.containerWidth = ((containerHeight * ratio)) * this.layouts.length
        }
      },
      moveScroll (direction, commando) {
        const self = this
        const windowWidth = window.innerWidth
        const containerWidth = this.$refs.scrollContainer.offsetWidth
        const maxDistance = containerWidth - windowWidth

        function move() {
          let position = self.scrollPosition
          if (direction === 'left' && position * -1 < maxDistance && self.move === true) {
            self.$emit('scrollChanged', position - 10)
            window.requestAnimationFrame(move)
          } else if (direction === 'right' && position < maxDistance && position < 0 && self.move === true) {
            self.$emit('scrollChanged', position + 10)
            window.requestAnimationFrame(move)
          }
        }

        if (commando == 'stop') {
          this.move = false
          window.cancelAnimationFrame(move)
        } else if (commando === 'start') {
          this.move = true
          window.requestAnimationFrame(move)
        }
      },
      moveSpread (el) {
        el.style.width = '10px'
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
@import "~/assets/sass/variables.sass"

// .spreads-enter-active, .spreads-leave-active
//   z-index: -1

// .spreads-enter, .spreads-leave-to /* .list-leave-active below version 2.1.8 */
//   opacity: 0

.spreads-move
  // transition: transform 0.5s
  &:last-child
    z-index: -1

.project
  &__scroll
    position: fixed
    height: 10vh
    width: 100vw
    z-index: 90
    bottom: 0
    overflow: hidden
    &--move-l
      position: fixed;
      bottom: 0
      left: 0
      width: 50px
      height: 10vh
      z-index: 95
      cursor: w-resize
    &--move-r
      position: fixed;
      bottom: 0
      right: 0
      width: 50px
      height: 10vh
      z-index: 95
      cursor: e-resize
    &--inner
      height: 100%
      width: 1000vw
      display: flex
      flex-wrap: no-wrap
      justify-content: flex-start
      overflow: hidden
      position: absolute
      padding: 4px $mp-a
  &__spread
    background: $white
    padding: 0 $mp-a
    width: 125px
    height: 100%
    &--inner
      display: flex
      align-items: center
      justify-content: space-evenly
      width: 100%
      height: 100%
      &.triple
        padding: 0 4.5px
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
        padding: 9px 4.5px 9px 9px
        div
          background-position: center right
      &:nth-child(2)
        padding: 9px 9px 9px 4.5px
        div
          background-position: center left
      &.solo
        width: 100%;
        padding: 9px
        div
          background-position: center
      &.triple
        width: 100%
        padding: 9px 4.5px
        div
          background-position: center

</style>
