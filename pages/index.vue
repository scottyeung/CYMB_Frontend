<template>
  <div class="container">
    <Menu :color="color" :background="background"></Menu>
    <IndexSlider  v-on:slideChange="updateData"></IndexSlider>
    <IndexCaption :color="color" :project="project"></IndexCaption>
  </div>
</template>

<script>
import IndexSlider from '~/components/IndexSlider.vue'
import IndexCaption from '~/components/IndexCaption.vue'
import Menu from '~/components/Menu.vue'

export default {
  name: 'Home',
  data () {
    return {
      color: 'black',
      background: 'white',
      project: ''
    }
  },
  components: {
    IndexSlider,
    IndexCaption,
    Menu
  },
  methods: {
    updateData (color, background, project) {
      this.color = color
      this.background = background
      this.project = project
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

