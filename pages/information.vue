<template>
  <div class="container information">
    <keep-alive><Menu/></keep-alive>
    <div class="information__inner">
      <div class="information__column">
        <div class="information__address information--block">
          <h2>Contact</h2>
          <p>
            <span>{{ street }}</span>
            <span>{{ postcode }} {{ city }}</span>
            <span>{{ country }}</span>
          </p>
          <p>
            <a :href="'tel:' + phone ">{{ phone }}</a>
            <a :href="'mailto:' + email ">{{ email }}</a>
            <a :href="'https://www.instagram.com/' + instagram" target="_blank">@{{ instagram }}</a>
          </p>
        </div>
        <img
          v-if="images"
          :src="images[0].url"
          class="information__image"
        >
        <div class="information__about information--block">
          <p>{{ about }}</p>
        </div>
      </div>
      <div class="information__column">
        <div class="information__clients information--block">
          <h2>Selected Clients</h2>
          <span v-for="client in clients" :key="client.client">{{ client.client }}</span>
        </div>
        <!-- <div class="information__tax information--block">
          <p>
            <span class="italic">VAT ID</span>
            <span>{{ ustid }}</span>
          </p>
          <p>
            <span class="italic">Tax ID</span>
            <span>{{ taxno }}</span>
          </p>
        </div> -->
        <div class="information__legal information--block">
          <p>{{ legalNotice }}</p>
          <span>VAT ID: {{ ustid }}</span>
          <span>TAX ID: {{ taxno }}</span>
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
    computed: {
      information () {
        return this.$store.state.information
      },
      images () {
        return this.information.images
      },
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
      taxno () {
        return this.information.taxno
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
  .information
    &__inner
      width: 100%
      padding: $mp-d + $mp-c 0 0 0
      display: flex
    &__column
      max-width: 650px
      width: 50%
      padding: 0 $mp-c/2 0 $mp-c
      &:first-child
        padding: 0 $mp-c 0 $mp-c/2
    &--block
      margin-bottom: $lh-m
    &__image
      width: 100%
    &__about
      @include fs-s()
    &__address
      span
        display: block
      p
        display: inline-block
        margin: 0 $mp-c $lh-m 0
        vertical-align: top
        & > :first-child
          width: 156.56px
        a
          display: block
    &__clients
      span
        &:after
          content: ", "
    &__legal
      padding: $lh-m 0 0 0
      @include fs-s()
      span
        display: block
      p
        margin-bottom: $lh-m
    &__tax
      display: flex
      p
        display: inline-block
        margin: 0 $mp-c 0 0
        span:first-child
          display: block

  @media (max-width: $tablet-ls)
    .information
      &__inner
        display: block
      &__column
        width: 100%
        padding: 0 $mp-c/2
        &:first-child
          padding: 0 $mp-c/2 $lh-m $mp-c/2

</style>

