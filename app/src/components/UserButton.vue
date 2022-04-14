<template>
  <q-btn color="white" @click="routing()" round>
    <q-avatar
      size="42px"
      data-cy="userButton"
    >
      <q-icon
        v-if="!this.$auth.loggedIn() || !this.userpic"
        name="img:statics/icons/Icon (Header) - Profile Avatar.svg"
      />
      <img
        v-if="this.$auth.loggedIn()"
        :src="this.userpic"
      />
    </q-avatar>
   <!-- <q-menu
      anchor="bottom left"
      self="top right"
    >
      <q-item
        v-if="!this.$auth.loggedIn()"
        @click="toLogin()"
        clickable
        data-cy="login"
        v-close-popup
      >
        <q-item-section>{{$t('desc_labels.login_register')}}</q-item-section>
      </q-item>
      <q-item
        v-if="this.$auth.loggedIn()"
        @click="toLogout()"
        data-cy="logout"
        clickable
      >
        <q-item-section>{{$t('desc_labels.logout')}}</q-item-section>
      </q-item>
      <q-item
        @click="toSettings()"
        clickable
        data-cy="settings"
      >
        <q-item-section>{{$t('desc_labels.settings')}}</q-item-section>
      </q-item>
    </q-menu>-->
  </q-btn>
</template>

<script>
import storeMappingMixin from '../mixin/storeMappingMixin'

export default {
  name: 'UserButton',
   mixins: [
    storeMappingMixin({
      getters: {
        user: 'user/users',
      }, actions: {
        fetchSpecificUser: 'user/fetchSpecificUser',
      }
    })

  ],
  data () {
    return {
      userpic:null
    }
  },
  methods: {
    routing(){
      if(!this.$auth.loggedIn()){
        this.toLogin()
      }
      else{
      this.$router.push({ name: 'profile' })
      }
    },
    toLogin () {
      this.$keycloak.login()

      /*
      let d = new Date()
      let t = d.getTime()

      //      let aut_url = "https://identity.micado.csi.it/oauth2/authorize" + "?client_id=" + "tYvjG7o_50SYIRXl3ny_QqTZZzsa" + "&response_type=id_token token&scope=openid&nonce=" + t + "&redirect_uri=http://localhost:8080/callback"
      //      let aut_url = "https://localhost:9443/oauth2/authorize" + "?client_id=" + "Ez9iXQbVGu6vdad24xgb_rRt9Yga" + "&response_type=id_token token&scope=openid&nonce=" + t + "&redirect_uri=http://localhost:8080/callback"
      //      let aut_url = "https://localhost:9443/oauth2/authorize" + "?client_id=" + "pSoOnCk41wDduPOHkwmro42cfgUa" + "&response_type=id_token token&scope=openid&nonce=" + t + "&redirect_uri=http://localhost:8080/gioppo"
// good
//let aut_url = "https://identity.micadoproject.eu/oauth2/authorize" + "?client_id=" + "6E6Gps3pfRJbzdrjxBiRYSNUVuoa" + "&response_type=id_token token&scope=openid&nonce=" + t + "&redirect_uri=http://localhost:8080/gioppo"
      let aut_url = "https://identity.micadoproject.eu/oauth2/authorize" + "?client_id=" + "6E6Gps3pfRJbzdrjxBiRYSNUVuoa" + "&response_type=id_token token&scope=openid&nonce=" + t + "&redirect_uri=https://migrants.micadoproject.eu/gioppo"

      // curl -X POST --basic -u "<client id>:<client secret>" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "token=<token to revoke>&token_type_hint=access_token" https://localhost:9443/oauth2/revoke

      console.log(aut_url)
      window.location = aut_url
*/
    },
    toLogout () {
      console.log("LOGGING OUT")
      this.$auth.logout()
    },
    toSettings () {
      //console.log("LOGGING OUT")
      this.$router.push({ name: 'profile' })
    }
  },
   created () {
    //var userId = this.$store.state.auth.user.umid
    if(this.$store.state.auth.user != null){
          this.fetchSpecificUser( this.$store.state.auth.user.umid).then((user)=>{
      if(user.userPicture){
        this.userpic= this.user.userPicture.picture
      }
      else{
        this.userpic= null
      }
    })
    }

  }
}
</script>
