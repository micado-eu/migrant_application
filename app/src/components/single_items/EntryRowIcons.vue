<template>
  <div
    class="row"
  >
    <div class="col-9">
      <span class="entry-title">{{labelTranslated}}: </span>
      <icon-overlay
        v-for="elem in value"
        :key="type + elem.id"
        :type=type
        :elem=elem
      >
      </icon-overlay>
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
import IconOverlay from './IconOverlay.vue'

export default {
  components: {
    TalkingLabel,
    IconOverlay
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
</style>