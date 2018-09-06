<template>
    <nav class="menu__wrapper" :class="color">
      <span @mouseover="changeMenu(true)" @mouseleave="changeMenu(false)">
        <ol class="menu__list" v-if="!$store.state.showMenu">
          <li>Constantin Mirbach</li>
        </ol>
        <ol class="menu__list" v-else-if="$store.state.showMenu">
          <li>Constantin Mirbach</li>
          <li><nuxt-link to="/projects">Projects</nuxt-link></li>
          <li><nuxt-link to="/information">Information</nuxt-link></li>
        </ol>
      </span>
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
      margin: $mp-c 0
      padding: 0 $mp-d
      @include center()
      z-index: 90
      position: fixed
      span
        display: inline-block;
      &.white
        @include white()
    &__list
      display: block
      list-stlye: none
      li
        display: inline
        &:after
          content: ", "
        &:last-child:after
          content: ""
</style>

