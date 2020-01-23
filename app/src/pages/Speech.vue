<template>
  <q-page  class="flows container-fluid">
    <!-- content -->
    <p>Hallo world</p>
    <SpeechSynt text="prova di dialogo" lang="it-IT" />
    <q-btn
      @click="getfile()"
      round
    />
  </q-page>
</template>

<script>
//import SpeechComp from 'components/SpeechComp.vue'
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
      SpeechSynt
  },
  methods: {
      getfile() {
        console.log("before getting")
        this.$axios.post("http://jsreport:5488/api/report",
        {
"template": { "name": "/micado/test" },
"data": {
  "name": "Jan Blaha",
  "email": "jan.blaha@jsreport.net",
  "phone": "+420777271254",
  "description": "I am software developer, software architect and consultant with over 8 years of professional experience working on projects for cross domain market leaders. My experience covers custom projects for big costumers in the banking or electricity domain as well as cloud based SaaS startups.",
  "experiences": [{
      "title": ".NET Developer",
      "company": "Contoso",
      "from": "1.1.2010",
      "to": "15.5.201"
  }, {
      "title": "Solution Architect",
      "company": "Simplias",
      "from": "15.5.2012",
      "to": "now"
  }],
  "skills": [{
      "title": "The worst developer ever"
  }, {
      "title": "Don't need to write semicolons"
  }]
}
} ,{
  url: 'http://jsreport:5488/api/report',
  method: 'POST',
  headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS', "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
  responseType: 'blob', // important
}).then((response) => {
console.log("get answer")
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'file.pdf');
  document.body.appendChild(link);
  link.click();
})
      }
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
