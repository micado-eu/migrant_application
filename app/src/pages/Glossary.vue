<template>
  <div>
    <span v-if="loading">Loading...</span>
    <div
      v-if="!loading"
      class="row q-pa-md"
    >
      <div class="col-12 row flex-center q-mb-md">
        <q-input
          class="col-10 q-mr-md"
          color="accent"
          v-model="search"
          debounce="500"
          filled
          outlined
          dense
          :label='$t("desc_labels.search")'
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <talking-label
          :text="search ? search : $t('desc_labels.search')"
          class="col-shrink"
        ></talking-label>
      </div>
      <q-separator class="list-separator" />
      <q-list
        v-show="!loading && filteredElements"
        class="col-11"
      >
        <div
          v-for="glossaryItem of filteredElements"
          v-bind:key="glossaryItem.id"
          :id="glossaryItem.id"
        >
          <div
            class="start-alphabet"
            v-if="alphabetIds.includes(glossaryItem.id)"
          >
            <span class="relocated-letter">{{alphabet[alphabetIds.indexOf(glossaryItem.id)]}}</span>
          </div>
          <q-expansion-item
            group="glossary"
            :ref="glossaryItem.id"
            @after-show="changeQuery(glossaryItem.id)"
            expand-icon-class="text-orange"
            :data-cy="'glossaryItem' + glossaryItem.id"
            :id="'gTitle' + glossaryItem.id"
          >
            <template v-slot:header>
              <div class="remove-padding row flex-center">
                <talking-label
                  :text="glossaryItem.title"
                  class="col-shrink"
                ></talking-label>
                <span class="q-ml-sm expansion-header col">{{glossaryItem.title}}</span>
              </div>
            </template>
            <template v-slot:default>
              <q-card class="remove-padding">
                <q-card-section>
                  <glossary-editor-viewer
                    :content="glossaryItem.description"
                    :id="'gDesc' + glossaryItem.id"
                    all_fetched
                    class="glossary-desc"
                    :lang="lang"
                    :data-cy="'glossaryDesc' + glossaryItem.id"
                  />
                </q-card-section>
              </q-card>
            </template>
          </q-expansion-item>
          <q-separator class="q-mb-md" />
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
import GlossaryEditorViewer from "components/GlossaryEditorViewer"
import TalkingLabel from 'components/TalkingLabel'
import Fuse from "fuse.js";
import { mapGetters, mapActions } from "vuex"

export default {
  name: 'glossary',
  components: {
    TalkingLabel,
    GlossaryEditorViewer
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
      autoScroll: true
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
    ...mapActions('information', ['fetchInformation']),
    ...mapActions('flows', ['fetchFlows']),
    ...mapActions('event', ['fetchEvents']),
    showGlossaryTerm(id) {
      let ref = this.$refs[id.toString()]
      if (ref) {
        let glossaryExpansionItem = ref[0]
        glossaryExpansionItem.show()
      }
    },
    changeQuery(id) {
      console.log("changeQuery called: " + this.autoScroll)
      if (this.$route.query.id !== id.toString()) {
        this.$router.replace({ path: '/glossary', query: { id: id } })
      }
      if (this.autoScroll) {
        let divElem = document.getElementById("gTitle" + id)
        let offsetTop = divElem.offsetTop
        // Substract the header size (height 61) from the offset to avoid being hidden by the header
        window.scrollTo({ top: offsetTop - 61 })
        this.autoScroll = false
      }
    },
    compare(a, b) {
      return a.title.localeCompare(b.title, this.$userLang, { sensitivity: "base" })
    },
    scrollIntoGlossary(index) {
      document.getElementById(this.alphabetIds[index]).scrollIntoView(false)
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
    Promise.all([
      this.fetchGlossary(langs),
      this.fetchInformation(langs),
      this.fetchFlows(langs),
      this.fetchEvents(langs)
    ]).then(() => {
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
        this.$nextTick().then(() => {
          showGlossaryTerm(query.id)
        })
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
  font-family: Nunito;
  font-weight: bold;
}
.glossary-desc {
  font-size: 12px;
}
.start-alphabet {
  background-color: #ededed;
  margin-left: -15px;
  width: 100vw;
}
.relocated-letter {
  margin-left: 15px;
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
}
.expansion-header {
  font-family: Nunito;
  font-weight: bold;
  font-size: 13px;
}
.remove-padding {
  margin-left: -16px;
}
.list-separator {
  width: 100vw;
  background-color: #ff7c44;
  margin-left: -16px;
  margin-right: -16px;
}
</style>>