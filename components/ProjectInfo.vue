<template>
  <transition name="fade--info">
    <div class="project__info" v-if="showInfo" @click.self="hideInfo">
      <div class="project__title">
        <span class="nobr">{{project.title}}&nbsp;</span>
        <span class="nobr italic">{{project.content.client}}</span>
      </div>
      <!-- <div class="project__client" v-if="project.content.client">
        <span class="nobr italic">{{project.content.client}}</span>
      </div> -->
      <div class="project__description">{{project.content.description}}</div>
      <ProjectMenu
        :project="project"
        :nextProject="nextProject"
        :prevProject="prevProject"
      />
    </div>
  </transition>
</template>

<script>
  import ProjectMenu from '~/components/ProjectMenu'

  export default {
    name: 'ProjectInfo',
    props: ['project', 'showInfo', 'layouts', 'images', 'nextProject', 'prevProject'],
    components: {
      ProjectMenu
    },
    methods: {
      hideInfo () {
        this.$emit('infoChanged', false)
      }
    }
  }
</script>

<style lang="sass">
@import "../assets/sass/variables.sass"

.fade--info
  &-leave-active, &-enter-active
    // transition: all .2s ease-in-out
  &-leave-to, &-enter
    opacity: 0

.project
  &__info
    position: fixed
    top: 0
    left: 0
    height: 100vh
    width: 100vw
    display: flex
    align-items: flex-start
    padding: $mp-a $mp-c/2
    z-index: 99
    @include pointer()
    // @include white()
    // background: $transparent
  &__title
    display: block
    span
      display: block
    margin: 0 $mp-c 0 0
  &__description
    max-width: 750px
    margin: 0 $mp-c 0 0
    display: inline-block

</style>