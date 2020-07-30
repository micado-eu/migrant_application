<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-btn
      round
      icon="img:statics/icons/MICADO Language Icon - Update (600x600) transparent.png"
      color="white"
      size="15px"
      @click="layout = true"
    />

    <q-dialog v-model="layout">
      <q-layout
        view="Lhh lpR fff"
        container
        class="bg-white"
      >
        <q-header>
          <q-toolbar class="bg-white">
            <q-space />
            <q-btn
              color="primary"
              flat
              v-close-popup
              round
              dense
              icon="close"
            />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page
            padding
            class="language_modal"
          >
            <q-btn
              class="q-mr-sm q-my-sm language_btn"
              rounded
              color="accent"
              v-for="language in activeLanguages"
              :key="language.isoCode"
              :label="language.name"
              @click="getValue(language)"
              :id="language.isoCode"
              :unelevated="language.lang !== selectedLanguage"
              :outline="language.lang === selectedLanguage"
              no-caps
              v-close-popup
            />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { setLocale } from 'boot/i18n'
export default {
  data() {
    return {
      layout: false,
      _selectedLanguage: ""
    }
  },
  computed: {
    ...mapGetters('language', ['activeLanguages']),
    selectedLanguage() {
      return this._selectedLanguage
    }
  },
  methods: {
    getValue(language) {
      this._selectedLanguage = language.lang
      setLocale(language)
      this.$router.go()
    },
    ...mapActions("language", ["fetchActiveLanguages"])
  },
  created() {
    this.fetchActiveLanguages().then(() => {
      this._selectedLanguage = this.$userLang
    })
  }
}
</script>