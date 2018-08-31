<template>
  <div class="container">
    <Menu></Menu>
    <IndexSlider></IndexSlider>
  </div>
</template>

<script>
import IndexSlider from '~/components/IndexSlider.vue'
import Menu from '~/components/Menu.vue'

export default {
  name: 'Home',
  components: {
    IndexSlider,
    Menu
  }
}
</script>

<style lang="sass" scoped>

</style>

