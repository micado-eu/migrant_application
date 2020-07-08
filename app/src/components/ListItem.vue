<template>
  <div style="width:100%">
    <div
      :id="item"
      style="text-align:left; margin-right:0px; width:94%; background-color:#EDEDED; margin-top:0px; margin-bottom:0px; font-size:13px; font-weight:700; margin-left:16px; margin-right:25px"
      v-if="typeof item === 'string'"
    >
      {{ item }}
    </div>
    <div
      class="row"
      v-else
    >
      <div class="col-11">

        <q-item
          style="padding-top:0px; padding-bottom:0px;padding-right:0px; padding-left:0px; margin-left:16px"
          clickable
          @click="processDetails"
        >
          <div style="width:100%">

            <div
              class=" q-pa-md"
              style="; padding-bottom:0px; padding-left:0px; padding-top:10px"
            >
              <div style="font-family: 'Nunito Sans', sans-serif; text-align:left; font-size:13px; font-weight:700;width:135%">{{ this.Title }}</div>
            </div>

            <div
              class=" row"
              style="padding-bottom:5px"
            >
              <q-img
                style="height: 15px; max-width: 15px;margin-right:5px"
                v-for="tag in Topics"
                :src="topics.filter(topic => topic.id == tag)[0].icon"
                :key="tag"
              >
                <q-tooltip>
                  {{topics.filter(topic => topic.id == tag)[0].topic}}
                </q-tooltip>
              </q-img>
              <q-icon
                style="margin-right:5px"
                v-for="tag in Users"
                :name="tag.icon"
                :key="tag.id"
              />
            </div>
            <hr style="margin:0px;width:105%">
          </div>
        </q-item>

      </div>
      <div
        class="col-1"
        style="padding-left:0px;margin-top:27px; padding-right:10px;"
      >

        <TalkingLabel
          ref="read"
          @click.native="readAlong($event)"
        ></TalkingLabel>

      </div>

    </div>
  </div>
</template>

<script>
import TalkingLabel from './TalkingLabel'
export default {
  name: 'Process',
  props: ["Title", "Topics", "Users", "Link", "Path", "item"],
  data () {
    return {};
  },
  components: {
    TalkingLabel
  },
  computed: {
    topics () {
      return this.$store.state.topic.topic
    },
    users () {
      return this.$store.state.user_type.user_type
    },
  },
  methods: {
    showProcess (event) {
      let target = event.currentTarget.id
      console.log(this.Link)
      this.$emit('showing', this.Link)

    },
    readAlong (event) {
      console.log(this.$refs.read)
      this.$refs.read.readClick(this.Title)

    },
    processDetails () {
      this.$router.push('processes/' + this.Link)
    }
  }
}
</script>
<style scoped>
/*div >>> .q-item {
  border-radius: 2rem;

  &:hover {
    color: blue;
  }
}*/
</style>