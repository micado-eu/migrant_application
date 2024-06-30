<template>
  <q-page v-cloak padding>
    <p>
      {{ message }}
    </p>
  </q-page>
</template>

<script>
import client from "api-user-client";
import storeMappingMixin from "../../mixin/storeMappingMixin";

export default {
  name: "Verification",
  data() {
    return {
      token: "",
      message: "",
    };
  },
  mixins: [
    storeMappingMixin({
      getters: {
        user: "auth/user",
      },
      actions: {
        fetchSpecificUser: "user/fetchSpecificUser",
        saveUser: "user/saveUser",
      },
    }),
  ],
  mounted() {
    this.verifyUser();
    console.log(window.location.href);
    // this.$router.push({ name: "home" });
    //this.register()
  },
  methods: {
    register() {
      console.log("I AM IN AFTER VALIDATION AND REGISTERING THE USER");
      var payload = {
        email: this.user.email,
        name: this.user.id,
        username: this.user.id,
        password: "kHLAuxDmXz8e",
      };
    },
    verifyUser() {
      console.log("verifying the user");
      console.log(this.$store.state.auth.user);
      // here we need to check if the user exists in the DB of MICADO or is a newly registered user, in this case we need to create the user in the DB of MICADO
      if (this.$store.state.auth.user != null) {
        console.log("user exists in auth now check the DB");
        this.fetchSpecificUser(this.$store.state.auth.user.sub)
          .then((user) => {
            console.log(user);
            if (user === undefined) {
              console.log("user does not exist in DB");
              let registeredUser = {
                id: this.$store.state.auth.user.sub,
                realm: "migrant",
              };
              this.saveUser(registeredUser);
            }
          })
          .catch((err) => {
            console.log("verifyUser error");
            console.log(err);
          });
        this.$router.push({ name: "home" });
      }

      /*const hashes = this.$route.hash.slice(this.$route.hash.indexOf('#') + 1).split('&');

      let identity_response = hashes.reduce((acc, hash) => {
        // eslint-disable-next-line
        const [key, val] = hash.split('=');
        console.log(key)
        return {
          ...acc,
          [key]: val
        };
      }, {});

      console.log(hashes)
      console.log(identity_response)
      // https://localhost:9443/oidc/logout?id_token_hint=<id_token>&post_logout_redirect_uri=<redirect URI>&state=<state>
      let id_token = JSON.parse(atob(identity_response.id_token.split('.')[1]));
      let access_token = identity_response.access_token

      console.log('pagina di validate')
      console.log(this.$route)
      console.log(id_token)
      console.log(access_token)
      let tenant = this.$migrant_tenant
      console.log("before fetching the user")
      client.fetchUser(id_token.sub, tenant)
        .then(response => {
          console.log("response from getting internal user id")
          console.log(response)
          id_token.umid = response[0].umId
          this.$store.commit('auth/setUser', id_token)
          this.$store.dispatch('auth/setToken', {
            token: identity_response,
            rememberMe: false
          })
        })

      this.$store.commit('auth/setUser', id_token)
      this.$store.dispatch('auth/setToken', {
        token: identity_response,
        rememberMe: false
      })*/

      /*
            this.token = this.$route.query.token
      
            this.$auth.verify(this.token).then((response) => {
              this.message = this.$i18n.t('auth.verification=.verification_success')
            })
              .catch((error) => {
                if (error.response) {
                  if (error.response.status === 422) {
                    this.message = this.$i18n.t('auth.verification.verification_failed')
                  }
                }
                console.error(error)
              })
              */
    },
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
