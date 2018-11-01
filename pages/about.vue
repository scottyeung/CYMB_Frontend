<template>
  <div class="container information">
    <Menu/>
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
          <p>{{ description }}</p>
        </div>
      </div>
      <div class="information__column">
        <div class="information__clients information--block">
          <h2>Selected Clients</h2>
          <li v-for="client in clients" :key="client.client">{{ client.client }}</li>
        </div>
        <div class="information__legal information--block">
          <p>
            <span>VAT identification number: {{ ustid }}</span>
            <span>Tax reference number: {{ taxno }}</span>
          </p>
          <p>{{ legalNotice }}</p>
          <span v-html="copyright"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Menu from '~/components/Menu.vue'

  export default {
    name: 'About',
    components: {
      Menu
    },
    computed: {
      about () {
        return this.$store.state.about
      },
      images () {
        return this.about.images
      },
      street () {
        return this.about.street
      },
      postcode () {
        return this.about.postcode.toString()
      },
      city () {
        return this.about.city
      },
      country () {
        return this.about.country
      },
      email () {
        return this.about.email
      },
      phone () {
        return this.about.phone
      },
      ustid () {
        return this.about.ustid
      },
      taxno () {
        return this.about.taxno
      },
      clients () {
        return this.about.clients
      },
      legalNotice () {
        return this.$store.state.siteInfo.content.legal
      },
      copyright () {
        return this.$store.state.siteInfo.content.copyright
      },
      description () {
        return this.about.about
      },
      instagram () {
        return this.about.instagram
      }
    },
    head() {
      return {
        titleTemplate: '%s: About',
        meta: [
          { name: 'format-detection', content: 'telephone=no' },
        ]
      }
    }
  }
</script>

<style lang="sass" scoped>
  .information
    &__inner
      width: 100%
      padding: $mp-d + $mp-c 0 $mp-c/2 0
      display: flex
    &__column
      max-width: 720px
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
      li
        list-style: none
        display: inline
        @include nobr()
        &:after
          content: ", "
          white-space: pre-line
        &:last-child:after
          content: ""
    &__legal
      padding: $lh-m 0 0 0
      margin-bottom: 0
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
        padding-top: $mp-c*2
        display: block
      &__column
        width: 100%
        padding: 0 $mp-c/2
        &:first-child
          padding: 0 $mp-c/2 $lh-m $mp-c/2

  @media (max-width: $phone-ls)
    .information
      &__inner
        padding-top: $mp-d

  @media (max-width: $phone-pt)
    .information
      &__address
        p
          margin-right: 0
          width: 100%

</style>

