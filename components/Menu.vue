<template>
    <nav class="menu__wrapper" :class="color">
      <ol class="menu__list">
          <li class="menu__nav">
            <nuxt-link class="menu__nav--projects" to="/projects">Constantin Mirbach</nuxt-link>
          </li>
          <li class="menu__nav">
            <!-- <nuxt-link class="menu__nav--projects" to="/projects">Projects</nuxt-link> -->
            <nuxt-link class="menu__nav--about" to="/information">?</nuxt-link>
          </li>
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
      padding: $mp-a $mp-c/2
      z-index: 99
      position: absolute
    &__list
      list-style: none
      li
        display: inline-block
        float: left
    &__title
      // margin-right: $mp-c
      cursor: default
    &__nav
      margin-right: $mp-c
      &--about
        cursor: help
      // a:first-child
      //   &:after
      //       content: ", "
</style>

