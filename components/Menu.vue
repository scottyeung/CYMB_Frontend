<template>
    <nav class="menu__wrapper" :class="color">
      <span @mouseenter="changeMenu()" @mouseleave="changeMenu()">
        <ol class="menu__list" v-if="!showMenu">
          <li><nuxt-link to="/">Conny Mirbach</nuxt-link></li>
        </ol>
        <ol class="menu__list" v-else-if="showMenu">
        <li><nuxt-link to="/projects">Projects</nuxt-link>,</li>
        <li><nuxt-link to="/information">Information</nuxt-link></li>
        </ol>
      </span>
    </nav>
</template>

<script>
export default {
  name: 'Menu',
  props: ['color'],
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    changeMenu () {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/variables.sass"

  .menu
    &__wrapper
      width: 100vw
      margin: $mp-b 0
      @include center
      z-index: 90
      position: absolute
      span
        display: inline-block;
      &.white
        color: $white
      &.black
        color: $black
    &__list
      display: block
      list-stlye: none
      li
        display: inline-block
</style>

