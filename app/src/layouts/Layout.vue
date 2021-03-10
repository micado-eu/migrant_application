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

export default {
  name: "Layout",

  components: {
    UserButton,
    //ListenToggle, 
    LanguageSelector,
    FeedbackButton,
    ChatWidget
  },

  data () {
    return {
      leftDrawerOpen: false,
      klaro_config: {
    // With the 0.7.0 release we introduce a 'version' paramter that will make
    // if easier for us to keep configuration files backwards-compatible in the future.
    version: 1,

    // You can customize the ID of the DIV element that Klaro will create
    // when starting up. If undefined, Klaro will use 'klaro'.
    elementID: 'klaro',

    // You can override CSS style variables here. For IE11, Klaro will
    // dynamically inject the variables into the CSS. If you still consider
    // supporting IE9-10 (which you probably shouldn't) you need to use Klaro
    // with an external stylesheet as the dynamic replacement won't work there.
    styling: {
        theme: ['light', 'top', 'wide'],
    },

    // Setting this to true will keep Klaro from automatically loading itself
    // when the page is being loaded.
    noAutoLoad: false,

    // Setting this to true will render the descriptions of the consent
    // modal and consent notice are HTML. Use with care.
    htmlTexts: true,

    // Setting 'embedded' to true will render the Klaro modal and notice without
    // the modal background, allowing you to e.g. embed them into a specific element
    // of your website, such as your privacy notice.
    embedded: false,

    // You can group services by their purpose in the modal. This is advisable
    // if you have a large number of services. Users can then enable or disable
    // entire groups of services instead of having to enable or disable every service.
    groupByPurpose: true,

    // How Klaro should store the user's preferences. It can be either 'cookie'
    // (the default) or 'localStorage'.
    storageMethod: 'cookie',

    // You can customize the name of the cookie that Klaro uses for storing
    // user consent decisions. If undefined, Klaro will use 'klaro'.
    cookieName: 'klaro',

    // You can also set a custom expiration time for the Klaro cookie.
    // By default, it will expire after 120 days.
    cookieExpiresAfterDays: 365,

    // You can change to cookie domain for the consent manager itself.
    // Use this if you want to get consent once for multiple matching domains.
    // If undefined, Klaro will use the current domain.
    //cookieDomain: '.github.com',

    // Defines the default state for services (true=enabled by default).
    default: false,

    // If "mustConsent" is set to true, Klaro will directly display the consent
    // manager modal and not allow the user to close it before having actively
    // consented or declines the use of third-party services.
    mustConsent: false,

    // Show "accept all" to accept all services instead of "ok" that only accepts
    // required and "default: true" services
    acceptAll: true,

    // replace "decline" with cookie manager modal
    hideDeclineAll: false,

    // hide "learnMore" link
    hideLearnMore: false,

    // show cookie notice as modal
    noticeAsModal: false,

    // You can also remove the 'Realized with Klaro!' text in the consent modal.
    // Please don't do this! We provide Klaro as a free open source tool.
    // Placing a link to our website helps us spread the word about it,
    // which ultimately enables us to make Klaro! better for everyone.
    // So please be fair and keep the link enabled. Thanks :)
    //disablePoweredBy: true,

    // you can specify an additional class (or classes) that will be added to the Klaro `div`
    //additionalClass: 'my-klaro',

    // You can define the UI language directly here. If undefined, Klaro will
    // use the value given in the global "lang" variable. If that does
    // not exist, it will use the value given in the "lang" attribute of your
    // HTML tag. If that also doesn't exist, it will use 'en'.
    //lang: 'en',

    // You can overwrite existing translations and add translations for your
    // service descriptions and purposes. See `src/translations/` for a full
    // list of translations that can be overwritten:
    // https://github.com/KIProtect/klaro/tree/master/src/translations

    // Example config that shows how to overwrite translations:
    // https://github.com/KIProtect/klaro/blob/master/src/configs/i18n.js
    translations: {
        // translationsed defined under the 'zz' language code act as default
        // translations.
        zz: {
            privacyPolicyUrl: '/#privacy',
        },
        // If you erase the "consentModal" translations, Klaro will use the
        // bundled translations.
        de: {
            privacyPolicyUrl: '/#datenschutz',
            consentModal: {
                description:
                    'Hier können Sie einsehen und anpassen, welche Information wir über Sie sammeln. Einträge die als "Beispiel" gekennzeichnet sind dienen lediglich zu Demonstrationszwecken und werden nicht wirklich verwendet.',
            },
            inlineTracker: {
                description: 'Beispiel für ein Inline-Tracking Skript',
            },
            externalTracker: {
                description: 'Beispiel für ein externes Tracking Skript',
            },
            adsense: {
                description: 'Anzeigen von Werbeanzeigen (Beispiel)',
                title: 'Google AdSense Werbezeugs',
            },
            matomo: {
                description: 'Sammeln von Besucherstatistiken',
            },
            camera: {
                description:
                    'Eine Überwachungskamera (nur ein Beispiel zu IMG-Tags)',
            },
            cloudflare: {
                description: 'Schutz gegen DDoS-Angriffe',
            },
            intercom: {
                description:
                    'Chat Widget & Sammeln von Besucherstatistiken (nur ein Beispiel)',
            },
            mouseflow: {
                description: 'Echtzeit-Benutzeranalyse (nur ein Beispiel)',
            },
            googleFonts: {
                description: 'Web-Schriftarten von Google gehostet',
            },
            purposes: {
                analytics: 'Besucher-Statistiken',
                security: 'Sicherheit',
                livechat: 'Live Chat',
                advertising: 'Anzeigen von Werbung',
                styling: 'Styling',
            },
        },
        en: {
            consentModal: {
                title: '<u>MICADO Consent management</u>',
                description:
                    'Here you can see and customize the information that we collect about you. Entries marked as "Example" are just for demonstration purposes and are not really used on this website.',
            },
            inlineTracker: {
                description: 'Example of an inline tracking script',
            },
            externalTracker: {
                description: 'Example of an external tracking script',
            },
            adsense: {
                description: 'Displaying of advertisements (just an example)',
                title: 'Google Adsense Advertisement',
            },
            matomo: {
                description: 'Collecting of visitor statistics',
            },
            camera: {
                description:
                    'A surveillance camera (just an example for an IMG tag)',
            },
            cloudflare: {
                description: 'Protection against DDoS attacks',
            },
            intercom: {
                description:
                    'Chat widget & collecting of visitor statistics (just an example)',
            },
            mouseflow: {
                description: 'Real-Time user analytics (just an example)',
            },
            googleFonts: {
                description: 'Web fonts hosted by Google',
            },
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
                advertising: 'Advertising',
                CSOs: 'CSOs partecipating MICADO',
                styling: 'Styling',
            },
        },
    },

    // This is a list of third-party services that Klaro will manage for you.
    services: [
        {
            name: 'Atlas',
            purposes: ['CSOs'],
            // Setting this to true will exempt this service from the "Accept All"
            // flow, i.e. clicking on "Accept All" will not enable this service.
            contextualConsentOnly: true,
        },
        {
            name: 'CSI Piemonte',
            purposes: ['CSOs'],
            contextualConsentOnly: true,
        },
        {
            // Each service should have a unique (and short) name.
            name: 'matomo',

            // If "default" is set to true, the service will be enabled by default
            // Overwrites global "default" setting.
            // We recommend leaving this to "false" for services that collect
            // personal information.
            default: true,

            // The title of you service as listed in the consent modal.
            title: 'Matomo/Piwik',

            // The purpose(s) of this service. Will be listed on the consent notice.
            // Do not forget to add translations for all purposes you list here.
            purposes: ['analytics'],

            // A list of regex expressions or strings giving the names of
            // cookies set by this service. If the user withdraws consent for a
            // given service, Klaro will then automatically delete all matching
            // cookies.
            cookies: [
                // you can also explicitly provide a path and a domain for
                // a given cookie. This is necessary if you have services that
                // set cookies for a path that is not "/" or a domain that
                // is not the current domain. If you do not set these values
                // properly, the cookie can't be deleted by Klaro
                // (there is no way to access the path or domain of a cookie in JS)
                // Notice that it is not possible to delete cookies that were set
                // on a third-party domain! See the note at mdn:
                // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#new-cookie_domain
                [/^_pk_.*$/, '/', 'klaro.kiprotect.com'], //for the production version
                [/^_pk_.*$/, '/', 'localhost'], //for the local version
                'piwik_ignore',
            ],

            // An optional callback function that will be called each time
            // the consent state for the service changes (true=consented). Passes
            // the `service` config as the second parameter as well.
            callback: function(consent, service) {
                // This is an example callback function.
                console.log(
                    'User consent for service ' + service.name + ': consent=' + consent
                );
                console.log(this)
                // To be used in conjunction with Matomo 'requireCookieConsent' Feature, Matomo 3.14.0 or newer
                // For further Information see https://matomo.org/faq/new-to-piwik/how-can-i-still-track-a-visitor-without-cookies-even-if-they-decline-the-cookie-consent/
                /*
                if(consent==true){
                    _paq.push(['rememberCookieConsentGiven']);
                } else {
                    _paq.push(['forgetCookieConsentGiven']);
                }
                */
            },

            // If "required" is set to true, Klaro will not allow this service to
            // be disabled by the user.
            required: false,

            // If "optOut" is set to true, Klaro will load this service even before
            // the user gave explicit consent.
            // We recommend always leaving this "false".
            optOut: false,

            // If "onlyOnce" is set to true, the service will only be executed
            // once regardless how often the user toggles it on and off.
            onlyOnce: true,
        },

        // The services will appear in the modal in the same order as defined here.
        {
            name: 'inlineTracker',
            title: 'Inline Tracker',
            purposes: ['analytics'],
            cookies: ['inline-tracker'],
            optOut: false,
        },
        {
            name: 'externalTracker',
            title: 'External Tracker',
            purposes: ['analytics', 'security'],
            cookies: ['external-tracker'],
        },
        {
            name: 'intercom',
            title: 'Intercom',
            default: true,
            purposes: ['livechat'],
        },
        {
            name: 'mouseflow',
            title: 'Mouseflow',
            purposes: ['analytics'],
        },
        {
            name: 'adsense',
            // if you omit the title here Klaro will try to look it up in the
            // translations
            //title: 'Google AdSense',
            purposes: ['advertising'],
        },
        {
            name: 'camera',
            title: 'Surveillance Camera',
            purposes: ['security'],
        },
/*        {
            name: 'googleFonts',
            title: 'Google Fonts',
            purposes: ['styling'],
        },*/
        {
            name: 'cloudflare',
            title: 'Cloudflare',
            purposes: ['security'],
            required: true,
        },
    ],
    callback: function(consent, service) {
        console.log(
            'User consent at GLOBAL for service ' + service.name + ': consent=' + consent
        );
    },
},
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
  mounted() {
    console.log("mounting layout")
    console.log(this)
    console.log("KLARO!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log(klaro)
    this.manager = klaro.getManager(this.klaro_config)
    this.manager.watch({
  update: function(manager, eventType, data){
     console.log("THE WATHC")
     console.log(manager)
     console.log(eventType)
     console.log(data)
     if (eventType === 'saveConsents'){
       console.log("HERE WE SAVE THE CONSENTS IN THE DB")
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
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }

  .my-menu-link {
    color: white;
    background: #0b91ce;
  }
}
.cookie-notice{
  z-index: 2000 !important;
}
body {
  font-family: "Nunito", sans-serif;
}
</style>
