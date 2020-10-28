<template>
  <div>
    <span v-if="loading">Loading...</span>
    <list-with-filter 
      v-if="!loading"
      title="desc_labels.events"
      icon="img:statics/icons/Icon - Events (selected; 30x30).png"
      :elements="elements"
      :categories="categories"
      :elemTags="tags"
      :item_url_fn="goToItem"
    />
  </div>
</template>
<script>
import Fuse from "fuse.js";
import { mapGetters, mapActions } from "vuex";
import ListWithFilter from "components/ListWithFilter"
export default {
  components: {
    "list-with-filter": ListWithFilter
  },
  data() {
    return {
      loading: true,
      elements: [],
      categories: [],
      tags: []
    };
  },
  methods: {
    ...mapActions("event", ["fetchEvents"]),
    ...mapActions("event_category", ["fetchEventCategory"]),
    ...mapActions("event_tags", ["fetchEventTags"]),
    goToItem(id) {
      return "/events/" + id;
    }
  },
  computed: {
    ...mapGetters("event", ["events"]),
    ...mapGetters("event_category", ["eventCategories"]),
    ...mapGetters("event_tags", ["eventTags", "eventTagsByEvent"]),
  },
  created() {
    this.loading = true;
    this.fetchEvents().then(() => {
      this.fetchEventCategory().then(() => {
        this.fetchEventTags().then(() => {
          this.categories = [...this.eventCategories];
          this.elements = JSON.parse(JSON.stringify(this.events));
          for (const e of this.elements) {
            e.tags = this.eventTagsByEvent(e.id)
          }
          this.tags = this.eventTags;
          this.loading = false;
        });
      });
    });
  }
};
</script>
