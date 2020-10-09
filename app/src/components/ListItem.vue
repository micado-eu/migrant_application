<template>
  <div
    class="container"
    style=""
  >
    <div
      :id="item"
      class="item"
      style=""
      v-if="typeof item === 'string'"
    >
      {{ item }}
    </div>
    <div
      class="row"
      v-else
    >
      <div class="col-12">
        <q-item
          class="item-2"
          clickable
          @click="processDetails"
        >
          <div class="container">
            <div class=" q-pa-md div-1">
              <div class="div-2">
                <TalkingLabel
                  :Title="this.Title"
                  :text="this.Title"
                >
                </TalkingLabel>
              </div>
            </div>
            <div class="row pad">
              <div class="col-3">
                <q-img
                  class="image"
                  v-for="tag in Topics"
                  :src="topics.filter(topic => topic.id == tag)[0].icon"
                  :key="tag"
                >
                  <q-tooltip>
                    {{topics.filter(topic => topic.id == tag)[0].topic}}
                  </q-tooltip>
                </q-img>
              </div>
              <div class="col-3">
                <q-img
                  class="image"
                  v-for="tag in Users"
                  :src="users.filter(user => user.id == tag)[0].icon"
                  :key="tag"
                >
                  <q-tooltip>
                    {{users.filter(user => user.id == tag)[0].user_type}}
                  </q-tooltip>
                </q-img>
              </div>
              <q-rating
                v-model="this.Rating"
                size="1em"
                color="orange"
              />
            </div>
            <hr class="hr">
          </div>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script>
import TalkingLabel from './TalkingLabel'
import storeMappingMixin from '../mixin/storeMappingMixin'

export default {
  name: 'Process',
  props: ["Title", "Topics", "Users", "Link", "Path", "item", "Rating"],
  mixins: [
    storeMappingMixin({
      getters: {
        topics: 'topic/topics',
        users: 'user_type/users'
      }
    })
  ],
  data () {
    return {};
  },
  components: {
    TalkingLabel
  },
  methods: {
    showProcess (event) {
      let target = event.currentTarget.id
      console.log(this.Link)
      this.$emit('showing', this.Link)
    },
    processDetails () {
      this.$router.push({ name: 'document', params: { processid: this.Link } })
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
}
.item {
  text-align: left;
  margin-right: 0px;
  width: 100%;
  background-color: #ededed;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 13px;
  font-weight: 700;
  margin-left: 16px;
  margin-right: 25px;
}
.item-2 {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
  padding-left: 0px;
  margin-left: 16px;
}
.div-1 {
  padding-bottom: 0px;
  padding-left: 0px;
  padding-top: 10px;
}
.div-2 {
  font-family: "Nunito Sans", sans-serif;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  width: 135%;
}
.pad {
  padding-bottom: 5px;
}
.image {
  height: 15px;
  max-width: 15px;
  margin-right: 5px;
}
.hr {
  margin: 0px;
  width: 105%;
}
</style>