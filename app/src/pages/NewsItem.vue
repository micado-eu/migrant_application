<template>
  <div class="q-pa-md">
    <span v-if="loading">Loading...</span>
    <div v-if="!loading">
      <q-btn
        to="/news"
        no-caps
        color="accent"
      >
        Go back
      </q-btn>
      <h2 class="news-title">{{item.title}}</h2>
      <span>Tags:</span>
      <q-btn
        v-for="tag in item.tags"
        :key=tag
        :label=tag
        no-caps
        color="accent"
        class="q-ma-sm"
      />
      <glossary-editor-viewer
        :content="item.description"
        class="q-mt-md description"
      />
    </div>
  </div>
</template>

<script>
import GlossaryEditorViewer from "../components/GlossaryEditorViewer"
import { mapGetters, mapActions } from "vuex"
export default {
  components: {
    "glossary-editor-viewer": GlossaryEditorViewer
  },
  data() {
    return {
      loading: true,
      id: -1,
    }
  },
  methods: {
    ...mapActions("news", ["fetchNews"]),
  },
  computed: {
    ...mapGetters("news", ["newsElemById"]),
    item() {
      return this.newsElemById(this.id)
    }
  },
  created() {
    this.loading = true
    this.id = this.$route.params.id
    this.fetchNews().then(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
.news-title {
  color: $primary;
}
.description {
  border: 1px solid $primary;
}
</style>