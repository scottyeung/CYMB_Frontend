<template>
  <div class="container">
    <Menu></Menu>
    <div class="information">
      <div class="information__address information--block">
        <h2 class="italic">Contact</h2>
        <span><a :href="'tel:' + phone ">{{phone}}</a></span>
        <span><a :href="'mailto:' + email ">{{email}}</a></span>
      </div>
      <div class="information__clients information--block">
        <h2 class="italic">Clients</h2>
        <span v-for="client in clients">{{client.client}}</span>
      </div>
      <div class="information__imprint information--block">
        <h2 class="italic">Imprint</h2>
        <p class="information__address">
          <span>Constantin Mirbach</span>
          <span>{{street}}</span>
          <span>{{postcode}} {{city}}</span>
          <span>{{country}}</span>
        </p>
        <p>{{legalNotice}}</p>
        <span>Website by <a href="http://studioscholz.info" target="_blank">Studio Scholz</a></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/node_modules/axios'
import Menu from '~/components/Menu.vue'

export default {
  name: 'Information',
  components: {
    Menu
  },
  async asyncData ({ params }) {
    let { data } = await axios.get('http://127.0.0.1:8888/rest/pages/information')
    console.log({data})
    return { 
      information: data.data.content, 
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
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/variables.sass"

  .information
    width: 100%
    padding: $mp-c*2 $mp-b
    &__address
      span
        display: block
    &__clients
      span
        &:after
          content: ", "
        &:last-child:after
          content: ""

</style>

