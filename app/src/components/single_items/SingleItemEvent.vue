<template>
  <div>
    <div class="padding-item">
      <div class="row q-my-md">
        <span class="title col-9">{{ title }}</span>
        <talking-label
          :text="title"
          class="col-shrink q-ml-xl"
        ></talking-label>
      </div>
      <q-separator class="title-separator q-mb-md"></q-separator>
      <glossary-editor-viewer
        :content="description"
        class="description"
      />
      <q-separator class="q-my-lg" />
      <entry-row
        v-if="attributes.start_date"
        label="events.start_date"
        v-model="attributes.start_date"
      ></entry-row>
      <entry-row
        v-if="attributes.end_date"
        label="events.finish_date"
        v-model="attributes.end_date"
      ></entry-row>
      <entry-row
        label="events.cost"
        :value="attributes.cost ? attributes.cost : $t('events.cost_free')"
      ></entry-row>
      <entry-row
        v-if="attributes.location"
        label="events.location"
        v-model="attributes.location"
      ></entry-row>
      <entry-row
        v-if="attributes.organizer"
        label="events.organizer"
        v-model="attributes.organizer"
      ></entry-row>
      <entry-row
        v-if="attributes.category && attributes.category.category"
        label="events.category"
        v-model="attributes.category.category"
      ></entry-row>
      <entry-row-icons
        v-if="attributes.topics"
        label="events.topics"
        v-model="attributes.topics"
        type="topic"
      ></entry-row-icons>
      <entry-row-icons
        v-if="attributes.users"
        label="events.user_types"
        v-model="attributes.users"
        type="user_type"
      ></entry-row-icons>
      <entry-row
        v-if="attributes.creator"
        label="events.organizer"
        :value="getCreatorAttribute(attributes.creator, 'givenName') + ' ' + getCreatorAttribute(attributes.creator, 'sn')"
      ></entry-row>
      <div align="center">
        <q-btn
          @click="goBack()"
          icon="navigate_before"
          no-caps
          rounded
          outline
          color="accent"
          class="q-my-sm"
        >
          {{$t("button.go_back")}}
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import GlossaryEditorViewer from "../GlossaryEditorViewer"
import TalkingLabel from '../TalkingLabel.vue'
import EntryRow from './EntryRow.vue'
import EntryRowIcons from './EntryRowIcons.vue'

export default {
  components: {
    GlossaryEditorViewer,
    TalkingLabel,
    EntryRow,
    EntryRowIcons
  },
  props: ["title", "description", "attributes"],
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
$btn_secondary: #cdd0d2;
$tag: #0b91ce;
.padding-item {
  padding: 21px 35px;
}
.item {
  border: 1px solid $primary;
  border-radius: 10px;
}
.tag_btn {
  background-color: $tag;
  color: white;
}
.title-separator {
  background-color: #ff7c44;
  margin-left: -35px;
  margin-right: -35px;
  width: 100vw;
}
.title {
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
}
</style>