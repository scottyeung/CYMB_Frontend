<template>
  <transition name="fade--info">
    <div class="project__info--wrapper" v-if="$store.state.infoVisible" @click.self="setInfo(false)">
      <ProjectMenu
        :project="project"
        :nextProject="nextProject"
        :prevProject="prevProject"
      />
      <div class="project__info">
        <div class="project__info--title">
          <span class="nobr">{{project.title}}</span>
          <span class="nobr italic">{{project.content.client}}</span>
        </div>
        <div class="project__info--description">
          {{project.content.description}}
        </div>
      </div>
      <ProjectThumbs
        :layouts="layouts"
        :images="images"
      />
    </div>
  </transition>
</template>

<script>
  import ProjectMenu from '~/components/ProjectMenu'
  import ProjectThumbs from '~/components/ProjectThumbs'
  import { mapMutations } from 'vuex'


  export default {
    name: 'ProjectInfo',
    props: ['project', 'layouts', 'images', 'nextProject', 'prevProject'],
    components: {
      ProjectMenu,
      ProjectThumbs
    },
    methods: {
      ...mapMutations([
        'setInfo'
      ]),
    },
  }
</script>

<style lang="sass">
@import "~/assets/sass/variables.sass"

.fade--info
  &-leave-active, &-enter-active
    // transition: all .2s ease-in-out
  &-leave-to, &-enter
    opacity: 0

.project
  &__info
    display: flex
    &--wrapper
      position: fixed
      top: 0
      left: 0
      height: 100vh
      width: 100vw
      padding: $mp-a $mp-c/2
      z-index: 99
      @include pointer()
      background: $transparent
    &--title
      margin-right: $mp-a
      display: flex
      flex-wrap: nowrap
      cursor: default
      span
        margin-right: $mp-b
        display: inline-block
    &--description
      max-width: 1200px
      padding: 0 195px 0 0
      cursor: default

</style>
