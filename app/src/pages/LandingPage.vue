<template>
  <div>
    <div style="text-align:center">
   <q-icon name="img:statics/icons/MICADO APP - Welcome page Graphics-02 1.svg" class="top-icon"/>
    </div>
    <div class="help-text pad">
      <TalkingLabel
                style="width:100%"
                  :Title="$t('welcome_page.welcome_text')"
                  :text="$t('welcome_page.welcome_explanation')"
                  :row="'row'"
                  :title_col="'col-11'"
                  :container_style="'display: flex;'"
                  :icon_style="'flex-shrink:0;text-align:right'"
                  :showing="'flex-grow:1;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'"
                  :white="true"
                />
    </div>
    
    <div class="category-contents pad">
      <TalkingLabel
                style="width:100%"
                  :Title="$t('welcome_page.topic_content')"
                  :text="$t('welcome_page.topic_content')"
                  :row="'row'"
                  :title_col="'col-11'"
                  :container_style="'display: flex;'"
                  :icon_style="'flex-shrink:0;text-align:right'"
                  :showing="'flex-grow:1;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'"
                />
    </div>
      <div class="q-pa-md ">
    <q-scroll-area style="height: 110px; max-width: 100%;">
      <div class="row no-wrap">
        <div
          class="q-gutter-sm col topic_box"
          @click="topic_open = topic.id"
          v-for="topic in topics"
          :key="topic.id"
        >
          <TalkingLabel
            style="width:95%;margin-left: 0px; margin-top: 0px; margin-right:0px"
            :text="topic.topic"
            :row="'row'"
            :title_col="' ellipsis col-10'"
            :icon_col="'col-2'"
            :icon_style="'text-align:right'"
          />
          <q-img
            :src="topic.icon"
            style="margin-left: 0px; max-width: 40px; max-heigth: 40px"
          />
          <div class="q-px-xs topic_names" style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">
            {{ topic.topic }}
          </div>
          <HelpDialog 
              :open="topic_open == topic.id"
              :title="topic.topic"
              :content_type="'topic'"
              :content="topic.description"
              :icon="topic.icon"
              @hiding="topic_open = null"/>
        </div>
      </div>
    </q-scroll-area>
  </div>
  <hr class="separation"/>
  <div class="category-contents pad">
      <TalkingLabel
                style="width:100%"
                  :Title="$t('welcome_page.category_content')"
                  :text="$t('welcome_page.category_content')"
                  :row="'row'"
                  :title_col="'col-11'"
                  :container_style="'display: flex;'"
                  :icon_style="'flex-shrink:0;text-align:right'"
                  :showing="'flex-grow:1;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'"
                />
    </div>
    <div class="row topic_layout">
      <TopicBox
      @click.native="dialog_info = true"
      :contentName="$t('menu.info')"
      :boxstile="'min-width:100px;max-width:100px'"
      :contentIcon="'img:statics/icons/Icon - Information Centre.svg'"
      />
      <TopicBox
      @click.native="dialog_process = true"
      :contentName="$t('menu.guides')"
      :boxstile="'min-width:100px;max-width:100px'"
      :contentIcon="'img:statics/icons/Icon - Integration step-bystep.svg'"
      />
      <TopicBox
      @click.native="dialog_events = true"
      :contentName="$t('menu.events')"
      :boxstile="'min-width:100px;max-width:100px'"
      :contentIcon="'img:statics/icons/Icon - Events (4th Iteration)_.svg'"
      />
    </div>
    <hr class="separation"/>
    <HelpDialog 
    :open="dialog_info"
    :title="$t('menu.info')"
    :content_type="'menu'"
    :content="information"
    :icon="'img:statics/icons/MICADO APP - Welcome page - Basic information-03 1.svg'"
    @hiding="dialog_info = false"/>

    <HelpDialog 
    :open="dialog_process"
    :title="$t('menu.guides')"
    :content_type="'menu'"
    :content="guides"
    :icon="'img:statics/icons/MICADO APP - Welcome page - step by step--04 1.svg'"
    @hiding="dialog_process = false"/>

    <HelpDialog 
    :open="dialog_events"
    :title="$t('menu.events')"
    :content_type="'menu'"
    :content="events"
    :icon="'img:statics/icons/MICADO APP - Welcome page - events & courses-05 1.svg'"
    @hiding="dialog_events = false"/>
  <div v-if="tasksAndPlans" class="category-contents pad">
      <TalkingLabel
                style="width:100%"
                  :Title="$t('welcome_page.login_content')"
                  :text="$t('welcome_page.login_content')"
                  :row="'row'"
                  :title_col="'col-11'"
                  :container_style="'display: flex;'"
                  :icon_style="'flex-shrink:0;text-align:right'"
                  :showing="'flex-grow:1;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'"
                />
    </div>
    <div v-if="tasksAndPlans" class="row topic_layout">
      <TopicBox
      v-if="docs"
      @click.native="dialog_doc = true"
      :boxstile="'min-width:160px;max-width:160px'"
      :contentName="$t('menu.documents')"
      :contentIcon="'img:statics/icons/Icon - My Documents (selcted).svg'"
      />
      <TopicBox
      v-if="tasks"
      @click.native="dialog_plan = true"
      :boxstile="'min-width:160px;max-width:160px'"
      :contentName="$t('menu.integration_plan')"
      :contentIcon="'img:statics/icons/Icon - My Integration Plan (selected1).svg'"
      />
    </div>
    <hr v-if="tasksAndPlans" class="separation"/>
    <HelpDialog 
    :open="dialog_doc"
    :title="$t('menu.documents')"
    :content_type="'menu'"
    :content="documents"
    :icon="'img:statics/icons/MICADO APP - Welcome page - My documents-06 1.svg'"
    @hiding="dialog_doc = false"/>

    <HelpDialog 
    :open="dialog_plan"
    :title="$t('menu.integration_plan')"
    :content_type="'menu'"
    :content="plans"
    :icon="'img:statics/icons/MICADO APP - Welcome page - Integration PLan-07 1.svg'"
    @hiding="dialog_plan = false"/>
     <div class="row" style="text-align:center; margin-bottom:20px; margin-top:25px;  justify-content: center;">
    <q-btn
          :label="$t('welcome_page.start')"
          class="button"
          :icon="'img:statics/icons/Icon - lets start.svg'"
          no-caps
          @click="$router.push({ name: 'topic'})"
        />
        <TalkingLabel
                  :text="$t('welcome_page.start')"
                  :icon_style="'margin-top:7px; margin-left:10px'"                  
                />
  </div>
        <hr class="separation"/>
 
  <div v-if="show_landing_page_choice" class="row">
       <div class="q-gutter-sm col" style="max-width:60px">
      <q-checkbox v-model="val" @input="setPreference($event)" color="accent"/>
    </div>
    <div class="col" style="margin-top:10px; padding-right:15px">
      <TalkingLabel
                style="width:100%"
                  :Title="$t('welcome_page.no_landing_page')"
                  :text="$t('welcome_page.no_landing_page')"
                  :row="'row'"
                  :title_col="'col-11'"
                  :container_style="'display: flex;'"
                  :icon_style="'flex-shrink:0;text-align:right'"
                  :showing="'flex-grow:1;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'"
                  
                />
    </div>
    </div>
  </div>
