<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-btn round icon="img:statics/icons/Set Language (600x600).png" color="white" size="15px" @click="layout = true" />

    <q-dialog v-model="layout">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header >
          <q-toolbar class="bg-white">
            <q-space />
            <q-btn color="primary" flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding>
            <div class="q-gutter-lg row"  v-for="i in Math.ceil(langOptions.length / 4)">
              <div class="q-gutter-xs col" v-for="language in langOptions.slice((i - 1) * 4, i * 4)" style="text-align:center" :id="language.value" @click="getValue($event)" >
              <q-btn v-close-popup>
                <q-avatar square>
                  <img :src="language.src" />
                </q-avatar>
              </q-btn>
              </div>
            </div>
            <h6> Please, choose a language </h6>
            
            <hr/>
            <h6> Please, choose a language</h6>
              <div class="q-pa-md" style="max-width: 350px">
                <q-list bordered separator class="rounded-borders">
                  <q-item clickable v-close-popup v-ripple @click="getValue($event)" v-for="language in langOptions" :key="language.label" 
                    :id="language.value">
                    {{language.label}} 
                  </q-item>
                </q-list>
              </div>
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
        { value: 'en-us', label: 'English',src: 'statics/icons/English.png'},
        { value: 'de', label: 'Deutsch', src: 'statics/icons/Deutsch.png'},
        { value: 'ar', label: 'عربي', src: 'statics/icons/arab.png'},
        { value: 'it', label:'Italiano', src: 'statics/icons/Italiano.png'}
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