<template>
  <nav class="menu__wrapper">
    <ol class="menu__list">
      <li class="menu__list--item">
        <nuxt-link :to="'/' + prevProject.id + '/overview'" class="menu__list--prev">Previous</nuxt-link>
      </li>
      <li class="menu__list--item">
        <nuxt-link :to="'/' + nextProject.id + '/overview'" class="menu__list--next">Next</nuxt-link>
      </li>
      <li class="menu__list--item">
        <nuxt-link class="menu__list--all" to="/projects">Close</nuxt-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'ProjectMenu',
  props: ['project', 'nextProject', 'prevProject'],
}
</script>

<style lang="sass" scoped>
  @import "~/assets/sass/variables.sass"

  .menu
    &__wrapper
      position: fixed
      top: 0
      right: 0
      display: block
      padding: $mp-a $mp-c/2
      @include nobr()
    &__list
      list-style: none
      display: flex
      &--item
        display: inline-block
        margin-left: $mp-b
      &--prev
        cursor: w-resize
      &--next
        cursor: e-resize
    &__project--info
      cursor: pointer


</style>

