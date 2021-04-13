<template>
  <span>
    <q-img
      :src="elem.icon"
      spinner-color="white"
      id="image"
      :alt="elem[type]"
      class="filter-icon q-ml-sm"
      :img-style="{'max-width': '24px', 'max-height': '24px'}"
      @click="dialog = true"
    >
      <q-tooltip :key="type + '_tooltip'.concat(elem.id)">
        {{elem[type]}}
      </q-tooltip>
    </q-img>
    <q-dialog v-model="dialog">
      <q-card>
        <q-toolbar class="bg-white text-white">
          <q-space></q-space>
          <q-btn
            flat
            round
            dense
            icon="close"
            color="accent"
            v-close-popup
          />
        </q-toolbar>
        <q-card-section class="center-text q-pa-xl">
          <div>
            <q-img
              :src="elem.icon"
              spinner-color="white"
              :alt="elem[type]"
              class="big-icon q-mb-md"
              :img-style="{'width': '55px', 'height': '55px'}"
            ></q-img>
          </div>
          <div>
            <span class="dialog-text">{{dialogTitle}}: {{elem[type]}}</span>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </span>
</template>

<script>
import TalkingLabel from '../TalkingLabel.vue';

export default {
  components: {
    TalkingLabel
  },
  props: ["elem", "type"],
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    dialogTitle() {
      switch (this.type) {
        case "topic": return this.$t("icon_overlay.topic")
        case "user_type": return this.$t("icon_overlay.user_type")
        default: return this.type
      }
    }
  }
}
</script>

<style>
.filter-icon {
  max-height: 24px;
  max-width: 24px;
}
.big-icon {
  height: 55px;
  width: 55px;
}
.dialog-text {
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;

  color: #0F3A5D;
}
</style>