<template>
  <div class="container information">
    <keep-alive><Menu></Menu></keep-alive>
    <div class="information__inner">
      <div class="information--column">
        <div class="information__address information--block">
          <h2>Contact</h2>
          <p>
            <span>{{street}}</span>
            <span>{{postcode}} {{city}} ({{country}})</span>
          </p>
          <p>
            <a :href="'tel:' + phone ">{{phone}}</a>
            <a :href="'mailto:' + email ">{{email}}</a>
            <a :href="instagram">Instagram</a>
          </p>
        </div>
        <img
          v-if="images"
          :src="images[0].url"
          class="information__image"
        />
        <div class="information__about information--block">
          <p>{{about}}</p>
        </div>
      </div>
      <div class="information--column">
        <div class="information__clients information--block">
          <h2>Selected Clients</h2>
          <span v-for="client in clients" :key="client.client">{{client.client}}</span>
        </div>
        <div class="information__imprint information--block">
          <h2>Legal Notice</h2>
          <p>{{legalNotice}}</p>
          <span>Ust-Id: {{ustid}}</span>
          <span>Website by <a href="http://studioscholz.info" target="_blank">Studio Scholz</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Menu from '~/components/Menu.vue'

  export default {
    name: 'Information',
    components: {
      Menu
    },
    async asyncData ({ app }) {
      let {data} = await app.$axios.get('/pages/information')
      let information = data.data.content

      data = await app.$axios.get('/pages/information/files')
      let images = data.data.data

      return {
        information: information,
        images: images
      }
    },
    computed: {
      street () {
        return this.information.street
      },
      postcode () {
        return this.information.postcode.toString()
      },
      city () {
        return this.information.city
      },
      country () {
        return this.information.country
      },
      email () {
        return this.information.email
      },
      phone () {
        return this.information.phone
      },
      ustid () {
        return this.information.ustid
      },
      clients () {
        return this.information.clients
      },
      legalNotice () {
        return this.$store.state.siteInfo.content.legal
      },
      about () {
        return this.information.about
      },
      instagram () {
        return this.information.instagram
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "~/assets/sass/variables.sass"

  .information
    // color: $colored
    min-height: 100vh
    &__inner
      width: 100%
      padding: $mp-d + $mp-c 0 50px 0
      display: flex
    &--column
      max-width: 650px
      width: 50%
      padding: 0 $mp-a 0 $mp-c
      &:first-child
        padding: 0 $mp-c 0 $mp-a

    &--block
      margin-bottom: $lh-m
    &__image
      width: 100%
      // max-width: 600px
    &__about
      @include fs-s()
    &__address
      span
        display: block
      p
        display: block
        margin-bottom: $lh-m
        a
          display: block
    &__clients
      span
        display: inline
        &:after
          content: ", "
    &__imprint
      span
        display: block
      p
        margin-bottom: $lh-m

</style>

