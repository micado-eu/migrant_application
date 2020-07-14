<template>
  <div class="q-pa-md">
    <span v-if="loading">Loading...</span>
    <div
      class="item q-px-md"
      v-if="!loading"
    >
      <h3 class="information-title">{{item.title}}</h3>
      <span v-if="item.tags">Tags:</span>
      <q-btn
        v-for="tag in item.tags"
        :key=tag
        :label=tag
        no-caps
        rounded
        class="q-ma-sm tag_btn"
      />
      <glossary-editor-viewer
        :content="item.description"
        class="q-mt-md description"
      />
    </div>
    <q-btn
      @click="goBack()"
      v-if="!loading"
      no-caps
      rounded
      color="accent"
      class="q-mt-md"
    >
      Go back
    </q-btn>
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
      item: {}
    }
  },
  methods: {
    ...mapActions("information", ["fetchInformation"]),
    goBack() {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapGetters("information", ["informationElemById"]),
  },
  created() {
    this.loading = true
    this.id = this.$route.params.id
    this.fetchInformation().then(() => {
      let itemById = this.informationElemById(this.id)
      let al = this.$i18n.locale;
      let idx = itemById.translations.findIndex(t => t.lang === al)
      let translated = Object.assign({}, itemById.translations[idx])
      translated.description = JSON.parse(translated.description)
      this.item = translated
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
$btn_secondary: #cdd0d2;
.information-title {
  color: #0f3a5d;
}
.item {
  border: 1px solid $primary;
  border-radius: 10px;
}
.tag_btn {
  background-color: $btn_secondary;
  color: black;
}
</style>