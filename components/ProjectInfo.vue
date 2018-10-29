<template>
  <div
    class="project__info--wrapper"
    @click.self="showImages()"
  >
    <div class="project__info">
      <div class="project__info--title">
        <span class="nobr">{{ project.title }}</span>
        <span class="nobr italic">{{ project.content.client }}</span>
      </div>
      <div class="project__info--description">
        {{ project.content.description }}
      </div>
    </div>
    <ProjectMenu
      :project="project"
      :next-project="nextProject"
      :prev-project="prevProject"
      class="project__menu"
    />
    <ProjectThumbs
      :layouts="layouts"
      :images="images"
    />
  </div>
</template>

<script>
  import ProjectMenu from '~/components/ProjectMenu'
  import ProjectThumbs from '~/components/ProjectThumbs'

  export default {
    name: 'ProjectInfo',
    components: {
      ProjectMenu,
      ProjectThumbs
    },
    props: ['project', 'layouts', 'images', 'nextProject', 'prevProject'],
    methods: {
      showImages () {
        this.$router.push({ path: 'images' })
      }
    }
  }
</script>

<style lang="sass">
  .project
    &__menu
      position: fixed
      top: 0
      right: 0
      display: block
      padding: $mp-a $mp-c/2
      @include nobr()
    &__info
      display: flex
      pointer-events: none
      &--wrapper
        width: 100vw
        min-height: 100vh
        padding: $mp-a $mp-c/2
        z-index: 99
        @include pointer()
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
        padding: 0 229px 0 0
        cursor: default

  @media (max-width: $tablet-ls)
    .project
      &__info
        &--title
          flex-direction: column

  @media (max-width: $tablet-pt)
    .project
      &__menu
        position: relative
        padding: $lh-m 0 0 0
      &__info
        flex-direction: column
        &--title
          flex-direction: column
          span
            display: block
        &--description
          padding: $lh-m 0 0 0


</style>
