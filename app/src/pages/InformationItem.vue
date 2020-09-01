<template>
  <div>
    <span v-if="loading">Loading...</span>
    <div style="font-style: normal;height:72px;text-align: center; padding-top:15px;font-weight: bold;font-size: 22px;line-height: 41px;color:white; background-color:#FF7C44">
      {{$t('desc_labels.information_centre')}}
      <q-icon name="img:statics/icons/Icon - Information Centre (selected) (30x30).png"></q-icon>
    </div>
    <div class="q-ma-md" v-if="!loading">
      <h5 class="information-title">{{ item.title }}</h5>
      <glossary-editor-viewer
        :content="item.description"
        class="description"
        :lang="lang"
      />
      <q-separator class="q-my-lg"/>
      <span style="font-weight: bold;">{{$t("information_centre.category")}}: </span><span>{{category.eventCategory}}</span>
      <q-separator class="q-my-lg"/>
      <span style="font-weight: bold;">{{$t("information_centre.tags")}}: </span>
      <q-btn
        v-for="tag in tags"
        :key="tag"
        :label="tag"
        no-caps
        rounded
        class="q-mx-sm q-my-sm tag_btn"
      />
      <q-separator class="q-my-lg"/>
      <div align="center">
        <q-btn
          @click="goBack()"
          no-caps
          rounded
          color="accent"
          class="q-my-sm"
        >
          Go back
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import GlossaryEditorViewer from "../components/GlossaryEditorViewer";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    "glossary-editor-viewer": GlossaryEditorViewer
  },
  data() {
    return {
      loading: true,
      id: -1,
      item: {},
      category: "",
      tags: [],
      lang: ""
    };
  },
  methods: {
    ...mapActions("information", ["fetchInformation"]),
    ...mapActions("information_category", ["fetchInformationCategory"]),
    ...mapActions("information_tags", ["fetchInformationTags"]),
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapGetters("information", ["informationElemById"]),
    ...mapGetters("information_category", ["informationCategories"]),
    ...mapGetters("information_tags", ["informationTagsByEvent"]),
  },
  created() {
    this.loading = true;
    this.lang = this.$userLang;
    this.id = this.$route.params.id;
    this.fetchInformation().then(() => {
      this.fetchInformationCategory().then(() => {
        this.fetchInformationTags().then(() => {
          let informationCategoryElems = [...this.informationCategories]
          let itemById = this.informationElemById(this.id);
          let al = this.$userLang;
          let idx = itemById.translations.findIndex(t => t.lang === al);
          let translated = Object.assign({}, itemById.translations[idx]);
          let idxCat = itemById.category;
          let idxCategoryObject = informationCategoryElems.findIndex(
            ic => ic.id === idxCat
          );
          idxCat = informationCategoryElems[
            idxCategoryObject
          ].translations.findIndex(t => t.lang === this.$userLang);
          this.category =
            informationCategoryElems[idxCategoryObject].translations[idxCat];
          itemById.tags = this.informationTagsByEvent(itemById.id);
          for (let tag of itemById.tags) {
            let translations = tag.translations.filter(
              tag => tag.lang === this.$userLang
            );
            if (translations.length > 0) {
              if (this.tags.indexOf(translations[0].tag) == -1) {
                this.tags.push(translations[0].tag);
              }
            }
          }
          this.item = translated;
          this.loading = false;
        })
      })
    })
  }
};
</script>

<style lang="scss" scoped>
$btn_secondary: #cdd0d2;
$tag: #0b91ce;
.item {
  border: 1px solid $primary;
  border-radius: 10px;
}
.tag_btn {
  background-color: $tag;
  color: white;
}
</style>
