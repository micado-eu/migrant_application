<template>
  <span v-if="loading">{{$t('desc_labels.loading')}}</span>
  <single-item-event
    :title=title
    :description=description
    :attributes=attributes
    v-else
  ></single-item-event>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import idJoinMixin from "../mixin/idJoinMixin.js"
import SingleItemEvent from '../components/single_items/SingleItemEvent.vue'

export default {
  components: {
    SingleItemEvent
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
    ...mapActions("user", ["fetchSpecificUserByTenant"]),
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
          try {
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
            if (item.location) {
              this.attributes.location = item.location
            }
            let lang = this.$userLang
            if (lang === "zh_Hans") {
              lang = "zh-Hans-CN"
            }
            if (lang === "fa_IR") {
              lang = "fa"
            }
            const startDate = new Date(item.start_date)
            const finishDate = new Date(item.end_date)
            try {
              this.attributes.start_date = startDate.toLocaleString(lang)
              this.attributes.end_date = finishDate.toLocaleString(lang)
            } catch (e) {
              this.attributes.start_date = startDate.toLocaleString("en")
              this.attributes.end_date = finishDate.toLocaleString("en")
            }
            console.log(item.username)
            if (item.username) {
              this.attributes.username = item.username
            }
            if (item.realm) {
              this.attributes.realm = item.realm
            }
          } catch (err) {
            if (err === "Not found") {
              // Route doesn't exist in router so it will redirect to 404
              this.$router.push('/404')
            } else throw err
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
