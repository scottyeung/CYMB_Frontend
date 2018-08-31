<template>
    <nav class="menu__wrapper">
      Conny Mirbach
    </nav>
</template>

<script>
export default {
  name: 'Menu',
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/variables.sass"

  .menu
    &__wrapper
      width: 100vw;
      margin: $mp-a 0;
      @include center
      z-index: 90
      position: absolute
</style>

