<template>
    <formio :form="form"  options="" v-on:submit="submit"></formio>
</template>

<script>
import { Form } from 'vue-formio';
export default {
  // name: 'ComponentName',
  components: { formio: Form },
  data () {
    return {
      form: {
  components: [
    {
      type: 'textfield',
      key: 'name',
      label: 'Name',
      placeholder: 'Enter your name.',
      input: true
    },
    {
      type: 'textfield',
      key: 'email',
      label: 'eMail',
      placeholder: 'Enter your email',
      input: true
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
}
    }
  },
  methods: {
    submit(submission) {
     console.log(submission)
     let data = {
       "name": submission.data.name,
       "email": submission.data.email,
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
     this.getFile("/micado/test", data, "mycv.docx")
    },
    getFile(report, data, filename){
      console.log(report)
      console.log(data)
      console.log(filename)

      console.log("before getting")
      this.$axios.post("http://localhost:5488/api/report",
        {
          "template": { "name": report },
          "data": data
        } ,{
          url: 'http://localhost:5488/api/report',
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS', "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
          responseType: 'blob', // important
        }
      ).then((response) => {
        console.log("get answer")
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      })


    }
  }
}
</script>
