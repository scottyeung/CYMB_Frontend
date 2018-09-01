<template>
  <div class="container">
    <Menu :color="color"></Menu>
    <IndexSlider  v-on:colorChange="menuColor"></IndexSlider>
  </div>
</template>

<script>
import IndexSlider from '~/components/IndexSlider.vue'
import Menu from '~/components/Menu.vue'

export default {
  name: 'Home',
  data () {
    return {
      color: 'black'
    }
  },
  components: {
    IndexSlider,
    Menu
  },
  methods: {
    menuColor (color) {
      this.color = color
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

