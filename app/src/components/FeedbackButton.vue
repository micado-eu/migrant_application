<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-btn
      round
      icon="star"
      color="grey"
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
          <h5> Your feedback will be sent to </h5>
          <div> {{paMail}}</div>
          <h5> Your feedback will be about the page found at  </h5>
          <div> {{link}}</div>    
          <h5> Write your feedback here  </h5> 
          <q-input
            outlined
            type="textarea"
            filled
            dense
            counter
            v-model="feedback"
          />
          <q-btn
            label="Send"
            color="black"
            size="15px"
            @click="sendFeedback()"
          />      
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
</style>