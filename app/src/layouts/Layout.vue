<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="bg-accent"
    >
      <q-toolbar>
         <q-btn
          flat
          dense
          round
          @click="$router.push({name:'home'})"
          :icon="'img:statics/icons/Icon - Home (selected)new.svg'"
        />

        <q-toolbar-title>{{ $t( "button.home") }}</q-toolbar-title>
        <LanguageSelector
          data-cy="language_selector_button"
          ref="language"
        ></LanguageSelector>
        <UserButton ref="user" />
        <q-btn
          v-if="this.$auth.loggedIn() && this.surveyJSON != null"
          no-caps
          style="background-color:white; color:#0B91CE"
          :label="$t('desc_labels.survey')"
          @click="generateSurvey"
        />
        <FeedbackButton ref="feedback" />
      <!--  <q-btn
          color="white"
          round
          @click="consent()"
        >
          <q-avatar
            size="30px"
            data-cy="userButton"
          >
            <q-icon
              color="black"
              name="img:statics/icons/Icon - consent toggle.svg"
            />
          </q-avatar>
        </q-btn>-->
        <!-- <ListenToggle /> -->

      </q-toolbar>
    </q-header>

    <q-footer class="bg-info text-white">
      <q-tabs>
        <q-tab
        style="padding-right:0px; padding-left:0px"
          v-for="(nav) in nav_options"
          @click="action(nav.label)"
          :key="nav.label"
          :icon="nav.icon"
          v-feature-flipping="nav.feature"
        />
      </q-tabs>
    </q-footer>

    <!--  <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="767"
      bordered
      content-class="bg-accent text-white"
    >
       
      <auth-menu />
      
      <q-list dark>
        <q-item-label header>{{ $t('menu.title') }}</q-item-label>
        <q-item
          clickable
          exact
          dark
          :data-cy="nav.label.replace('.', '_')"
          v-for="(nav) in navs"
          :to="nav.to"
          :key="nav.label"
          :hidden="nav.visible"
          v-feature-flipping="nav.feature"
          active
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon
              :name="nav.icon"
              style="font-size:45px"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t( nav.label) }}</q-item-label>
            <q-item-label caption>{{ $t(nav.description) }}</q-item-label>
          </q-item-section>
        </q-item>
        <div class="row justify-center full-height full-width text-center">
          <img
            alt="Powered by Micado"
            src="~assets/powered_Micado_white.png"
          />
        </div>
      </q-list>
    </q-drawer>-->
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
    <q-page-container>
      <q-page-sticky
        v-if="this.$auth.loggedIn() && this.chat"
        class="z-top"
      >
        <ChatWidget ref="chatbot" />
      </q-page-sticky>
      <q-page-sticky
      v-else
      class="z-top">
      <ChatbotNotAvailable @registering="registration" ref="not_chatbot"/>
      </q-page-sticky>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
//import AuthMenu from "./auth/AuthMenu";
//import ListenToggle from "components/ListenToggle";
import LanguageSelector from "components/LanguageSelector";
import UserButton from "components/UserButton"
import FeedbackButton from 'components/FeedbackButton'
import ChatWidget from 'components/ChatWidget'
import * as klaro from 'klaro-micado'
import client from 'api-user-client'
import storeMappingMixin from '../mixin/storeMappingMixin'
import klaroconfig from '../configs/klaro.json'
import * as SurveyVue from 'survey-vue'
import ChatbotNotAvailable from 'components/ChatbotNotAvailable'

