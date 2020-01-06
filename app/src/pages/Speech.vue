<template>
  <q-page  class="flows container-fluid">
    <!-- content -->
    <p>Hallo world</p>
    <SpeechComp />
  </q-page>
</template>

<script>
import SpeechComp from 'components/SpeechComp.vue'

export default {
  name: 'Speech',
  props: {
    msg: String
  },
  data () {
    return {
      loading: false
    }
  },
  components: {
    SpeechComp
  },

  computed: {
    services () {
//      return this.$store.state.services.services
    }
  },

  created () {
    this.loading = true
    console.log("created speech")
/*    this.$store.dispatch('services/fetchServices')
      .then(services => {
        this.loading = false
      })
      */
  }

}
</script>
