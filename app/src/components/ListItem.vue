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
              <div
                class="div-2"
                :data-cy="'process'.concat(Link)"
              >
                <TalkingLabel
                style="width:100%"
                  :icon="icon"
                  :Title="Title"
                  :text="Title"
                  :row="'row'"
                  :title_col="'col-11'"
                  :icon_col="'col-1'"
                  :icon_style="'text-align:right'"
                  :icon_size="size"
                  :showing="'white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'"
                >
                </TalkingLabel>
              </div>
            </div>
           <q-icon v-if="compare_date < $durationOfNew" name="img:statics/icons/new_icon.png" size="md"/>
          <glossary-editor-viewer 
            v-if="Description" 
            :content="Description"
            all_fetched
            ref="descViewer"
            hideContent
          >
            <div v-html="highlightedText"></div>
          </glossary-editor-viewer>
            <hr class="hr">
          </div>
        </q-item>
        
      </div>
    </div>
  </div>
</template>

<script>
const TalkingLabel = () => import('./TalkingLabel')
import storeMappingMixin from '../mixin/storeMappingMixin'
import GlossaryEditorViewer from "./GlossaryEditorViewer"

export default {
  name: 'Process',
  props: ["Title", "Description", "Topics", "Users", "Link", "Path", "item", "Rating", 'type','icon', 'size', 'published_date', 'highlightWords'],
  mixins: [
    storeMappingMixin({
      getters: {
        topics: 'topic/topics',
        users: 'user_type/users'
      }
    })
  ],
  data () {
    return {
      user_list:[],
      topic_list:[],
      highlightedText: "",
    };
  },
  components: {
    TalkingLabel,
    GlossaryEditorViewer
  },
  computed: {
    /*parsedRating () {
      return parseFloat(this.Rating)
    },
    sortedUsers(){
      this.user_list = JSON.parse(JSON.stringify(this.Users))
      if(this.user_list!=null){
              return this.user_list.sort()
      }
    },
        sortedTopics(){
      this.topic_list = JSON.parse(JSON.stringify(this.Topics))
      if(this.topic_list!= null){
       return this.topic_list.sort()
      }
      
    }*/
    compare_date(){
      var date1 = new Date()
      var date2 = new Date(this.published_date)
      //console.log(this.published_date)
      //console.log(date1)
      console.log(date2)
      //console.log(date1.getTime()-date2.getTime())
      var difference = date1.getTime()-date2.getTime()
      console.log(difference)
      var days = difference/(1000 * 3600 * 24)
      console.log(days)
      return days
    }
  },
  methods: {
    showProcess (event) {
      let target = event.currentTarget.id
      console.log(this.Link)
      this.$emit('showing', this.Link)
    },
    processDetails () {
      if(this.type =='flow'){
        console.log("emitting flow")
        this.$emit('flow',{processid: this.Link, type:this.type})
      }
      else if(this.type == 'info'){
        console.log("emitting info")
        this.$emit('info',{processid: this.Link, type:this.type})
      }
      else if(this.type =='event'){
      console.log("emitting event")
        this.$emit('event',{processid: this.Link, type:this.type})
      }
      //this.$router.push({ name: 'document', params: { processid: this.Link } })
      
    },
    plainTextDescription() {
      console.log(this.Title)
      if (this.$refs.descViewer && this.highlightWords) {
        const ht = this.$refs.descViewer.highlightedText(this.highlightWords)
        console.log(ht)
        return ht 
      }
    }
  },
  watch: {
    highlightWords: function (newHW, oldHW) {
      this.$nextTick().then(() => {
        this.highlightedText = this.plainTextDescription()
      })
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  padding-right:10px
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
  width: 100%;
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
  width: 100%;
  color:#000000
}
</style>