export default {
  name: "Layout",

  components: {
    UserButton,
    //ListenToggle, 
    LanguageSelector,
    FeedbackButton,
    SurveyVue,
    ChatWidget,
    ChatbotNotAvailable
  },
  mixins: [
    storeMappingMixin({
      getters: {
        user: 'auth/user',
        languages: 'language/activeLanguages',
        surveys: 'survey/surveys'
      }, actions: {
        registerRocketchatUser: 'user/registerRocketChatUser',
        fetchMigrantSurvey: 'survey/fetchMigrantSurvey',
        saveSurveyAnswer: 'survey/saveSurveyAnswer'
      }
    })

  ],
  data () {
    //var surveyJSON = { "pages": [{ "name": "page1", "elements": [{ "type": "checkbox", "name": "question1", "title": "How did you know about MICADO", "choices": [{ "value": "item1", "text": "told by a friend" }, { "value": "item2", "text": "proposed by PA" }, { "value": "item3", "text": "found in internet" }] }, { "type": "rating", "name": "question2", "title": "How do you rate the MICADO application" }, { "type": "matrix", "name": "question3", "title": "Please state your opinion", "columns": ["Agree", "Not know", "Disagree"], "rows": ["I understood better the things to do to get my documents", "I found useful information"] }], "title": "Micado questionnaire" }] }
    /*var model = new SurveyVue.Model(this.surveyJSON)
    console.log("SURVEY")
    console.log(model)
    model
      .onComplete
      .add(function (result) {
        console.log("result of SURVEY")
        console.log(result)
        console.log(result.data)
      });*/
    return {
      surveyJSON: null,
      leftDrawerOpen: false,
      klaro_config: klaroconfig,
      manager: null,
      alert: false,
      survey: null,
      chat:true,
      chatting:false,
      navs: [
        /* 
         {
           label: "menu.processes",
           icon: "img:statics/icons/Guided Processes (600x600) white.png",
           to: "/processes",
           description: "menu.processes_desc",
           feature: "FEAT_PROCESSES",
           visible: true
         },
         {
           label: "menu.information",
           icon: "img:statics/icons/Genreal Information (600x600) white.png",
           to: "/information",
           description: "menu.information_desc",
           feature: "FEAT_INFO",
           visible: true
         },
         {
           label: "menu.events",
           icon: "img:statics/icons/Icon - Events (45x45).png",
           to: "/events",
           description: "menu.events_desc",
           feature: "FEAT_EVENTS",
           visible: true
         },*/
        /*        {
                  label: "menu.chatbot",
                  icon: "img:statics/icons/Chatbot (600x600) white.png",
                  to: "/chatbot",
                  description: "menu.chatbot_desc",
                  feature: "FEAT_CHATBOT",
                  visible: true
                },
                */
       /* {
          label: "menu.documents",
          icon: "img:statics/icons/Icon - language selection.svg",
          to: "/language",
          description: "menu.documents_desc",
          feature: "FEAT_DEFAULT",
          needs_login: false,
          visible: true
        },*/
        {
          label: "menu.glossary",
          icon: "img:statics/icons/Icon - Glossary selected1.svg",
          to: "/glossary",
          description: "menu.glossary_desc",
          feature: "FEAT_GLOSSARY",
          needs_login: false,
          visible: true
        },
        /*{
          label: "menu.tasks",
          icon: "img:statics/icons/Task Monitor (600x600) white.png",
          to: "/tasks",
          description: "menu.tasks_desc",
          feature: "FEAT_TASKS",
          visible: true
        },*/
        // {
        //   label: "menu.messenger",
        //   icon: "img:statics/icons/Messenger (600x600) white.png",
        //   to: "/notifications",
        //   description: "messages from PA",
        //   feature: "FEAT_MESSENGER"
        // },
        /*{
          label: "menu.home",
          icon: "img:statics/icons/Icon - Home (selected).svg",
          to: "/",
          description: "menu.home_desc",
          feature: "FEAT_DEFAULT",
          needs_login: false,
          visible: false
        },*/
        {
          label: "menu.feedback",
          icon: "img:statics/icons/icon - Feedback (4th iteration).svg",
          to: "/settings",
          description: "menu.settings_desc",
          feature: "FEAT_MIGRANT_LOGIN",
          needs_login: false,
          visible: true
        },
        {
          label: "menu.chatbot",
          icon: "img:statics/icons/Icon Chatbot (4th Iteration).svg",
          to: "/",
          description: "menu.home_desc",
          feature: "FEAT_DEFAULT",
          needs_login: false,
          visible: false
        },

      ]
    };
  },
  computed: {
    nav_options () {
      if (this.$auth.loggedIn()) {
        return this.navs
      }
      else {
        return this.navs.filter((nav) => {
          return nav.needs_login == false
        })
      }
    },
  },
  watch: {
    manager: function (manager, eventType, data) {
      console.log("THE WATHC from vue")
      console.log("watch function in the watch and not on mounted")
      console.log(manager)
      console.log(eventType)
      console.log(data)
      if (eventType === 'saveConsents') {
        console.log("HERE WE SAVE THE CONSENTS IN THE DB")
        client.saveConsent(this.user.umid, data.consents)
      }
    }
  },
  mounted () {
    console.log("mounting layout")
    console.log(this)
    console.log("KLARO!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log(klaro)
    console.log(this)
    console.log(this.$t('consent.title', "de"))
    this.languages.forEach(lang => {
      console.log(lang.lang)
      console.log(this.$t('consent.title', lang.lang))
      let translation = {
        "consentModal": {
          "title": "<u>" + this.$t('consent.title', lang.lang) + "</u>",
          "description": this.$t('consent.consentModal_description', lang.lang)
        },
        "usageTracker": {
          "title": this.$t('consent.usageTracker_title', lang.lang),
          "description": this.$t('consent.usageTracker', lang.lang)
        },
        "chat": {
          "title": this.$t('consent.chat_title', lang.lang),
          "description": this.$t('consent.chat', lang.lang)
        },
        "purposes": {
          "analytics": this.$t('consent.analytics', lang.lang),
          "livechat": this.$t('consent.livechat', lang.lang),
          "CSOs": this.$t('consent.CSOs', lang.lang)
        }
      }
      let klaroLang = lang.lang
      if (klaroLang === "zh_Hans") {
        klaroLang = "zh"
      }
      this.klaro_config.translations[lang.lang] = translation
    });
    let klaroLang = this.$userLang
    if (klaroLang === "zh_Hans") {
      klaroLang = "zh"
    }
    this.klaro_config.lang = klaroLang
    console.log(this.klaro_config)
    this.manager = klaro.getManager(this.klaro_config)

    console.log(this.manager)
    console.log("KLARO!!!!!!!!!!!!!!!")
    console.log(klaro.language())
    if(!localStorage.klaro){
      klaro.show(this.klaro_config)
    }
    else{
      this.chat = JSON.parse(decodeURIComponent(localStorage.klaro)).chat
    }
    console.log("i'm klaro in local storage")
    console.log(JSON.parse(decodeURIComponent(localStorage.klaro)))
    let uid = null
    if(this.user != null){
           uid = this.user.umid
    }
    this.manager.watch({
      update:  (manager, eventType, data) => {
        console.log("THE WATHC")
        console.log(manager)
        console.log(eventType)
       // console.log("user ID: " + uid)
        if (eventType === 'saveConsents') {
          if(uid != null){
          console.log("HERE WE SAVE THE CONSENTS IN THE DB")
          client.consentPresent(uid).then((response) => {
            console.log("I am counr")
            console.log(response)
            if (response.count == 0) {
              console.log("I'm in saving")
              client.saveConsent(uid, JSON.stringify(data.consents))
            }
            else {
              console.log("I'm in patching")
              client.updateConsent(uid, JSON.stringify(data.consents))
            }

          })
          }
            console.log(data)
            this.applyConsent(data.consents)
       }
      }

    })

    //
    /*let externalScript = document.createElement('script')
    let scriptContent = "(function (w, d, s, u) { w.RocketChat = function (c) { w.RocketChat._.push(c) }; w.RocketChat._ = []; w.RocketChat.url = u;      var h = d.getElementsByTagName(s)[0], j = d.createElement(s);      j.async = true; j.src = 'https://"+this.$envconfig.chatServer+"/livechat/rocketchat-livechat.min.js?_=201903270000';      h.parentNode.insertBefore(j, h);      w.RocketChat(function () {        this.initialize({          department: 'micado',          agent: 'rasa_bot'        })      })    })(window, document, 'script', 'https://"+this.$envconfig.chatServer+"/livechat');"
 //   externalScript.setAttribute('type', 'text/javascript')
     console.log(externalScript)
 externalScript.innerHTML = scriptContent
 //   externalScript.setAttribute('text', scriptContent)
    document.body.appendChild(externalScript)*/

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = "window._mfq = window._mfq || [];(function () {var mf = document.createElement(\"script\"); mf.type = \"text/javascript\"; mf.defer = true;      mf.src = \"//cdn.mouseflow.com/projects/" + this.$envconfig.migrantMouseflow + ".js\";      document.getElementsByTagName(\"head\")[0].appendChild(mf);    })();";
    document.getElementsByTagName('head')[0].appendChild(script);


    // 

  },
  methods: {
    applyConsent(consent){
      if(consent.usageTracker){
        console.log("starting countly")
        this.$Countly.q.push(['opt_in'])
      }
      else{
        console.log("removing countly")
        this.$Countly.q.push(['opt_out'])
        console.log(this.$Countly)
      }
      if(consent.chat){
        this.chat = true
      }
      else{
        this.chat = false
      }
    },
    consent () {
      klaro.show(this.klaro_config)

    },
    generateSurvey () {
      console.log("computed surveyrender")
      console.log(this.surveyJSON)
      if (this.surveyJSON != null) {
        this.survey = new SurveyVue.Model(this.surveyJSON)
        console.log("after survey initialization")
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
    action (lab) {
      switch (lab) {
        case "menu.documents":
          console.log(this.$refs.language)
          this.$refs.language.open()
          break;
        case "menu.glossary":
          this.$router.push({ name: 'glossary' })
          break;
        case "menu.feedback":
          this.$refs.feedback.layout = true
          break;
        case "menu.chatbot":
          if (this.$auth.loggedIn()) {
            this.$refs.chatbot.register()
          }
          else {
            console.log(this.$refs.not_chatbot)
            this.$refs.not_chatbot.chatting = true
          }
        default:
        // code block
      }

    },
          registration() {
        this.$refs.user.toLogin()
      }
  },
  created () {
    this.fetchMigrantSurvey(this.user.umid).then((sr) => {
      console.log("I AM THE SUrVEY")
      console.log(sr)
      if(sr != null){
        this.surveyJSON = JSON.parse(sr.survey)
      }
      console.log("I AM THE SUrVEY json")

      console.log(this.surveyJSON)
      
    })
    this.$root.$refs.layout_ref = this;
    console.log(this.$root.$refs)

  }
}
</script>

<style>
/*@media screen and (min-width: 768px) {


  .my-menu-link {
    color: white;
    background: #0b91ce;
  }
}*/
.cookie-notice {
  z-index: 2000 !important;
}
body {
  font-family: "Nunito", sans-serif;
}
.klaro .cookie-modal{
z-index: 999999 !important;
}

</style>
