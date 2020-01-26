<template>
  <q-page padding>
    <q-card >
        <q-card-section>
          <div class="text-h6">Online documents generator</div>
        </q-card-section>
        <q-list dense bordered padding class="rounded-borders">
          <q-item clickable v-ripple @click="selected()">
            <q-item-section>
              Curriculum Vitae
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple >
            <q-item-section>
              Family status autocertification
            </q-item-section>
          </q-item>

        </q-list>
    </q-card>

    <q-card :class="visible">
      <FormManager />
    </q-card>
  </q-page>
</template>

<script>
import FormManager from 'components/FormManager'

export default {
  // name: 'PageName',
  components: {
      FormManager
  },
  data () {
    return {
      visible: 'hidden'
    }
  },
  methods: {
      selected() {
        this.visible = ''
      },
      getfile() {
        console.log("before getting")
        this.$axios.post("http://localhost:5488/api/report",
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
  url: 'http://localhost:5488/api/report',
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
  }
}
</script>
