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
              color="red"
              flat
              v-close-popup
              round
              dense
              icon="close"
            />
          </q-toolbar>
        </q-header>

        <q-page-container class="q-ma-sm">
          <span v-if="loading">Loading...</span>
          <q-page
            v-else
            padding
            class="language_modal flex"
          >
            <q-toggle
              class="q-mr-sm q-my-sm language_btn"
              color="accent"
              v-for="language in activeLanguages"
              :key="language.isoCode"
              :label="language.name"
              @input="getValue(language)"
              :id="language.isoCode"
              :value="getToggleValue(language)"
              :data-cy="'language_button_' + language.isoCode"
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
      loading: true,
      layout: false,
      _selectedLanguage: ""
    }
  },
  computed: {
    ...mapGetters('language', ['activeLanguages']),
  },
  methods: {
    getValue(language) {
      this._selectedLanguage = language.lang
      setLocale(language)
      this.$router.go()
    },
    getToggleValue(language) {
      return this._selectedLanguage===language.lang
    },
    ...mapActions("language", ["fetchActiveLanguages"])
  },
  created() {
    this.fetchActiveLanguages().then(() => {
      this._selectedLanguage = this.$userLang
      this.loading= false
    })
  }
}
</script>
<style scoped lang="scss">
  .language_modal {
    flex-direction: column;
    flex-wrap: nowrap;
  }
</style>