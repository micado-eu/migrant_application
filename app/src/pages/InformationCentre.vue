<template>
  <div>
    <span v-if="loading">Loading...</span>
    <list-with-filter
      v-if="!loading"
      title="desc_labels.information_centre"
      icon="img:statics/icons/Icon - Information Centre (selected) (30x30).png"
      :elements="elements"
      :item_url_fn="goToItem"
      missing_content_label="information_centre.missing_content"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ListWithFilter from "components/ListWithFilter"
import idJoinMixin from "../mixin/idJoinMixin.js"
export default {
  components: {
    "list-with-filter": ListWithFilter
  },
  mixins: [idJoinMixin],
  data() {
    return {
      loading: true,
      elements: []
    }
  },
  methods: {
    ...mapActions("information", ["fetchInformation"]),
    ...mapActions("information_category", ["fetchInformationCategory"]),
    ...mapActions("topic", ["fetchTopic"]),
    ...mapActions("user_type", ["fetchUserType"]),
    goToItem(id) {
      return "/information/" + id;
    }
  },
  computed: {
    ...mapGetters("information", ["information"]),
    ...mapGetters("information_category", ["informationCategories"]),
    ...mapGetters("topic", ["topics"]),
    ...mapGetters("user_type", ["users"])
  },
  created() {
    const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
    this.loading = true
    this.fetchInformation(langs)
      .then(() => this.fetchInformationCategory(langs))
      .then(() => this.fetchTopic(langs))
      .then(() => this.fetchUserType(langs))
      .then(() => {
        this.elements = JSON.parse(JSON.stringify(this.information)) // Create copy of array
        for (let i = 0; i < this.information.length; i++) {
          const information = this.information[i]
          const element = this.elements[i]
          const idx = this.informationCategories.findIndex((c) => c.id === information.category)
          if (idx !== -1) {
            element.category = this.informationCategories[idx]
          } else {
            element.category = {}
          }
          if (information.topics) {
            element.topics = this.idJoin(element.topics, this.topics)
          }
          if (information.users) {
            element.users = this.idJoin(element.users, this.users)
          }
        }
        this.loading = false
      })
  }
}
</script>
