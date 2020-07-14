<template>
  <div class="q-pa-md">
    <q-toolbar class="toolbar-list q-mb-md">
      <q-icon
        name="img:statics/icons/MICADO PA APP Icon - Glossary Page (white).png"
        size="xl"
        class="q-mx-auto"
      />
    </q-toolbar>
    <span v-if="loading">Loading...</span>
    <q-list
      bordered
      v-show="!loading"
    >
      <div
        v-for="glossaryItem of translatedGlossary"
        v-bind:key="glossaryItem.id"
      >
        <q-expansion-item
          group="glossary"
          :label="glossaryItem.title"
          hader-class="glossary-item-header"
          :ref="glossaryItem.id"
          @show="changeQuery(glossaryItem.id)"
        >
          <q-card>
            <q-card-section>
              <glossary-editor-viewer
                :content="glossaryItem.description"
                glossary_fetched
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator />
      </div>
    </q-list>
  </div>
</template>

<script>
import GlossaryEditorViewer from "../components/GlossaryEditorViewer"
import { mapGetters, mapActions } from "vuex"

export default {
  name: 'glossary',
  components: {
    "glossary-editor-viewer": GlossaryEditorViewer
  },
  data() {
    return {
      loading: false,
      translatedGlossary: []
    }
  },
  computed: {
    ...mapGetters('glossary', ['glossary'])
  },
  methods: {
    ...mapActions("glossary", ["fetchGlossary"]),
    showGlossaryTerm(id) {
      let ref = this.$refs[id.toString()]
      if (ref) {
        let glossaryExpansionItem = ref[0]
        glossaryExpansionItem.show()
      }
    },
    changeQuery(id) {
      if (this.$route.query.id !== id.toString()) {
        this.$router.replace({ path: '/glossary', query: { id: id } })
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.query.id !== undefined) {
        this.showGlossaryTerm(to.query.id)
      }
    }
  },
  created() {
    this.loading = true
    let query = this.$route.query
    let showGlossaryTerm = this.showGlossaryTerm
    this.fetchGlossary()
      .then(() => {
        this.translatedGlossary = this.glossary.map(e => {
          let al = this.$i18n.locale;
          let idx = e.translations.findIndex(t => t.lang === al);
          return e.translations[idx];
        });
        if (query.id !== undefined) {
          showGlossaryTerm(query.id)
        }
        this.loading = false
      })
  }
}

</script>
<style lang="scss" scoped>
$accent_list: #ff7c44;
.glossary-item-header {
  font-family: "Nunito";
  font-weight: bold;
}
.toolbar-list {
  background-color: $accent_list;
  border-radius: 10px;
}
</style>>