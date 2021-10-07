<template>
  <div class="q-pa-sm q-gutter-sm" style="padding-right:10px;">
    <q-icon
      
      name="img:statics/icons/Icon - Langauge selection (4th Iteration A) (1).svg"
      size="40px"
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
            @input="getValue(language)"
            :id="language.isoCode"
            :value="getToggleValue(language)"
            :data-cy="'language_button_' + language.isoCode"
          >
            <div class="row">
              <talking-label
                :title="language.name"
                :row="'row'"
                :title_col="'col-11'"
                :icon_col="'col-1'"
                :icon_style="'text-align:left'"
                :text="language.name"
                class="col-shrink q-mr-sm"
              ></talking-label>
              <!--<span class="col-auto">{{language.name}}</span>-->
            </div>
          </q-toggle>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
   </div> 
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { setLocale } from 'boot/i18n'
import TalkingLabel from "./TalkingLabel.vue"

export default {
  components: {
    TalkingLabel
  },
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
    open() {
      this.layout = true
    },
    getValue(language) {
      this._selectedLanguage = language.lang
      setLocale(language)
      this.$router.go()
    },
    getToggleValue(language) {
      return this._selectedLanguage === language.lang
    },
    ...mapActions("language", ["fetchActiveLanguages"])
  },
  created() {
    this.fetchActiveLanguages().then(() => {
      this._selectedLanguage = this.$userLang
      this.loading = false
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