</template>

<script>
const TalkingLabel = () => import('components/TalkingLabel')
const TopicBox = () => import('components/TopicBox')
const HelpDialog = () => import('components/HelpDialog')
import storeMappingMixin from "../mixin/storeMappingMixin";



export default {
  // name: 'PageName',
    mixins: [
    storeMappingMixin({
      getters: {
        topics: "topic/topics",
        mixed_settings:"settings/mixed_settings",
        features:"features/features"
      },
      actions: {
        fetchTopic: "topic/fetchTopic",
        fetchMixedSettings:"settings/fetchMixedSettings"
      },
    })
  ],
  data () {
    return {
      dialog_info:false,
      dialog_process:false,
      dialog_events:false,
      topic_open:null,
      dialog_doc:false,
      dialog_plan:false,
      val:false
    }
  },
  computed:{
    information(){
      var info = this.mixed_settings.filter((set) => set.key == 'info')
      if(info.length >0){
        return info[0].value
      }
      else{
        return 'default text'
      }
    },
    guides(){
      var info = this.mixed_settings.filter((set) => set.key == 'guides')
      if(info.length >0){
        return info[0].value
      }
      else{
        return 'default text'
      }
    },
    events(){
            var info = this.mixed_settings.filter((set) => set.key == 'event')
      if(info.length >0){
        return info[0].value
      }
      else{
        return 'default text'
      }
    },
    plans(){
      var info = this.mixed_settings.filter((set) => set.key == 'plan')
      if(info.length >0){
        return info[0].value
      }
      else{
        return 'default text'
      }
    },
    documents(){
      var info = this.mixed_settings.filter((set) => set.key == 'doc')
      if(info.length >0){
        return info[0].value
      }
      else{
        return 'default text'
      }
    },
    show_landing_page_choice(){
      return (localStorage.getItem('landingPage') == 'true' || localStorage.getItem('landingPage') == null)
    },
    tasksAndPlans(){
      console.log(this.features)
      return ((this.features.filter((feat)=> {return feat == "FEAT_MIGRANT_LOGIN"}).length >0) && (this.features.filter((feat)=> {return feat == "FEAT_DOCUMENTS"}).length >0 || this.features.filter(feat => feat == "FEAT_TASKS").length >0))
    },
    tasks(){
      return this.features.filter((feat)=> {return feat == "FEAT_MIGRANT_LOGIN"}).length >0 && this.features.filter((feat)=> {return feat == "FEAT_TASKS"}).length >0
    },
    docs(){
      return this.features.filter((feat)=> {return feat == "FEAT_MIGRANT_LOGIN"}).length >0 && this.features.filter((feat)=> {return feat == "FEAT_DOCUMENTS"}).length >0
    }
  },
  methods:{
    setPreference(value){
      console.log(value)
      localStorage.setItem('landingPage', 'false');
    }
  },
  components:{
    TalkingLabel,TopicBox,
  HelpDialog
  },
  created () {
     this.fetchTopic({
        defaultLang: this.$defaultLang,
        userLang: this.$userLang,
      });
      this.fetchMixedSettings().then(ret=> console.log(ret))
}
}
</script>
<style scoped>
.top-icon{
  width:100%;
  height:100%
}
.pad{
  padding-left: 15px;
  padding-right: 15px;
}
.help-text{
  color: white;
  background: #0B91CE;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-bottom: 30px;
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
}
.center{
  text-align: center;
}
.topic_layout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  margin-bottom: 25px;
}
.button{
  width: 250px;
color: white;
background: #0B91CE;
border-radius: 50px;
}
.separation{
  color: #BDBDBD;
}
.topic_box{
  text-align: center;
  background-color: #fafafa;
  max-width: 100px;
  min-width: 100px;
  height: 100px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  border: 0.5px solid #5C81A2;
  border-radius: 5px;
}
.topic_names {
  color: #5c81a2;
  margin-left: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 12px;
}
</style>