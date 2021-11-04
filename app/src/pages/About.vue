<template>
      <div >

   <q-item clicakble v-if="survey_visible" @click.native="openSurvey">
   <TalkingLabel
   class="q-pa-md option"
    style="width:100%"
    :icon="'img:statics/icons/Icon - Survey NEW.svg'"
    :icon_size="'30px'"
    :Title="$t('desc_labels.survey_desc')"
    :text="$t('desc_labels.survey_desc')"
    :row="'row'"
    :title_col="'col-10 option'"
    :container_style="'display: flex;'"
    :icon_style="'flex-shrink:0;text-align:right'"
    :showing="'flex-grow:1;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'"
    />
  </q-item>
  <div v-if="survey_visible" style="background-color:#EFEFEF; height:5px">
    &nbsp;
  </div>
     <q-item clicakble @click.native="welcome">
   <TalkingLabel
   class="q-pa-md option"
    style="width:100%"
    :icon="'img:statics/icons/Icon - Welcome page.svg'"
    :icon_size="'30px'"
    :Title="$t('menu.welcome')"
    :text="$t('menu.welcome')"
    :row="'row'"
    :title_col="'col-10 option'"
    :container_style="'display: flex;'"
    :icon_style="'flex-shrink:0;text-align:right'"
    :showing="'flex-grow:1;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'"
    />
  </q-item>
  <div style="background-color:#EFEFEF; height:5px">
    &nbsp;
  </div>
      <q-item  clicakble @click.native="privacy">
   <TalkingLabel
   class="q-pa-md option"
    style="width:100%"
    :icon="'img:statics/icons/Icon - Privacy 1.svg'"
    :icon_size="'30px'"
    :Title="$t('menu.policy')"
    :text="$t('menu.policy')"
    :row="'row'"
    :title_col="'col-10 option'"
    :container_style="'display: flex;'"
    :icon_style="'flex-shrink:0;text-align:right'"
    :showing="'flex-grow:1;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'"
    />
  </q-item>
  <div style="background-color:#EFEFEF; height:5px">
    &nbsp;
  </div>
      <q-item  clicakble @click.native="consent">
   <TalkingLabel
   class="q-pa-md option"
    style="width:100%"
    :icon="'img:statics/icons/Icon - Consent 2.svg'"
    :icon_size="'30px'"
    :Title="$t('menu.consent')"
    :text="$t('menu.consent')"
    :row="'row'"
    :title_col="'col-10 option'"
    :container_style="'display: flex;'"
    :icon_style="'flex-shrink:0;text-align:right'"
    :showing="'flex-grow:1;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'"
    />
  </q-item>
  <div style="background-color:#EFEFEF; height:5px">
    &nbsp;
  </div>
  <q-item  clicakble @click.native="poweredBy">
   <TalkingLabel
   class="q-pa-md option"
    style="width:100%"
    :icon="'img:statics/icons/Icon - Pwered by 1.svg'"
    :icon_size="'30px'"
    :Title="$t('menu.funding')"
    :text="$t('menu.funding')"
    :row="'row'"
    :title_col="'col-10 option'"
    :container_style="'display: flex;'"
    :icon_style="'flex-shrink:0;text-align:right'"
    :showing="'flex-grow:1;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'"
    />
  </q-item>
      <div style="background-color:#EFEFEF; height:5px">
    &nbsp;
  </div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{$t('desc_labels.survey')}}</div>
        </q-card-section>

        <q-separator />

        <q-card-section v-if=" settings.filter((set)=>{return set.key == 'survey_local'}).length >0 ||settings.filter((set)=>{return set.key == 'survey_en'}).length >0" style="max-height: 50vh" >
        <div v-if=" settings.filter((set)=>{return set.key == 'survey_local'}).length >0" >{{this.$defaultLangString}}</div><br>
        <a v-if=" settings.filter((set)=>{return set.key == 'survey_local'}).length >0" :href="this.settings.filter((set)=>{return set.key == 'survey_local'})[0].value">
        {{this.settings.filter((set)=>{return set.key == 'survey_local'})[0].value}}<br>
        </a>
        <div v-if=" settings.filter((set)=>{return set.key == 'survey_en'}).length >0">English </div> <br>
        <a v-if=" settings.filter((set)=>{return set.key == 'survey_en'}).length >0" :href="this.settings.filter((set)=>{return set.key == 'survey_en'})[0].value">
        {{this.settings.filter((set)=>{return set.key == 'survey_en'})[0].value}}<br>
        </a>
                </q-card-section>

        
      </q-card>
    </q-dialog>
    <q-dialog v-model="alert_int" full-width>
       <q-layout
        view="Lhh lpR fff"
        container
        class="bg-white"
      >
        <q-page-container>
          <q-page class="q-pa-sm">
      <div id="surveyContainer">
            <survey :survey="survey"></survey>
          </div>

        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </div>
</template>

<script>
const TalkingLabel = () => import('components/TalkingLabel')
import storeMappingMixin from "../mixin/storeMappingMixin";
import * as SurveyVue from 'survey-vue'

