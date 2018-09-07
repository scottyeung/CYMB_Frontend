<template>
  <div class="project__scroll">
    <div class="project__scroll--inner" ref="scrollContainer" :style="{width: containerWidth + 'px'}">
      <div 
        class="project__spread" 
        v-for="(layout, index) in layouts" 
        :key="layout.image1 + ' ' + layout.image2"
        :style="{width: slideWidth + 'px'}"
        @click="select(index)"
      >
        <div class="project__spread--inner" :class="layout.sizing">
          <div class="project__spread--img" v-if="layout.image1" :class="[layout.sizing, {'solo': !layout.image2}]">
            <div :style="{backgroundImage: 'url(' + findImage(layout.image1) + ')'}"></div>
          </div>
          <div class="project__spread--img" v-if="layout.image2" :class="[layout.sizing, {'solo': !layout.image2}]">
            <div :style="{backgroundImage: 'url(' + findImage(layout.image2) + ')'}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProjectScroll',
    props: ['layouts', 'images'],
    data () {
      return {
        scrollLayouts: this.layouts,
        slideWidth: 0,
        containerWidth: 0,
      }
    },
    // computed: {
    //   scrollLayouts () {
    //     return this.layouts
    //   }
    // },
    methods: {
      findImage (id) {
        const self = this
        let img = _.find(this.images.data, function(e) { return e.id === id })
        return img.url
      },
      select (index) {
          let restLayouts = this.layouts.splice(index)
          const newLayouts = restLayouts.concat(this.layouts)
          this.$emit('layoutsChanged', newLayouts)
      },
      setWidth () {
        if(process.browser) {
          const windowWidth = window.innerWidth
          const windowHeight = window.innerHeight
          const ratio = windowWidth/windowHeight
          const containerHeight = this.$refs.scrollContainer.clientHeight

          this.slideWidth = containerHeight * ratio
          this.containerWidth = ((containerHeight * ratio) + 10) * this.layouts.length

          console.log(ratio)
          console.log(containerHeight)
        }
      }
    },
    mounted () {
      window.addEventListener('resize', this.setWidth)
      this.setWidth ()
    },
    destroyed () {
      window.removeEventListener('resize', this.setWidth)
    }
    // watch: {
    //   layouts () {
    //     console.log(this.layouts)
    //     // console.log(newLayouts)
    //     setTimeout( () => {
    //       this.scrollLayouts = this.layouts
    //     }, 250)
    //   }
    // }
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
    overflow: hidden;
    &--inner 
      height: 100%
      width: 1000vw
      display: flex
      flex-wrap: no-wrap
      justify-content: flex-start
      overflow: hidden;
  &__spread
    background: $grey
    margin: 0 $mp-a
    width: 125px
    height: 100%
    opacity: 0.5
    &:first-child
      opacity: 1
    &:hover
      opacity: 1
    &--inner
      display: flex
      align-items: center
      justify-content: space-evenly
      width: 100%
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