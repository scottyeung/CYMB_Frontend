<template>
    <nav class="menu__wrapper" v-if="menuActive">
        <ol class="menu__list" v-if="!info">
          <li class="menu__project">
            <span>{{project.title}}</span><template v-if="project.content.client">, </template>
            <span v-if="project.content.client">{{project.content.client}}</span>
          </li>
          <!-- <li><a @click="showInfo(true)">(Project Info)</a></li>
          <li><nuxt-link to="/projects">(Close)</nuxt-link></li> -->
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
        this.menuActive = false
      } else if (this.scrollTop < this.lastScroll) {
        this.menuActive = true
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
      width: 100vw
      padding: $mp-b
      @include fs-m()    
      z-index: 99
      position: fixed
      top: 0
      display: flex
      align-items: center
      justify-content: center
    &__list
      list-style: none
      li 
        display: inline
        margin: 0 $mp-c/2
    &__project

    &__project-info
      @include center()
      @include pointer()
      
      
</style>

