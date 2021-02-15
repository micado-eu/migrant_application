<template>
  <div>
    <div style="font-style: normal;height:72px;text-align: center; padding-top:15px;font-weight: bold;font-size: 22px;line-height: 41px;color:white; background-color:#FF7C44">
      {{$t('menu.glossary')}}
      <q-icon
        name="img:statics/icons/MICADO PA APP Icon - Glossary Page (white).png"
        style="font-size: 30px"
      ></q-icon>
    </div>
    <span v-if="loading">Loading...</span>
    <div
      v-if="!loading"
      class="row q-pa-md"
    >
      <q-input
        color="accent"
        v-model="search"
        debounce="500"
        filled
        outlined
        :label='$t("desc_labels.search")'
        class="q-mb-md col-12"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-separator class="list_separator" />
      <q-list
        v-show="!loading && filteredElements"
        class="col-11"
      >
        <div
          v-for="glossaryItem of filteredElements"
          v-bind:key="glossaryItem.id"
          :id="glossaryItem.id"
        >
          <q-expansion-item
            group="glossary"
            :label="glossaryItem.title"
            :header-style="{fontFamily: 'Nunito', fontWeight: 'bold', fontSize: '13px'}"
            :ref="glossaryItem.id"
            @show="changeQuery(glossaryItem.id)"
            expand-icon-class="text-orange"
            :data-cy="'glossaryItem' + glossaryItem.id"
          >
            <q-card>
              <q-card-section>
                <glossary-editor-viewer
                  :content="glossaryItem.description"
                  glossary_fetched
                  class="glossary-desc"
                  :lang="lang"
                  :data-cy="'glossaryDesc' + glossaryItem.id"
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-separator class="list_separator" />
        </div>
      </q-list>
      <span
        class="q-ma-md"
        v-if="filteredElements.length <= 0"
      >{{$t("glossary.missing_content")}}</span>
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
  </div>
</template>

<script>
import GlossaryEditorViewer from "../components/GlossaryEditorViewer"
import Fuse from "fuse.js";
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
      filteredElementsBySearch: [],
      searchText: "",
    }
  },
  computed: {
    ...mapGetters('glossary', ['glossary']),
    search: {
      get() {
        return this.searchText;
      },
      set(newSearch) {
        let keys = ['title', 'description']
        if (newSearch) {
          const fuse = new Fuse(this.translatedGlossary, {
            keys
          });
          this.filteredElementsBySearch = fuse
            .search(newSearch)
            .map(i => i.item);
          this.searchText = newSearch;
        } else {
          this.filteredElementsBySearch = this.translatedGlossary;
          this.searchText = "";
        }
      }
    },
    filteredElements() {
      return this.filteredElementsBySearch
    },
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
    const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
    this.fetchGlossary(langs)
      .then(() => {
        this.translatedGlossary = this.glossary.map(e => { return { ...e } })
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
        this.filteredElementsBySearch = this.translatedGlossary;
        this.loading = false
      })
  }
}

</script>
<style lang="scss" scoped>
$accent_list: #ff7c44;
.toolbar-list {
  background-color: $accent_list;
  border-radius: 10px;
}
.alphabet {
  color: $primary;
  font-family: "Nunito";
  font-weight: bold;
}
.glossary-desc {
  font-size: 12px;
}
</style>>