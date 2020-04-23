<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-btn
      round
      icon="img:statics/icons/Set Language (600x600).png"
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
          <q-page padding>
            <div
              class="q-gutter-lg row"
              v-for="i in Math.ceil(activeLanguages.length / 4)"
              v-bind:key="i"
            >
              <div
                class="q-gutter-xs col"
                v-for="language in activeLanguages.slice((i - 1) * 4, i * 4)"
                style="text-align:center"
                :id="language.iso_code"
                @click="getValue($event)"
                v-bind:key="language.iso_code"
              >
              <!-- TODO: Change color to primary when styles are correctly set -->
                <q-btn outline rounded style="color: #0F3A5D;" v-bind:label="language.name" no-caps v-close-popup />
              </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  data () {
    return {
      layout: false,
    }
  },
  computed: {
    ...mapGetters('language', ['activeLanguages'])
  },
  methods: {
    getValue (event) {
      let targetId = event.currentTarget.id
      // Internationalization of quasar components
      import(`quasar/lang/${targetId}`).then(({ default: messages }) => {
        this.$q.lang.set(messages)
      }).catch(error => {
        // Language doesn't exist in quasar languages
        console.error(error);
      })
      // Internationalization of our own labels
      this.$i18n.locale = targetId
    },
    ...mapActions("language", ["fetchActiveLanguages"])
  },
  created () {
    this.fetchActiveLanguages()
  }
}
</script>