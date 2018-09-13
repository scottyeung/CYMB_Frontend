<template>
    <nav class="menu__wrapper" :class="color">
      <ol class="menu__list" @mouseover="changeMenu(true)" @mouseleave="changeMenu(false)">
          <li v-if="!$store.state.showMenu">Constantin Mirbach</li>
          <li v-if="$store.state.showMenu"><nuxt-link to="/projects">(Projects)</nuxt-link></li>
          <li v-if="$store.state.showMenu"><nuxt-link to="/information">(Information)</nuxt-link></li>
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
      padding: $mp-b $mp-c
      @include center()
      z-index: 90
      position: fixed
      &.white
        @include white()
    &__list
      display: inline-block
      list-style: none
      li
        display: inline-block
        margin: 0 $mp-c/2
</style>

