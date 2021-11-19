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
        talkingLabelLocation="right"
        class="description"
      />
      <q-separator class="q-my-lg" />
      <entry-row
        v-if="attributes.category && attributes.category.category"
        label="information_centre.category"
        v-model="attributes.category.category"
      ></entry-row>
      <entry-row-icons
        v-if="attributes.topics"
        label="information_centre.topics"
        v-model="attributes.topics"
        type="topic"
      ></entry-row-icons>
      <entry-row-icons
        v-if="attributes.users"
        label="information_centre.user_types"
        v-model="attributes.users"
        type="user_type"
      ></entry-row-icons>
      <div align="center">
        <q-btn
          @click="$router.back()"
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