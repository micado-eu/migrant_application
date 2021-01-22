<template>
  <div>
    <span v-if="loading">Loading...</span>
    <div v-if="!loading" style="font-style: normal;height:72px;text-align: center; padding-top:15px;font-weight: bold;font-size: 22px;line-height: 41px;color:white; background-color:#FF7C44">
      {{$t('desc_labels.events')}}
      <q-icon name="img:statics/icons/Icon - Events (selected; 30x30).png"></q-icon>
    </div>
    <div
      class="q-ma-md"
      v-if="!loading"
    >
      <h5 class="information-title">{{ item.title }}</h5>
      <glossary-editor-viewer
        :content="item.description"
        class="description"
        :lang="lang"
      />
      <q-separator class="q-my-lg" />
      <span style="font-weight: bold;">{{$t("events.start_date")}}: </span><span>{{startDate}}</span>
      <q-separator class="q-my-lg" />
      <span style="font-weight: bold;">{{$t("events.finish_date")}}: </span><span>{{finishDate}}</span>
      <q-separator class="q-my-lg" />
      <span style="font-weight: bold;">{{$t("events.location")}}: </span><span>{{location}}</span>
      <q-separator class="q-my-lg" />
      <span style="font-weight: bold;">{{$t("events.category")}}: </span><span>{{category.category}}</span>
      <q-separator class="q-my-lg" />
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
      lang: "",
      startDate: "",
      finishDate: "",
      location: ""
    };
  },
  methods: {
    ...mapActions("event", ["fetchEvents"]),
    ...mapActions("event_category", ["fetchEventCategory"]),
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapGetters("event", ["eventElemById"]),
    ...mapGetters("event_category", ["eventCategories"]),
    ...mapGetters('topic', ['topics']),
    ...mapGetters('user_type', ['users'])
  },
  created() {
    this.loading = true;
    this.lang = this.$userLang;
    this.id = this.$route.params.id;
    this.fetchEvents().then(() => {
      let itemById = this.eventElemById(this.id);
      let al = this.$userLang;
      let idx = itemById.translations.findIndex(t => t.lang === al);
      let translated = Object.assign({}, itemById.translations[idx]);
      const startDate = new Date(itemById.startDate)
      const finishDate = new Date(itemById.endDate)
      this.startDate = `${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} ${startDate.getUTCHours().toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${startDate.getUTCMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 })}`
      this.finishDate = `${finishDate.getUTCFullYear()}-${finishDate.getUTCMonth() + 1}-${finishDate.getUTCDate()} ${finishDate.getUTCHours().toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${finishDate.getUTCMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 })}`
      this.location = itemById.location
      this.fetchEventCategory().then(() => {
        let eventCategoryElems = [...this.eventCategories]
        let idxCat = itemById.category;
        let idxCategoryObject = eventCategoryElems.findIndex(
          ic => ic.id === idxCat
        );
        idxCat = eventCategoryElems[
          idxCategoryObject
        ].translations.findIndex(t => t.lang === this.$userLang);
        this.category =
          eventCategoryElems[idxCategoryObject].translations[idxCat];
        this.item = translated;
        this.loading = false;
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
