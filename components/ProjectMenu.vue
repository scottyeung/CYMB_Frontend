<template>
  <nav class="menu__wrapper">
      <ol class="menu__list">
        <li class="menu__list--item">
          <nuxt-link class="menu__list--prev" :to="'/' + prevProject.id">Previous</nuxt-link>
        </li>
         <li class="menu__list--item">
          <nuxt-link class="menu__list--next" :to="'/' + nextProject.id">Next</nuxt-link>
        </li>
        <li class="menu__list--item">
          <nuxt-link class="menu__list--all" to="/projects">Close</nuxt-link>
        </li>
      </ol>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ProjectMenu',
  props: ['project', 'nextProject', 'prevProject'],
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/variables.sass"

  .menu
    &__wrapper
      display: block
      margin-left: auto
      @include nobr()
    &__list
      list-style: none
      &--item
        display: inline-block
        margin-left: $mp-a
        // &:after
        //   content: ", "
        // &:last-child:after
        //   content: ""
    &__project--info
      cursor: pointer
      
      
</style>

