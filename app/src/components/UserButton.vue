<template>
  <q-btn round>
    <q-avatar size="42px">
      <img src="https://cdn.quasar.dev/img/avatar2.jpg">
    </q-avatar>
    <q-menu
      anchor="bottom left"
      self="top right"
    >
      <q-item
        v-if="!this.$auth.check()"
        @click="toLogin()"
        clickable
        v-close-popup
      >
        <q-item-section>Login/Register</q-item-section>
      </q-item>
      <q-item v-if="this.$auth.check()">
        <q-item-section>Logout</q-item-section>
      </q-item>
      <q-item v-if="this.$auth.check()">
        <q-item-section>Settings</q-item-section>
      </q-item>
    </q-menu>
    <!--
    <q-list>
      <q-item
        clickable
        v-close-popup
      >
        <q-item-section>
          <q-item-label>Login/Register</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-close-popup
      >
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-close-popup
      >
        <q-item-section>
          <q-item-label>Settings</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    -->
  </q-btn>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  methods: {
    toLogin () {
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
