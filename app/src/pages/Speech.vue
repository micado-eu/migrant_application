<template>
  <q-page  class="flows container-fluid">
    <!-- content -->
    <p>Hallo world</p>
    <SpeechComp />
    <SpeechSynt text="prova di dialogo" lang="it-IT" />
  </q-page>
</template>

<script>
import SpeechComp from 'components/SpeechComp.vue'
import SpeechSynt from 'components/SpeechSynt'

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
    SpeechComp,  SpeechSynt
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
