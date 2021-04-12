<template>
  <span v-if="loading">Loading...</span>
  <single-item
    :title=title
    :description=description
    :attributes=attributes
    v-else
  ></single-item>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import idJoinMixin from "../mixin/idJoinMixin.js"
import SingleItem from '../components/single_items/SingleItem.vue'

export default {
  components: {
    SingleItem
  },
  mixins: [idJoinMixin],
  data() {
    return {
      loading: true,
      title: "",
      description: "",
      attributes: {}
    }
  },
  methods: {
    ...mapActions("information", ["fetchInformation"]),
    ...mapActions("information_category", ["fetchInformationCategory"]),
    ...mapActions("topic", ["fetchTopic"]),
    ...mapActions("user_type", ["fetchUserType"]),
    ...mapActions("user", ["fetchSpecificUser"]),
  },
  computed: {
    ...mapGetters("information", ["informationElemById"]),
    ...mapGetters("information_category", ["informationCategories"]),
    ...mapGetters('topic', ['topics']),
    ...mapGetters('user_type', ['users'])
  },
  created() {
    const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
    this.loading = true
    const id = this.$route.params.id
    Promise.all([
      this.fetchInformation(langs),
      this.fetchInformationCategory(langs),
      this.fetchTopic(langs),
      this.fetchUserType(langs)
    ])
      .then(async () => {
        let item = this.informationElemById(id)
        this.title = item.title
        this.description = item.description
        const idx = this.informationCategories.findIndex((c) => c.id === item.category)
        if (idx !== -1) {
          this.attributes.category = this.informationCategories[idx]
        } else {
          this.attributes.category = undefined
        }
        if (item.topics) {
          this.attributes.topics = this.idJoin(item.topics, this.topics)
        }
        if (item.users) {
          this.attributes.users = this.idJoin(item.users, this.users)
        }
        if (item.creator) {
          this.attributes.creator = await this.fetchSpecificUser(item.creator, this.$pa_tenant)
        }
      }).then(() => this.loading = false)
  }
}
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
.filter-icon {
  max-height: 24px;
  max-width: 24px;
}
</style>
