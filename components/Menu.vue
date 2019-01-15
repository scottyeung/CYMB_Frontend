<template>
  <nav class="menu__wrapper">
    <ol class="menu__list">
      <li class="menu__nav">
        <h1 class="menu__nav--title">Constantin Mirbach</h1>
      </li>
      <li class="menu__nav">
        <nuxt-link
          class="menu__nav--projects"
          to="/"
        >Projects</nuxt-link>
        <nuxt-link
          class="menu__nav--about"
          to="/about"
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
      background: $white
    &__list
      list-style: none
      display: flex
      flex-wrap: wrap
    &__nav
      &--title
        margin-right: $mp-c
      &--projects
        &:after
          content: ", "

  @media (max-width: $phone-pt)
    .menu
      &__nav
        &--title
          margin-right: 0
        &:nth-child(2)
          margin-left: auto
</style>

