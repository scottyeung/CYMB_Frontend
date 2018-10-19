<template>
  <div
    class="project__info--wrapper"
    @click.self="showImages()"
  >
    <ProjectMenu
      :project="project"
      :next-project="nextProject"
      :prev-project="prevProject"
    />
    <div class="project__info">
      <div class="project__info--title">
        <span class="nobr">{{ project.title }}</span>
        <span class="nobr italic">{{ project.content.client }}</span>
      </div>
      <div class="project__info--description">
        {{ project.content.description }}
      </div>
    </div>
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
    &__info
      display: flex
      pointer-events: none
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
        padding: 0 229px 0 0
        cursor: default

</style>
