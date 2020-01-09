<template>
  <q-page padding>
    <q-btn-toggle
      flat
      color="green"
      toggle-color="yellow"
      v-model='locale'
      @input="setLocale"
      :options="[{ label: 'Ar', value: 'ar'},
                 { label: 'De', value: 'de'},
                 { label: 'En', value: 'en-us'},
                 { label: 'It', value: 'it'}]" />
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      locale: this.$q.lang.isoName
    }
  },
  methods: {
   setLocale (locale) {   // set the Vue-i18n locale
     this.$i18n.locale = locale
     // load the Quasar language pack dynamically
     import(`quasar/lang/${locale}`).then(({ default: messages }) => {
       this.$q.lang.set(messages)
     })
   }
  }
}
</script>
