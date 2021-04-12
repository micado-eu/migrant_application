<template>
  <div
    class="row"
  >
    <div class="col-9">
      <span class="entry-title">{{labelTranslated}}: </span>
      <q-img
        v-for="elem in value"
        :key="type + elem.id"
        :src="elem.icon"
        spinner-color="white"
        id="image"
        :alt="elem[type]"
        class="filter-icon q-ml-sm"
        :img-style="{'max-width': '24px', 'max-height': '24px'}"
      >
        <q-tooltip :key="'userType_tooltip'.concat(elem.id)">
          {{elem[type]}}
        </q-tooltip>
      </q-img>
    </div>
    <talking-label
      :text="labelTranslated + ': ' + talkingLabelValues"
      class="col-shrink q-ml-xl"
    ></talking-label>
    <q-separator
      class="q-my-lg"
      v-if="value"
    />
  </div>
</template>

<script>
import TalkingLabel from '../TalkingLabel.vue';

export default {
  components: {
    TalkingLabel
  },
  props: ["label", "value", "type"],
  computed: {
    labelTranslated() {
      return this.$t(this.label)
    },
    talkingLabelValues() {
      let arrayToString = this.value.map(elem => elem[this.type]).toString()
      return arrayToString
    }
  }
}
</script>

<style>
.entry-title {
  font-weight: bold;
}
.filter-icon {
  max-height: 24px;
  max-width: 24px;
}
</style>