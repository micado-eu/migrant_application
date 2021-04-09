<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-btn
      round
      icon="img:statics/icons/Icon - Feedback button.svg"
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
          <!--<h5 class="text"> {{$t('feedback.mail')}} </h5>-->
          <div style="text-align:center"> 
            <q-icon style="padding-right:10px" size="30px" :name="'img:statics/icons/negative.png'"/>
            <q-icon style="padding-right:10px" size="30px" :name="'img:statics/icons/neutral.png'"/>
            <q-icon style="padding-right:10px" size="30px" :name="'img:statics/icons/positive.png'"/>
          </div>
          <h5 class="text"> {{$t('feedback.url')}} </h5>
          <div> {{link}}</div>    
          <h5 class="text"> {{$t('feedback.feedback')}}  </h5> 
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
  </div>
</template>

<script>

import storeMappingMixin from '../mixin/storeMappingMixin'

export default {
  mixins:[
    storeMappingMixin({
    getters: {
      settings:'settings/settings'
    }, actions: {
     fetchSettings: 'settings/fetchSettings',
     saveFeedback:'feedback/saveFeedback'
    }
  })
  ],
  data() {
    return {
      loading: true,
      layout: false,
      link:null,
      feedback:""
    }
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
    sendFeedback(){
      console.log("I am sending feedback")
      this.saveFeedback({url:this.link, feedback:this.feedback, feedbackDate:new Date().toISOString() })
      this.layout = false
      this.feedback = ""
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
</style>