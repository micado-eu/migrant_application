<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Language" :color="color" @click="layout = true" />

    <q-dialog v-model="layout">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Language</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding>
            <div class="q-gutter-lg row"  v-for="i in Math.ceil(langOptions.length / 4)">
              <div class="q-gutter-xs col" v-for="language in langOptions.slice((i - 1) * 4, i * 4)" style="text-align:center" :id="language.value" @click="getValue($event)" >
              <q-btn v-close-popup>
                <q-avatar size="42px">
                  <img src="~assets/micado-logo.png" />
                </q-avatar>
              </q-btn>
                <p>
                {{language.label}}
                </p>
              </div>
            </div>
            <p> Please, select a language </p>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      layout: false,
      lang: this.$i18n.locale, 
      langOptions: [
        { value: 'en-us', label: 'English'},
        { value: 'de', label: 'German'},
        { value: 'ar', label: 'Arabic'},
        { value: 'it', label: 'Italian'},
        { value: 'en-us', label: 'English'},
        { value: 'de', label: 'German' },
        { value: 'ar', label: 'Arabic' },
        { value: 'it', label: 'Italian'}
      ],
      color: "primary"
    }
  },
  methods: {
    getValue(event) {
      let targetId = event.currentTarget.id
      console.log(targetId)
      this.$i18n.locale = targetId
      import(`quasar/lang/${targetId}`).then(({ default: messages }) => {
       this.$q.lang.set(messages)
     })
    }, 
  }


  
}
</script>