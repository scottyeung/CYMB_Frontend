<template>
  <div class="project__title">
    {{project.title}}
  </div>
</template>

<script>
  export default {
    name: 'ProjectInfo',
    props: ['project'],
  }
</script>

<style lang="sass">
@import "../assets/sass/variables.sass"

.project
  &__title
    position: fixed
    top: 0
    left: 0
    padding: $mp-a
    @include fs-s()


</style>