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
    ...mapActions("event", ["fetchEvents"]),
    ...mapActions("event_category", ["fetchEventCategory"]),
    ...mapActions("topic", ["fetchTopic"]),
    ...mapActions("user", ["fetchSpecificUser"]),
    initialize() {
      const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
      this.loading = true
      const id = this.$route.params.id
      Promise.all([
        this.fetchEvents(langs),
        this.fetchEventCategory(langs),
        this.fetchTopic(langs)
      ])
        .then(async () => {
          let item = this.eventElemById(id)
          this.title = item.title
          this.description = item.description
          const idx = this.eventCategories.findIndex((c) => c.id === item.category)
          if (idx !== -1) {
            this.attributes.category = this.eventCategories[idx]
          }
          if (item.topics) {
            this.attributes.topics = this.idJoin(item.topics, this.topics)
          }
          const startDate = new Date(item.start_date)
          this.attributes.start_date = startDate.toLocaleString(this.$userLang)
          const finishDate = new Date(item.end_date)
          this.attributes.end_date = finishDate.toLocaleString(this.$userLang)
          if (item.creator) {
            this.attributes.creator = await this.fetchSpecificUser({ userid: this.attributes.creator, tenantid: this.$pa_tenant })
          }
        }).then(() => this.loading = false)
    }
  },
  computed: {
    ...mapGetters("event", ["eventElemById"]),
    ...mapGetters("event_category", ["eventCategories"]),
    ...mapGetters('topic', ['topics'])
  },
  created() {
    this.initialize()
  },
  watch: {
    '$route.params.id': function (id) {
      this.initialize()
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
