<template>
  <div>
    <span v-if="loading">{{$t('desc_labels.loading')}}</span>
    <list-with-filter
      v-if="!loading"
      title="desc_labels.events"
      icon="img:statics/icons/Icon - Events (selected; 30x30).png"
      :elements="elements"
      :item_url_fn="goToItem"
      missing_content_label="events.missing_content"
      is_event
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
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
    ...mapActions("event", ["fetchEvents"]),
    ...mapActions("event_category", ["fetchEventCategory"]),
    ...mapActions("topic", ["fetchTopic"]),
    ...mapActions("user_type", ["fetchUserType"]),
    goToItem(id) {
      return "/events/" + id
    }
  },
  computed: {
    ...mapGetters("event", ["events"]),
    ...mapGetters("event_category", ["eventCategories"]),
    ...mapGetters("topic", ["topics"]),
    ...mapGetters("user_type", ["users"])
  },
  created() {
    const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
    this.loading = true
    this.fetchEvents(langs)
      .then(() => this.fetchEventCategory(langs))
      .then(() => this.fetchTopic(langs))
      .then(() => this.fetchUserType(langs))
      .then(() => {
        this.elements = JSON.parse(JSON.stringify(this.events)) // Create copy of array
        for (let i = 0; i < this.events.length; i++) {
          const event = this.events[i]
          const element = this.elements[i]
          const idx = this.eventCategories.findIndex((c) => c.id === event.category)
          if (idx !== -1) {
            element.category = this.eventCategories[idx]
          } else {
            element.category = {}
          }
          if (event.topics) {
            element.topics = this.idJoin(element.topics, this.topics)
          }
          if (event.users) {
            element.users = this.idJoin(element.users, this.users)
          }
        }
        this.loading = false
      })
  }
}
</script>
