<template>
  <div>
    <span v-if="loading">Loading...</span>
    <list-with-filter
      v-if="!loading"
      title="desc_labels.events"
      icon="img:statics/icons/Icon - Events (selected; 30x30).png"
      :elements="elements"
      :categories="categories"
      :item_url_fn="goToItem"
      missing_content_label="events.missing_content"
    />
  </div>
</template>
<script>
import Fuse from "fuse.js"
import { mapGetters, mapActions } from "vuex"
import ListWithFilter from "components/ListWithFilter"
export default {
  components: {
    "list-with-filter": ListWithFilter
  },
  data() {
    return {
      loading: true,
      elements: [],
      categories: []
    }
  },
  methods: {
    ...mapActions("event", ["fetchEvents"]),
    ...mapActions("event_category", ["fetchEventCategory"]),
    goToItem(id) {
      return "/events/" + id
    }
  },
  computed: {
    ...mapGetters("event", ["events"]),
    ...mapGetters("event_category", ["eventCategories"])
  },
  created() {
    this.loading = true;
    this.fetchEvents().then(() => {
      this.fetchEventCategory().then(() => {
          this.categories = [...this.eventCategories]
          this.elements = JSON.parse(JSON.stringify(this.events))
          this.loading = false
      })
    })
  }
}
</script>
