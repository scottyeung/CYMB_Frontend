<template>
    <nav class="menu__wrapper" v-if="menuActive">
        <ol class="menu__list" v-if="!info">
          <li class="menu__title italic" @click="showInfo(true)">
            <span>{{project.title}}</span>
            <span v-if="project.content.client">({{project.content.client}})</span>
          </li>
          <li><nuxt-link to="/projects">Projects</nuxt-link></li>
          <li><nuxt-link to="/information">Info & Contact</nuxt-link></li>
        </ol>
        <ol class="menu__list" v-if="info" @mouseleave="showMenu(false), showInfo(false)">
          <li class="menu__project-info" @click="showInfo(false)">{{project.content.description}}</li>
        </ol>
    </nav>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ProjectMenu',
  props: ['project'],
  data () {
    return {
      info: false,
      menu: false,
      menuActive: true,
      scrollTop: 0,
      lastScroll: 0
    }
  },
  methods: {
    showInfo (boolean) {
      this.info = boolean
    },
    showMenu (boolean) {
      this.menu = boolean
    },
    handleScroll () {
      this.scrollTop = window.scrollY

      // Hide and show menu
      if (this.scrollTop > this.lastScroll) {
        // this.menuActive = false
      } else if (this.scrollTop < this.lastScroll) {
        // this.menuActive = true
      }

      //Save last scroll
      this.lastScroll = this.scrollTop
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/variables.sass"

  .menu
    &__wrapper
      @include fs-s()
      width: 100vw
      padding: $mp-a $mp-b
      z-index: 99
      position: fixed
    &__list
      list-style: none
      li 
        display: inline
        &:nth-child(2)
          @include pointer()
          &:after
            content: ", "
    &__title
      margin-right: $mp-b
      cursor: help
    &__project-info
      @include pointer()
      
      
</style>

