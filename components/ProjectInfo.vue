<template>
  <div class="project__info" v-if="showInfo" @click="hideInfo">
    <div class="project__title">
      <span>{{project.title}}</span><br>
      <span class="nobr italic">{{project.content.client}}</span>
    </div>
    <div class="project__description">{{project.content.description}}</div>
  </div>
</template>

<script>
  export default {
    name: 'ProjectInfo',
    props: ['project', 'showInfo'],
    methods: {
      hideInfo () {
        this.$emit('infoChanged', false)
      }
    }
  }
</script>

<style lang="sass">
@import "../assets/sass/variables.sass"

.project
  &__info
    position: fixed
    top: 0
    left: 0
    height: 100vh
    width: 100vw
    display: flex
    align-items: center
    justify-content: center
    flex-wrap: wrap
    flex-direction: column
    padding: $mp-a
    z-index: 99
    @include pointer()
    background: rgba(255,255,255,0.9)
  &__title
    display: inline-block
    @include center()
    span
      display: inline-block
      // background: $white
      padding: 0 $mp-a
  &__description
    max-width: 600px
    display: inline-block
    // background: $white
    margin: $lh-m 0 0 0
    padding: 0 $mp-a
    // height: 100%
    // display: flex
    // align-items: center
    @include fs-m()

</style>