<template>
      <div >

   <q-item clicakble v-if="surveyJSON !=null && loggedIn" @click.native="generateSurvey">
   <TalkingLabel
   class="q-pa-md option"
    style="width:100%"
    :icon="'img:statics/icons/Icon - Survey NEW.svg'"
    :icon_size="'30px'"
    :Title="$t('desc_labels.survey_desc')"
    :text="$t('desc_labels.survey_desc')"
    :row="'row'"
    :title_col="'col-10 option'"
    :icon_col="'col-2'"
    :icon_style="'text-align:right'"
    />
  </q-item>
  <div v-if="surveyJSON !=null" style="background-color:#EFEFEF; height:5px">
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
    :icon_col="'col-2'"
    :icon_style="'text-align:right'"
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
    :icon_col="'col-2'"
    :icon_style="'text-align:right'"
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
    :icon_col="'col-2'"
    :icon_style="'text-align:right'"
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
    :icon_col="'col-2'"
    :icon_style="'text-align:right'"
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

        <q-card-section class="q-pt-none">
          <div id="surveyContainer">
            <survey :survey="survey"></survey>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
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

      },
      actions: {
        fetchMixedSettings:"settings/fetchMixedSettings",
        fetchMigrantSurvey: 'survey/fetchMigrantSurvey',
        saveSurveyAnswer: 'survey/saveSurveyAnswer'
      },
    })
  ],
  data () {
    return {
      logged: false,
      alert:false,
      survey:null,
      surveyJSON: null,
    }
  },
  methods:{
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
        this.alert = true
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
    },
  },
  created () {
  this.fetchMixedSettings().then(ret=> console.log(ret))
  this.fetchMigrantSurvey(this.$auth.user.umid).then((sr) => {
      console.log("I AM THE SUrVEY in about")
      console.log(sr)
      if(sr != null){
        this.surveyJSON = JSON.parse(sr.survey)
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
