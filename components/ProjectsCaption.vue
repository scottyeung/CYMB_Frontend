<template>
  <div class="projects__caption">
    <nuxt-link :to="project.id">
      <span class="projects__c__title">{{ projectTitle }}</span>
      <span class="nobr italic">{{ projectSecondary }}</span>
    </nuxt-link>
  </div>
</template>

<script>

export default {
	name: 'IndexCaption',
  props: ['project'],
  computed: {
    projectTitle () {
      return this.project.title
    },
    projectSecondary () {
      if(this.project.content.client.length > 0 && this.project.content.client !== this.project.title) {
        return this.project.content.client
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/variables.sass"

  .projects__caption
    @include center()
    @include fs-s()
    padding: 0
    span
      display: block;

  .projects__c__title 
    padding-right: 10px

</style>

