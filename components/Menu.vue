<template>
    <nav class="menu__wrapper" :class="color">
      <ol class="menu__list">
          <li class="menu__title">Constantin Mirbach</li>
          <li><nuxt-link to="/projects">Projects</nuxt-link></li>
          <li><nuxt-link to="/information">Info & Contact</nuxt-link></li>
      </ol>
    </nav>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Menu',
  props: ['color', 'background'],
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    ...mapMutations([
      'changeMenu'
    ])
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/variables.sass"

  .menu
    &__wrapper
      width: 100vw
      padding: $mp-a $mp-c*2
      z-index: 99
      position: fixed
    &__list
      list-style: none
      li
        display: inline
        &:nth-child(2)
          &:after
            content: ", "
    &__title
      margin-right: $mp-b
</style>

