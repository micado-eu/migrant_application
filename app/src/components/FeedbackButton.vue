<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-btn
      round
      icon="img:statics/icons/Icon - Feedback_NEW.svg"
      color="white"
      size="15px"
      @click="layout = true"
    />

    <q-dialog v-model="layout">
      <q-layout
        view="Lhh lpR fff"
        container
        class="bg-white"
      >
        <q-header>
          <q-toolbar class="bg-white">
            <q-toolbar-title style="color:black">Send Feedback to PA</q-toolbar-title>
            <q-btn
              color="red"
              flat
              v-close-popup
              round
              dense
              icon="close"
            />
          </q-toolbar>
        </q-header>

        <q-page-container class="q-ma-sm">
          <span v-if="loading">Loading...</span>
          <q-page
            v-else
            padding
          >
          <TalkingLabel
          class="option"
                style="width:100%"
                  :Title="$t('feedback.feedback_question')"
                  :text="$t('feedback.feedback_question')"
                  :row="'row'"
                  :title_col="'col-11'"
                  :icon_col="'col-1'"
                  :icon_style="'text-align:right'"
                />
          <!--<h5 class="text"> {{$t('feedback.mail')}} </h5>-->
          <div style="text-align:center"> 
            <q-icon style="padding-right:35px;padding-top:20px" @click="rating.value = -1" size="30px" :name="'img:statics/icons/Icon - Not satisafied.svg'"/>
            <q-icon style="padding-right:35px;padding-top:20px" @click="rating.value = 0" size="30px" :name="'img:statics/icons/Icon - Neutral.svg'"/>
            <q-icon style="padding-top:20px" size="30px" @click="rating.value = 1" :name="'img:statics/icons/Icon - very satisfied.svg'"/>
          </div>
          <!--<h5 class="text"> {{$t('feedback.url')}} </h5>-->
          <TalkingLabel
                  class="option_2"
                  style="width:100%;"
                  :Title="$t('feedback.url')"
                  :text="$t('feedback.url') + this.link"
                  :row="'row'"
                  :title_col="'col-11'"
                  :icon_col="'col-1'"
                  :icon_style="'text-align:right'"
                  
                />
          <div style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'"> {{link}}</div>  
          <TalkingLabel
                  class="option_2"
                  style="width:100%"
                  :Title="$t('feedback.feedback')"
                  :text="$t('feedback.feedback')"
                  :row="'row'"
                  :title_col="'col-11'"
                  :icon_col="'col-1'"
                  :icon_style="'text-align:right'"
                />
          <!--<h5 class="text"> {{$t('feedback.feedback')}}  </h5>--> 
          <q-input
            outlined
            type="textarea"
            filled
            dense
            counter
            v-model="feedback"
          />
          <div style="text-align:center">
          <q-btn
            :label="$t('feedback.send')"
            :icon-right="'img:statics/icons/Icon - Round checkmark.svg'"
            color="info"
            rounded
            no-caps
            size="15px"
            @click="sendFeedback()"
          />
          </div>
                
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    <q-dialog v-model="confirm">
<q-card class="q-pa-md" style="padding-top:0px">

          <div style="padding-top:50px; text-align:center">
          <q-icon  size="150px" :name="'img:statics/icons/Icon - Round checkmark orange.svg'"/>
          <p class="thanks">{{$t('feedback.thanks')}}</p>
          <TalkingLabel
                  class="option_3"
                  style="width:100%"
                  :Title="$t('feedback.feedback_sent')"
                  :text="$t('feedback.feedback_sent')"
                />
          </div>
          <div style="text-align:center; padding-top:30px">
          <q-btn
            class="go_back"
            :label="$t('button.go_back')"
            :icon="'img:statics/icons/Icon - go back.svg'"
            rounded
            no-caps
            size="15px"
            @click="confirm = false"
          />
          </div>
                
</q-card>
    </q-dialog>
  </div>
</template>

<script>

import storeMappingMixin from '../mixin/storeMappingMixin'
const TalkingLabel = () => import('./TalkingLabel')


export default {
  mixins:[
    storeMappingMixin({
    getters: {
      user: 'auth/user',
      settings:'settings/settings'
    }, actions: {
     fetchSettings: 'settings/fetchSettings',
     saveFeedback:'feedback/saveFeedback',
     saveRatings:'feedback/saveRatings'
    }
  })
  ],
  data() {
    return {
      loading: true,
      layout: false,
      confirm:false,
      link:null,
      feedback:"",
      rating:{
        userId: 0,
        userTenant:this.$migrant_tenant,
        contentId:null,
        contentType:null,
        value:0,
        date:null
      }
    }
  },
  components:{
    TalkingLabel
  },
  computed: {
    paMail(){
      return this.settings.filter((mail)=>{
        return mail.key=='feedback_email'
      })[0].value
    },

  },
  updated() {
    this.link = window.location.href 
  },
  methods: {
    checkContentType(type){

        if(type.includes('processes')){
          this.rating.contentType = 1
        }
        else if(type.includes('information')){
          this.rating.contentType = 2
        }
        else if(type.includes('glossary')){
          var param = window.location.search
          this.rating.contentId= Number(param.match(/(\d+)/)[0]);
          this.rating.contentType = 3
        }
        else if(type.includes('tasks')){
          this.rating.contentType = 4
        }
        else if(type.includes('documents')){
          this.rating.contentType = 5
        }
        else if(type.includes('events')){
          this.rating.contentType = 6
        }
        else if(type.includes('topic')){
          this.rating.contentType = 0
          this.rating.contentId = 0
        }
        else{
          this.rating.contentType = 0
        }
    },
    sendFeedback(){
      console.log("I am sending feedback")
      this.saveFeedback({url:this.link, feedback:this.feedback, feedbackDate:new Date().toISOString() })
      var path = window.location.pathname
      console.log( path)
      if(/\d/.test(path)){
        this.rating.contentId= Number(path.match(/(\d+)/)[0]);
      }
      else{
        this.rating.contentId = 0
      }
      if(this.$auth.loggedIn()){
        console.log("LOgged user")
        this.rating.userId = this.user.umid
      }
      this.checkContentType(path)
      this.rating.date = new Date().toISOString()
      this.saveRatings(this.rating)
      console.log(this.rating)
      this.layout = false
      this.feedback = ""
      this.confirm = true
    }
    
  },
  created() {
    this.fetchSettings().then((settings) => {
      console.log("i am settings")
      console.log(settings)
      this.loading= false
    })
  }
}
</script>
<style scoped lang="scss">
  .language_modal {
    flex-direction: column;
    flex-wrap: nowrap;
  }
  .text{
    font-family: Nunito;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
  }
  .option{
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 19px;
    color: #0F3A5D;
  }
  .option_2{
    font-family: Nunito;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 14px;
    color: #000000;
    padding-top:40px;
    padding-bottom:10px;
    
  }
  .go_back {
  background-color: white;
  color:#0F3A5D;
  border: 1px solid #0F3A5D;
  border-radius: 50px;
}
.thanks{
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 34px;
  color: #0F3A5D;
}
.option_3{
  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  color: #000000;
}
</style>