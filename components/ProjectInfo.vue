<template>
  <div
    class="project__info--wrapper"
    @click.self="showImages()"
  >
    <div class="project__info">
      <div class="project__info--title">
        <nuxt-link class="nobr" to="/">{{ project.content.title }}</nuxt-link>
        <h2 v-if="project.content.client" class="nobr">{{ project.content.client }}</h2>
      </div>
      <div v-if="project.content.description" class="project__info--description">
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
        a, h2
          margin-right: $mp-b
          display: inline-block
      &--description
        pointer-events: none
        padding: 0 229px 0 0
        cursor: default

  @media (max-width: $desktop)
    .project
      &__info
        &--title
          flex-direction: column
          a, h2
            margin-right: 0

  @media (max-width: $tablet-ls)
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
