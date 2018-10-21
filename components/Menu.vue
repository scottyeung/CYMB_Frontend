<template>
  <nav class="menu__wrapper">
    <ol class="menu__list">
      <li class="menu__nav">
        <a class="menu__nav--title">Constantin Mirbach</a>
      </li>
      <li class="menu__nav">
        <nuxt-link
          class="menu__nav--projects"
          to="/projects"
        >Projects</nuxt-link>
        <nuxt-link
          class="menu__nav--about"
          to="/information"
        >About</nuxt-link>
      </li>
    </ol>
  </nav>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'Menu',

    methods: {
      ...mapMutations([
        'changeMenu'
      ])
    }
  }
</script>

<style lang="sass" scoped>
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
    &__nav
      margin-right: $mp-c
      &--projects
        &:after
          content: ", "
</style>

