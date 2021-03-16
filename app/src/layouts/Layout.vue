<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="bg-accent"
    >
      <q-toolbar>
       <!-- <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />-->

        <q-toolbar-title>{{ $t( "application_title") }}</q-toolbar-title>
        <LanguageSelector data-cy="language_selector_button"></LanguageSelector>
        <UserButton />
        <FeedbackButton />
            <q-btn label="Alert" color="primary" @click="alert = true" />
        <q-btn color="white" round     @click="consent()"
>
    <q-avatar
      size="42px"
      data-cy="userButton"
    >
      <q-icon
        color="black" name="history_edu"
      />
    </q-avatar>
</q-btn>
        <!-- <ListenToggle /> -->

      </q-toolbar>
    </q-header>

     <q-footer class="bg-info text-white">
      <q-tabs>
        <q-route-tab
          v-for="(nav) in navs"
          :to="nav.to"
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
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
<div id="surveyContainer"><survey :survey="survey"></survey></div>        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-container>
      <q-page-sticky v-if="this.$auth.loggedIn()" class="z-top">
      <ChatWidget />
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
import * as klaro from 'klaro'
import client from 'api-user-client'
import storeMappingMixin from '../mixin/storeMappingMixin'
import klaroconfig from '../configs/klaro.json'
import * as SurveyVue from 'survey-vue'

export default {
  name: "Layout",

  components: {
    UserButton,
    //ListenToggle, 
    LanguageSelector,
    FeedbackButton,
    SurveyVue,
    ChatWidget
  },
  mixins: [
    storeMappingMixin({
      getters: {
        user: 'auth/user',
      }, actions: {
        registerRocketchatUser: 'user/registerRocketChatUser'
      }
    })

  ],
  data () {
    var surveyJSON = {"pages":[{"name":"page1","elements":[{"type":"checkbox","name":"question1","title":"How did you know about MICADO","choices":[{"value":"item1","text":"told by a friend"},{"value":"item2","text":"proposed by PA"},{"value":"item3","text":"found in internet"}]},{"type":"rating","name":"question2","title":"How do you rate the MICADO application"},{"type":"matrix","name":"question3","title":"Please state your opinion","columns":["Agree","Not know","Disagree"],"rows":["I understood better the things to do to get my documents","I found useful information"]}],"title":"Micado questionnaire"}]}
        var model = new SurveyVue.Model(surveyJSON)
        console.log("SURVEY")
        console.log(model)
        model
    .onComplete
    .add(function (result) {
      console.log("result of SURVEY")
        console.log(result)
        console.log(result.data)
    });
    return {
      leftDrawerOpen: false,
      klaro_config: klaroconfig,
      manager: null,
            alert: false,
                    survey: model,
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
        {
          label: "menu.documents",
          icon: "img:statics/icons/Document Wallet (600x600) white.png",
          to: "/documents",
          description: "menu.documents_desc",
          feature: "FEAT_DOCUMENTS",
          visible: true
        },
        {
          label: "menu.tasks",
          icon: "img:statics/icons/Task Monitor (600x600) white.png",
          to: "/tasks",
          description: "menu.tasks_desc",
          feature: "FEAT_TASKS",
          visible: true
        },
        // {
        //   label: "menu.messenger",
        //   icon: "img:statics/icons/Messenger (600x600) white.png",
        //   to: "/notifications",
        //   description: "messages from PA",
        //   feature: "FEAT_MESSENGER"
        // },
        {
          label: "menu.home",
          icon: "img:statics/icons/Home (600x600) white.png",
          to: "/",
          description: "menu.home_desc",
          feature: "FEAT_DEFAULT",
          visible: false
        },
        {
          label: "menu.glossary",
          icon: "img:statics/icons/Migrant APP Icon - Glossary (45x45).png",
          to: "/glossary",
          description: "menu.glossary_desc",
          feature: "FEAT_GLOSSARY",
          visible: true
        },
        {
          label: "menu.settings",
          icon: "img:statics/icons/Settings (600x600) white.png",
          to: "/settings",
          description: "menu.settings_desc",
          feature: "FEAT_DEFAULT",
          visible: true
        }
      ]
    };
  },
  watch: {
    manager: function(manager, eventType, data){
      console.log("THE WATHC from vue")
      console.log(manager)
      console.log(eventType)
      console.log(data)
      if (eventType === 'saveConsents'){
        console.log("HERE WE SAVE THE CONSENTS IN THE DB")
        client.saveConsent(this.user.umid,data.consents)
      }
    }
  },
  mounted() {
    console.log("mounting layout")
    console.log(this)
    console.log("KLARO!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log(klaro)
    this.manager = klaro.getManager(this.klaro_config)

    console.log(this.manager)
    console.log("KLARO!!!!!!!!!!!!!!!")
    
    let uid = this.user.umid
    this.manager.watch({
      update: function(manager, eventType, data){
        console.log("THE WATHC")
        console.log(manager)
        console.log(eventType)
        console.log(data)
        console.log("user ID: "+uid)
        if (eventType === 'saveConsents'){
          console.log("HERE WE SAVE THE CONSENTS IN THE DB")
          client.saveConsent(uid,JSON.stringify(data.consents))
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
  },
    methods: {
      consent(){
            klaro.show(this.klaro_config)

      }
    }
};
</script>

<style>
/*@media screen and (min-width: 768px) {


  .my-menu-link {
    color: white;
    background: #0b91ce;
  }
}*/
.cookie-notice{
  z-index: 2000 !important;
}
body {
  font-family: "Nunito", sans-serif;
}
</style>