export default {
  name: 'PageIndex',
  components:{
    TalkingLabel,
    SurveyVue
  },
  mixins: [
    storeMappingMixin({
      getters: {
        mixed_settings:"settings/mixed_settings",
        surveys: 'survey/surveys',
        loggedIn: 'auth/loggedIn',
        settings: "settings/settings",
        user: 'auth/user',
        surveyJSON:'survey/surveyJSON',
      },
      actions: {
        fetchMixedSettings:"settings/fetchMixedSettings",
        fetchMigrantSurvey: 'survey/fetchMigrantSurvey',
        saveSurveyAnswer: 'survey/saveSurveyAnswer',
        setSurveyJSON:"survey/setSurveyJSON"
      },
    })
  ],
  data () {
    return {
      logged: false,
      alert:false,
      survey:null,
      alert_int:false,
    }
  },
  computed:{
        survey_visible(){
      var surveyType = this.settings.filter((set)=>{
        return set.key =='internal_survey'
      })
      console.log(this.user)
       if(surveyType.length >0){
        if(surveyType[0].value =='true'){
          if(this.$auth.loggedIn() && this.surveyJSON !=null){
            return true
          }
          else{
            return false
          }
          
        }
        else{
          if(this.settings.filter((set)=>{return set.key == 'survey_local'}).length >0 || this.settings.filter((set)=>{return set.key == 'survey_en'}).length >0){
            return true
          }
          else{
            return false
          }
        }
      }
      else{
         if(this.settings.filter((set)=>{return set.key == 'survey_local'}).length >0 || this.settings.filter((set)=>{return set.key == 'survey_en'}).length >0){
            return true
          }
          else{
            return false
          }
      }
    }
      },
  methods:{
    openSurvey(){
      var surveyType = this.settings.filter((set)=>{
        return set.key =='internal_survey'
      })
      console.log(surveyType)
      console.log(typeof(surveyType))
      if(surveyType.length >0){
        if(surveyType[0].value =='true'){
          this.generateSurvey()
        }
        else{
          this.alert = true
        }
      }
      else{
        this.alert = true
      }
    },
     welcome(){
       console.log("in welcome")
       this.$router.push({name:'welcome'})      
     },
     consent(){
       console.log(this.$root.$refs)
      this.$root.$refs.layout_ref.consent();
     },
      privacy(){

      this.$router.push({ name: 'privacy' })

    },
    poweredBy(){

      this.$router.push({ name: 'poweredBy' })

    },
        generateSurvey () {
      console.log("computed surveyrender")
      console.log(this.surveyJSON)
      if (this.surveyJSON != null) {
        this.survey = new SurveyVue.Model(this.surveyJSON)
        console.log("after survey initialization")
        this.survey.locale = this.$userLang
        console.log(this.survey)
        this.survey.onComplete.add((result) => {
          console.log("result of SURVEY")
          console.log(result.data)
          this.saveResults(result.data)
        })
        this.alert_int = true
        return this.survey
      } else {
        return null
      }
    },
    saveResults (answer) {
      console.log(this.surveys)
      var formatted_results = {
        idSurvey: this.surveys.id,
        idUser: this.user.umid,
        answer: JSON.stringify(answer),
        answerDate: new Date().toISOString()
      }
      console.log(formatted_results)
      this.saveSurveyAnswer(formatted_results)
      console.log("I am saving the results of the survey!!!!!")
      this.setSurveyJSON(null)
    },
  },
  created () {
  this.fetchMixedSettings().then(ret=> console.log(ret))
  this.fetchMigrantSurvey(this.user.umid).then((sr) => {
      console.log("I AM THE SUrVEY in about")
      console.log(sr)
      if(sr != null){
      //  this.surveyJSON = JSON.parse(sr.survey)
      }
    })
  console.log(this.surveyJSON)  
  }
}
</script>
<style scoped>
.pad{
  padding-left:10px;
  padding-right:10px
}
.center{
  text-align:center
}
.input{
  margin: auto;
  display: block;
  margin-bottom:0px;
  padding-bottom:10px
}
.div-1{
  text-align:center; 
  padding-top:14px
}
.div-2{
display:inline-block;
margin-bottom: 1px; 
width:300px
}
.div-3{
  margin:0 auto
}
.image{
  width:150px; 
  height:150px;
  border-radius:50%
}
.button{
  width:150px
}
.pad{
  margin-bottom:10px; 
  padding-top:10px
}
.uploader{
  max-width: 300px;
  display:inline-block
}
.header{
  margin:0 auto; 
  text-align:left; 
  padding-left:0px;
  font-size:18px;
  font-weight:600
}
.input-top{
  margin: auto;
  display: block;
  margin-bottom:0px;
  margin-top:0px; 
  padding-bottom:10px
}
.icon{
  padding-top:5px; 
  padding-left:5px
}
.div-4{
  margin:0 auto;
  width:300px 
}
.my-card{
width:300px; 
display:inline-block
}
.pad-top{
  padding-top:10px
}
.option{
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 29px;
}
.logout {
  background-color: white;
  color:#9E1F63;
  border: 1px solid #9E1F63;
  width:250px;
  border-radius: 50px;
}
</style>
