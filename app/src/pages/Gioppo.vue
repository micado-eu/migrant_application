<template>
  <q-page class="flex flex-center">
    <img alt="Micado logo" src="~assets/micado-logo.png">
    Migrant Application - powered by MICADO
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      logged: false
    }
  },
  created () {
    if(this.created){
      console.log(this)
    }else{
      // here we need to redirect to Identity Server
      let d = new Date()
      let t = d.getTime()

      let aut_url = "https://identity.micado.csi.it/oauth2/authorize" + "?client_id=" + "tYvjG7o_50SYIRXl3ny_QqTZZzsa" + "&response_type=id_token token&scope=openid&nonce=" + t + "&redirect_uri=http://localhost:8080/callback"
      console.log(aut_url)
      window.location = aut_url
    }
  }
}
</script>
