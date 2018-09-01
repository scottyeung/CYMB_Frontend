<template>
  <div class="index__slider" :class="indexImages[currentNumber].content.sizing">
    <div 
    class="index__slider--img" 
    :style="{backgroundImage: 'url(' + indexImages[currentNumber].url + ')'}"
    :class="indexImages[currentNumber].content.sizing"
    @click="onSwipeLeft"
    ></div>
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
      if (this.indexImages[this.currentNumber].next) {
        return this.indexImages[this.currentNumber].next.url
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
      this.$emit('colorChange', this.indexImages[this.currentNumber].content.color);
    },
    onSwipeRight () {
      if (this.currentNumber === 0) {
        this.currentNumber = this.indexImages.length - 1
      } else {
        this.currentNumber -= 1
      }
      this.preloadImages([this.nextImgUrl, this.prevImgUrl])
      this.$emit('colorChange', this.indexImages[this.currentNumber].content.color);
    },
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/variables.sass"

  .index__slider
    width: 100%
    height: 100%
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    &.large
      padding: $mp-c*2;
    &--img
      width: 100%;
      height: 100%;
      background-size: contain
      background-position: center
      background-repeat: no-repeat
      &.cover
        background-size: cover

</style>

