<template>
  <div>
    <span v-if="loading">Loading...</span>
    <div
      v-if="!loading"
      style="font-style: normal;height:72px;text-align: center; padding-top:15px;font-weight: bold;font-size: 22px;line-height: 41px;color:white; background-color:#FF7C44"
    >
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
      />
      <q-separator class="q-my-lg" />
      <span style="font-weight: bold;">{{$t("events.start_date")}}: </span><span>{{item.start_date}}</span>
      <q-separator
        class="q-my-lg"
        v-if="item.start_date"
      />
      <span style="font-weight: bold;">{{$t("events.finish_date")}}: </span><span>{{item.end_date}}</span>
      <q-separator
        class="q-my-lg"
        v-if="item.end_date"
      />
      <span
        style="font-weight: bold;"
        v-if="item.location"
      >{{$t("events.location")}}: </span><span>{{item.location}}</span>
      <q-separator
        class="q-my-lg"
        v-if="item.location"
      />
      <span
        style="font-weight: bold;"
        v-if="item.organizer"
      >{{$t("events.organizer")}}: </span><span>{{item.organizer}}</span>
      <q-separator
        class="q-my-lg"
        v-if="item.organizer"
      />
      <span
        style="font-weight: bold;"
        v-if="item.category"
      >
        {{$t("information_centre.category")}}:
        <span>{{item.category.category}}</span>
      </span>
      <q-separator
        class="q-my-lg"
        v-if="item.category"
      />
      <span
        style="font-weight: bold;"
        v-if="item.topics"
      >{{$t("information_centre.topics")}}:
        <q-img
          v-for="topic in item.topics"
          :key="'topic' + topic.id"
          :src="topic.icon"
          spinner-color="white"
          id="image"
          :alt="topic.topic"
          class="filter-icon q-ml-sm"
          :img-style="{'max-width': '24px', 'max-height': '24px'}"
        >
          <q-tooltip :key="'userType_tooltip'.concat(topic.id)">
            {{topic.topic}}
          </q-tooltip>
        </q-img>
      </span>
      <q-separator
        class="q-my-lg"
        v-if="item.topics"
      />
      <span
        style="font-weight: bold;"
        v-if="item.users"
      >{{$t("information_centre.user_types")}}:
        <q-img
          v-for="userType in item.users"
          :key="'userType' + userType.id"
          :src="userType.icon"
          spinner-color="white"
          id="image"
          :alt="userType.user_type"
          class="filter-icon q-ml-sm"
          :img-style="{'max-width': '24px', 'max-height': '24px'}"
        >
          <q-tooltip :key="'userType_tooltip'.concat(userType.id)">
            {{userType.user_type}}
          </q-tooltip>
        </q-img>
      </span>
      <q-separator
        class="q-my-lg"
        v-if="item.users"
      />
      <span
        style="font-weight: bold;"
        v-if="item.creator"
      >
        {{$t("events.organizer")}}: {{getCreatorAttribute(item.creator, "givenName")}} {{getCreatorAttribute(item.creator, "sn")}}
      </span>
      <q-separator
        class="q-my-lg"
        v-if="item.creator"
      />
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
import GlossaryEditorViewer from "../components/GlossaryEditorViewer"
import { mapGetters, mapActions } from "vuex"
import idJoinMixin from "../mixin/idJoinMixin.js"
export default {
  components: {
    "glossary-editor-viewer": GlossaryEditorViewer
  },
  mixins: [idJoinMixin],
  data() {
    return {
      loading: true,
      id: -1,
      item: {}
    };
  },
  methods: {
    ...mapActions("event", ["fetchEvents"]),
    ...mapActions("event_category", ["fetchEventCategory"]),
    ...mapActions("topic", ["fetchTopic"]),
    ...mapActions("user_type", ["fetchUserType"]),
    goBack() {
      this.$router.go(-1);
    },
    getCreatorAttribute(creator, attrString) {
      var retAttr = ""
      var retAttr_arr = creator.attributes.filter((attr) => {
        return attr.umAttrName === attrString
      })
      if (retAttr_arr.length > 0) {
        retAttr = retAttr_arr[0].umAttrValue
      }
      return retAttr
    }
  },
  computed: {
    ...mapGetters("event", ["eventElemById"]),
    ...mapGetters("event_category", ["eventCategories"]),
    ...mapGetters('topic', ['topics']),
    ...mapGetters('user_type', ['users'])
  },
  created() {
    const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
    this.loading = true
    this.id = this.$route.params.id
    this.fetchEvents(langs)
      .then(() => this.fetchEventCategory(langs))
      .then(() => this.fetchTopic(langs))
      .then(() => this.fetchUserType(langs))
      .then(async () => {
        this.item = Object.assign({}, this.eventElemById(this.id))
        const idx = this.eventCategories.findIndex((c) => c.id === this.item.category)
        if (idx !== -1) {
          this.item.category = this.eventCategories[idx]
        } else {
          this.item.category = undefined
        }
        if (this.item.topics) {
          this.item.topics = this.idJoin(this.item.topics, this.topics)
        }
        if (this.item.users) {
          this.item.users = this.idJoin(this.item.users, this.users)
        }
        const startDate = new Date(this.item.start_date)
        this.item.start_date = `${startDate.getUTCFullYear()}-` +
          `${startDate.getUTCMonth() + 1}-` +
          `${startDate.getUTCDate()} ` +
          `${startDate.getUTCHours().toLocaleString(undefined, { minimumIntegerDigits: 2 })}:` +
          `${startDate.getUTCMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 })}`
        const finishDate = new Date(this.item.end_date)
        this.item.end_date = `${finishDate.getUTCFullYear()}-` +
          `${finishDate.getUTCMonth() + 1}-` +
          `${finishDate.getUTCDate()} ` +
          `${finishDate.getUTCHours().toLocaleString(undefined, { minimumIntegerDigits: 2 })}:` +
          `${finishDate.getUTCMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 })}`
        if (this.item.creator) {
          this.item.creator = await this.fetchSpecificUser({userid: this.item.creator, tenantid: this.$pa_tenant})
          console.log(this.item.creator)
          console.log(this.getCreatorAttribute(this.item.creator, "givenName"))
        }
      }).then(() => this.loading = false)
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
.filter-icon {
  max-height: 24px;
  max-width: 24px;
}
</style>
