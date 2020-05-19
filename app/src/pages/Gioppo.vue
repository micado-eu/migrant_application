<template>
  <q-page class="flex flex-center">
    <img
      alt="Micado logo"
      src="~assets/micado-logo.png"
    >
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
    if (this.created) {
      console.log(this)
    } else {
      // here we need to redirect to Identity Server
      let d = new Date()
      let t = d.getTime()

      //      let aut_url = "https://identity.micado.csi.it/oauth2/authorize" + "?client_id=" + "tYvjG7o_50SYIRXl3ny_QqTZZzsa" + "&response_type=id_token token&scope=openid&nonce=" + t + "&redirect_uri=http://localhost:8080/callback"
      //      let aut_url = "https://localhost:9443/oauth2/authorize" + "?client_id=" + "Ez9iXQbVGu6vdad24xgb_rRt9Yga" + "&response_type=id_token token&scope=openid&nonce=" + t + "&redirect_uri=http://localhost:8080/callback"
      //      let aut_url = "https://localhost:9443/oauth2/authorize" + "?client_id=" + "pSoOnCk41wDduPOHkwmro42cfgUa" + "&response_type=id_token token&scope=openid&nonce=" + t + "&redirect_uri=http://localhost:8080/gioppo"
      let aut_url = "https://identity.micadoproject.eu/oauth2/authorize" + "?client_id=" + "6E6Gps3pfRJbzdrjxBiRYSNUVuoa" + "&response_type=id_token token&scope=openid&nonce=" + t + "&redirect_uri=http://localhost:8080/gioppo"

      // curl -X POST --basic -u "<client id>:<client secret>" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "token=<token to revoke>&token_type_hint=access_token" https://localhost:9443/oauth2/revoke

      console.log(aut_url)
      window.location = aut_url
    }
  }
}
</script>
