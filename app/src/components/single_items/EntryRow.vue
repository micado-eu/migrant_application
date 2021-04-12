<template>
  <div
    class="row"
  >
    <div class="col-9">
      <span class="entry-title">{{labelTranslated}}: </span>
      <span>{{value}}</span>
    </div>
    <talking-label
      :text="labelTranslated + ': ' + value"
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
  props: ["label", "value"],
  computed: {
    labelTranslated() {
      return this.$t(this.label)
    }
  }
}
</script>

<style>
.entry-title {
  font-weight: bold;
}
</style>