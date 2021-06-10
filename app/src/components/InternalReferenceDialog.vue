<template>
  <q-card>
    <q-toolbar class="bg-accent text-white">
      <q-avatar>
        <img src="statics/icons/Icon - Internal Reference.svg">
      </q-avatar>

      <q-toolbar-title>{{title}}</q-toolbar-title>

      <q-btn
        flat
        round
        dense
        icon="close"
        @click="$emit('close', true)"
      />
    </q-toolbar>
    <q-card-section v-if="notFound">
      <div class="q-mt-xl text-center">
        <img
          src="~assets/sad.svg"
          style="width:30vw;max-width:150px;"
        >
        <p class="text-faded">{{$t("error404")}}<strong>(404)</strong></p>
      </div>
    </q-card-section>
    <q-card-section
      v-else
      class="center-text"
    >
      <slot></slot>
      <div class="q-mt-xl">
        {{$t("internal_reference.more_info_1")}} "<span class="more-info-title">{{title}}</span>" {{$t("internal_reference.more_info_2")}}
      </div>
      <div>
        <router-link
          class="q-mt-xl"
          :to="link"
        >
          {{fullLink}}
        </router-link>
      </div>
      <talking-label :text="$t('internal_reference.more_info_1') + ' ' + title + ' ' + $t('internal_reference.more_info_2') + ' ' + fullLink"></talking-label>
      <div class="row flex-center">
        <q-btn
          class="q-mt-xl q-mb-lg q-mr-md reference-btn col-shrink"
          no-caps
          unelevated
          :to="link"
        >
          {{$t("internal_reference.go_to_reference")}}
        </q-btn>
        <talking-label
          :text="$t('internal_reference.go_to_reference')"
          class="q-mt-xl q-mb-lg col-shrink"
        ></talking-label>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import TalkingLabel from 'components/TalkingLabel'

export default {
  components: {
    TalkingLabel
  },
  props: {
    title: {
      type: String,
      default: this.$t("internal_references.default_title")
    },
    link: {
      type: String
    },
    notFound: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      getUrl: window.location
    }
  },
  computed: {
    fullLink() {
      return this.getUrl.protocol + "//" + this.getUrl.host + this.link
    }
  }
}
</script>

<style>
.more-info-title {
  color: #ff7c44;
}
.center-text {
  text-align: center;
}
.reference-btn {
  border-radius: 50px;
  border: 1px solid #ff7c44;
  color: black;
  font-weight: bold;
}
</style>