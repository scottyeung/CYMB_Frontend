<template>
  <div
    :class="[indexImages[currentNumber].content.sizing, indexImages[currentNumber].content.background]"
    class="index__slider"
  >
    <div
      :style="{backgroundImage: 'url(' + indexImages[currentNumber].url + ')'}"
      :class="indexImages[currentNumber].content.sizing"
      class="index__slider__img"
      @click="onSwipeLeft"
    />
  </div>
</template>

<script>

export default {
	name: 'IndexSlider',
  data () {
    return {
      currentNumber: 0
    }
  },
  computed: {
    indexImages () {
      return this.$store.state.indexImages.data
    },
    nextImgUrl () {
      if (this.indexImages[this.currentNumber + 1]) {
        return this.indexImages[this.currentNumber + 1].url
      } else {
        return this.indexImages[0].url
      }
    },
    prevImgUrl () {
      if (this.currentNumber > 0) {
        return this.indexImages[this.currentNumber - 1].url
      } else {
        return this.indexImages[this.indexImages.length - 1].url
      }
    }
  },
  mounted () {
    this.preloadImages([this.nextImgUrl, this.prevImgUrl])
    window.addEventListener('keyup', this.keyListener)
    this.dataEmit ()
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.keyListener)
  },
  methods: {
    preloadImages (arr) {
      const newImages = []
      for (let i = 0; i < arr.length; i++) {
        newImages[i] = new Image()
        newImages[i].src = arr[i]
      }
    },
    onSwipeLeft () {
      if (this.currentNumber < this.indexImages.length - 1) {
        this.currentNumber += 1
      } else {
        this.currentNumber = 0
      }
      this.preloadImages([this.nextImgUrl, this.prevImgUrl])
      this.dataEmit ()
    },
    onSwipeRight () {
      if (this.currentNumber === 0) {
        this.currentNumber = this.indexImages.length - 1
      } else {
        this.currentNumber -= 1
      }
      this.preloadImages([this.nextImgUrl, this.prevImgUrl])
      this.dataEmit ()
    },
    keyListener (evt) {
      if (evt.keyCode === 37) {
        this.onSwipeRight()
      } else if (evt.keyCode === 39) {
        this.onSwipeLeft()
      }
    },
    dataEmit () {
      this.$emit(
        'slideChange',
        this.indexImages[this.currentNumber].content.color,
        this.indexImages[this.currentNumber].content.background,
        this.indexImages[this.currentNumber].content.project
      )
    }
  },
}
</script>

<style lang="sass" scoped>
  @import "~/assets/sass/variables.sass"

  .index__slider
    width: 100%
    height: 100%
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    &.large
      padding: $mp-d*2
    &.black
      background: $black
    &__img
      width: 100%;
      height: 100%;
      background-size: contain
      background-position: center
      background-repeat: no-repeat
      &.cover
        background-size: cover
</style>

