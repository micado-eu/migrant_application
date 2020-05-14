<template>
  <div class="q-pa-md">
    <span v-if="loading">Loading...</span>
    <q-list bordered v-if="!loading">
      <div v-for="glossaryItem of glossary" v-bind:key="glossaryItem.id">
        <q-expansion-item
          group="glossary"
          :label="glossaryItem.title"
          header-class="bg-accent text-white"
          expand-icon-class="text-white"
        >
          <q-card>
            <q-card-section>
              <glossary-editor-viewer :content="glossaryItem.description"/>
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
  },
  created () {
    this.loading = true
    this.fetchGlossary()
      .then(glossary => {
        this.loading = false
      })
  }
}

</script>