<template>
  <div>
    <span v-if="loading">Loading...</span>
    <list-with-filter
      v-if="!loading"
      title="desc_labels.information_centre"
      icon="img:statics/icons/Icon - Information Centre (selected) (30x30).png"
      :elements="elements"
      :categories="categories"
      :item_url_fn="goToItem"
      missing_content_label="information_centre.missing_content"
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
      categories: []
    }
  },
  methods: {
    ...mapActions("information", ["fetchInformation"]),
    ...mapActions("information_category", ["fetchInformationCategory"]),
    goToItem(id) {
      return "/information/" + id;
    }
  },
  computed: {
    ...mapGetters("information", ["information"]),
    ...mapGetters("information_category", ["informationCategories"])
  },
  created() {
    this.loading = true;
    this.fetchInformation().then(() => {
      this.fetchInformationCategory().then(() => {
          this.categories = [...this.informationCategories]
          this.elements = JSON.parse(JSON.stringify(this.information))
          this.loading = false
      })
    })
  }
}
</script>
