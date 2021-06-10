<template>
  <div class="services">
    <span v-if="loading">{{$t('desc_labels.loading')}}</span>
    <div v-else class="container">
      <div class="row" >
        <ServiceItem v-for="service in services" :key="service.id" :theService="service">
        </ServiceItem>
      </div>
      <div class="row" v-if="($mq === 'mobile')">
          <b-list-group>
            <b-list-group-item v-for="service in services" :key="service.id" href="#" active class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ service.title }}</h5>
                <small>3 days ago</small>
              </div>

              <p class="mb-1">
                {{ service.text }}
              </p>
              <a :href="service.link" class="btn btn-primary">{{ service.button }}</a>
              <small>Donec id elit non mi porta.</small>
            </b-list-group-item>
            <b-list-group-item>
              <b-list-group>
                <b-list-group-item>Cras justo odio</b-list-group-item>
                <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
                <b-list-group-item>Morbi leo risus</b-list-group-item>
                <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
                <b-list-group-item>Vestibulum at eros</b-list-group-item>
              </b-list-group>
            </b-list-group-item>
          </b-list-group>
          <b-dropdown split split-variant="outline-primary" variant="primary">
            <template slot="button-content">
              <span class="house-mobile">Custom</span> <strong>Content</strong> with <em>HTML</em> via Slot
            </template>
            <b-dropdown-item href="#">An item</b-dropdown-item>
            <b-dropdown-item href="#">Another item</b-dropdown-item>
          </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceItem from 'components/ServiceItem'

export default {
  name: 'Services',
  props: {
    msg: String
  },
  data () {
    return {
      loading: false
    }
  },
  components: {
    ServiceItem
  },

  computed: {
    services () {
      return this.$store.state.services.services
    }
  },

  created () {
    this.loading = true
    this.$store.dispatch('services/fetchServices')
      .then(services => {
        this.loading = false
      })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.house{
width: 18rem;
background-size: 10%;
  background-repeat: no-repeat;
  background-image:
    url(../assets/house.svg);
  background-position:
    top left;
}
.house-mobile{
width: 20px;
padding-left: 20px;
background-size: 20px;
  background-repeat: no-repeat;
  background-image:
    url(../assets/house.svg);
  background-position:
    middle center;
}
.health{
width: 18rem;
background-size: 10%;
  background-repeat: no-repeat;
  background-image:
    url(../assets/doctor.png);
  background-position:
    top left;
}
.work{
width: 18rem;
background-size: 10%;
  background-repeat: no-repeat;
  background-image:
    url(../assets/work.png);
  background-position:
    top left;
}
.edu{
width: 18rem;
background-size: 10%;
  background-repeat: no-repeat;
  background-image:
    url(../assets/education.png);
  background-position:
    top left;
}
</style>
