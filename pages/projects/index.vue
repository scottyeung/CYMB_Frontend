<template>
  <div class="container">
    <Menu></Menu>
    <no-ssr>
      <ProjectsCards/>
    </no-ssr>
  </div>
</template>

<script>
import Menu from '~/components/Menu.vue'
import ProjectsCards from '~/components/ProjectsCards.vue'

export default {
  name: 'Projects',
  components: {
    Menu,
    ProjectsCards
  }
}
</script>

<style lang="sass">
@import "~/assets/sass/variables.sass"

</style>

