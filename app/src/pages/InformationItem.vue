<template>
  <span v-if="loading">{{$t('desc_labels.loading')}}</span>
  <single-item-information
    :title=title
    :description=description
    :attributes=attributes
    v-else
  ></single-item-information>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import idJoinMixin from "../mixin/idJoinMixin.js"
import SingleItemInformation from '../components/single_items/SingleItemInformation.vue'

export default {
  components: {
    SingleItemInformation
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
    ...mapActions("user", ["fetchSpecificUser"]),
    initialize() {
      const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
      this.loading = true
      const id = this.$route.params.id
      Promise.all([
        this.fetchInformation(langs),
        this.fetchInformationCategory(langs),
        this.fetchTopic(langs)
      ])
        .then(async () => {
          try {
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
            if (item.creator) {
              this.attributes.creator = await this.fetchSpecificUser(item.creator, this.$pa_tenant)
            }
          }
          catch (err) {
            if (err === "Not found") {
              // Route doesn't exist in router so it will redirect to 404
              this.$router.push('/404')
            } else throw err
          }
        }).then(() => this.loading = false)
    }
  },
  computed: {
    ...mapGetters("information", ["informationElemById"]),
    ...mapGetters("information_category", ["informationCategories"]),
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
