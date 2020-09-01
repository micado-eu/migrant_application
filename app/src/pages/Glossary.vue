<template>
  <div class="q-pa-md row">
    <span v-if="loading">Loading...</span>
    <q-list
      v-show="!loading && translatedGlossary"
      class="col-11"
    >
      <div
        v-for="glossaryItem of translatedGlossary"
        v-bind:key="glossaryItem.id"
        :id="glossaryItem.id"
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
                :lang="lang"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator class="list_separator"/>
      </div>
    </q-list>
    <div v-show="!loading && !translatedGlossary">
      <span>No elements</span>
    </div>
    <div class="q-ml-sm col">
      <span
        v-for="(letter, index) in alphabet"
        :key="letter"
        class="row alphabet"
        @click="scrollIntoGlossary(index)"
      >
        {{letter}}
      </span>
    </div>
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
      lang: "",
      translatedGlossary: [],
      alphabet: [],
      alphabetIds: [],
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
    },
    compare(a, b) {
      return a.title.localeCompare(b.title, this.$userLang, { sensitivity: "base" })
    },
    scrollIntoGlossary(index) {
      document.getElementById(this.alphabetIds[index]).scrollIntoView({ block: "center", inline: "nearest" })
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
    this.lang = this.$userLang
    this.fetchGlossary()
      .then(() => {
        for (let e of this.glossary) {
          let al = this.$userLang;
          let idx = e.translations.findIndex(t => t.lang === al);
          if (idx !== -1) {
            this.translatedGlossary.push(e.translations[idx])
          }
        }
        this.translatedGlossary.sort(this.compare)
        for (let elem of this.translatedGlossary) {
          let firstChar = elem.title.charAt(0).toUpperCase()
          if (!this.alphabet.includes(firstChar)) {
            this.alphabet.push(firstChar)
            this.alphabetIds.push(elem.id)
          }
        }
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
.alphabet {
  color: $primary;
  font-family: "Nunito";
  font-weight: bold;
}
.list_separator {
  background-color: $accent_list;
}
</style>>