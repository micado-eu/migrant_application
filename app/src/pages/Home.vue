<template>
  <q-page padding>
    <!-- content -->
    Welcome {{token.sub}}
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      token: '',
      access_token: '',
      message: ''
    }
  },
  created () {
    const hashes = this.$route.hash.slice(this.$route.hash.indexOf('#') + 1).split('&');

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
    this.token = JSON.parse(atob(identity_response.id_token.split('.')[1]));
    this.access_token = identity_response.access_token

    console.log('pagina utente')
    console.log(this.$route)
    console.log(this.token)
    console.log(this.access_token)
    /*
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
  }
}
</script>
