<template>
  <div class="q-pa-md">
    <span v-if="loading">Loading...</span>
    <q-list
      bordered
      v-show="!loading"
    >
      <div
        v-for="glossaryItem of glossary"
        v-bind:key="glossaryItem.id"
      >
        <q-expansion-item
          group="glossary"
          :label="glossaryItem.title"
          class="glossary-expansion-item"
          header-class="text-accent"
          expand-icon-class="text-accent"
          :ref="glossaryItem.id"
          @show="changeQuery(glossaryItem.id)"
        >
          <q-card>
            <q-card-section>
              <glossary-editor-viewer
                :content="glossaryItem.description"
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
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters('glossary', ['glossary'])
  },
  methods: {
    ...mapActions("glossary", ["fetchGlossary"]),
    showGlossaryTerm (id) {
      let glossaryExpansionItem = this.$refs[id.toString()][0]
      glossaryExpansionItem.show()
    },
    changeQuery(id) {
      if (this.$route.query.id !== id.toString()) {
        this.$router.replace({ path: '/glossary', query: { id: id } })
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.query.id !== undefined) {
        this.showGlossaryTerm(to.query.id)
      }
    }
  },
  mounted () {
    this.loading = true
    let query = this.$route.query
    let showGlossaryTerm = this.showGlossaryTerm
    this.fetchGlossary()
      .then(glossary => {
        if (query.id !== undefined) {
          showGlossaryTerm(query.id)
        }
        this.loading = false
      })
  }
}

</script>
<style lang="scss" scoped>
  .glossary-expansion-item {
    border: 2px solid $primary;
    border-radius: 10px;
  }
</style>>