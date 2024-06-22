<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-accent">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="$router.push({ name: 'home' })"
          :icon="'img:statics/icons/Icon - Home (selected)new.svg'"
        />

        <q-toolbar-title>{{ $t("button.home") }}</q-toolbar-title>
        <q-btn
          no-caps
          v-if="survey_visible"
          style="background-color: white; color: #0b91ce"
          :label="$t('desc_labels.survey')"
          @click="openSurvey"
        />
        <LanguageSelector
          data-cy="language_selector_button"
          ref="language"
        ></LanguageSelector>
        <UserButton
          v-if="
            features.filter((feat) => {
              return feat == 'FEAT_MIGRANT_LOGIN';
            }).length > 0
          "
          ref="user"
        />

        <FeedbackButton ref="feedback" />
      </q-toolbar>
    </q-header>

    <q-footer class="bg-info text-white">
      <q-tabs>
        <q-tab
          style="padding-right: 0px; padding-left: 0px"
          v-for="nav in nav_options"
          @click="action(nav.label)"
          v-feature-flipping="nav.feature"
          :key="nav.label"
          :icon="nav.icon"
        />
      </q-tabs>
    </q-footer>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t("desc_labels.survey") }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section
          v-if="
            settings.filter((set) => {
              return set.key == 'survey_local';
            }).length > 0 ||
            settings.filter((set) => {
              return set.key == 'survey_en';
            }).length > 0
          "
          style="max-height: 50vh"
        >
          <div
            v-if="
              settings.filter((set) => {
                return set.key == 'survey_local';
              }).length > 0
            "
          >
            {{ $t("desc_labels.survey_link") }}
          </div>
          <br />
          <a
            v-if="
              settings.filter((set) => {
                return set.key == 'survey_local';
              }).length > 0
            "
            :href="
              this.settings.filter((set) => {
                return set.key == 'survey_local';
              })[0].value
            "
          >
            {{
              this.settings.filter((set) => {
                return set.key == "survey_local";
              })[0].value
            }}<br />
          </a>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alert_int" full-width>
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-page-container>
          <q-page class="q-pa-sm">
            <div id="surveyContainer">
              <survey :survey="survey"></survey>
            </div>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import LanguageSelector from "components/LanguageSelector";
import UserButton from "components/UserButton";
import FeedbackButton from "components/FeedbackButton";
import * as klaro from "klaro-micado";
import client from "api-user-client";
import storeMappingMixin from "../mixin/storeMappingMixin";
import klaroconfig from "../configs/klaro.json";
import * as SurveyVue from "survey-vue";

export default {
  name: "Layout",

  components: {
    UserButton,
    LanguageSelector,
    FeedbackButton,
    SurveyVue,
  },
  mixins: [
    storeMappingMixin({
      getters: {
        user: "auth/user",
        languages: "language/activeLanguages",
        surveys: "survey/surveys",
        surveyJSON: "survey/surveyJSON",
        features: "features/features",
        settings: "settings/settings",
        language: "language/activeLanguages",
      },
      actions: {
        fetchMigrantSurvey: "survey/fetchMigrantSurvey",
        saveSurveyAnswer: "survey/saveSurveyAnswer",
        setSurveyJSON: "survey/setSurveyJSON",
      },
    }),
  ],
  data() {
    return {
      leftDrawerOpen: false,
      klaro_config: klaroconfig,
      manager: null,
      alert: false,
      alert_int: false,
      survey: null,
      navs: [
        {
          label: "menu.documents",
          icon: "img:statics/icons/Icon - show more.svg",
          description: "menu.documents_desc",
          feature: "FEAT_DEFAULT",
          needs_login: false,
          visible: true,
        },
        {
          label: "menu.glossary",
          icon: "img:statics/icons/Icon - Glossary selected1.svg",
          description: "menu.glossary_desc",
          feature: "FEAT_GLOSSARY",
          needs_login: false,
          visible: true,
        },
        {
          label: "menu.feedback",
          icon: "img:statics/icons/icon - Feedback (4th iteration).svg",
          description: "menu.settings_desc",
          needs_login: false,
          feature: "FEAT_DEFAULT",
          visible: true,
        },
        {
          label: "menu.settings",
          icon: "img:statics/icons/Icon - Personal page.svg",
          description: "menu.glossary_desc",
          feature: "FEAT_MIGRANT_LOGIN",
          needs_login: true,
          visible: true,
        },
      ],
    };
  },
  computed: {
    survey_visible() {
      var surveyType = this.settings.filter((set) => {
        return set.key == "internal_survey";
      });
      console.log(this.user);
      if (surveyType.length > 0) {
        if (surveyType[0].value == "true") {
          if (this.$auth.loggedIn() && this.surveyJSON != null) {
            return true;
          } else {
            return false;
          }
        } else {
          if (
            this.settings.filter((set) => {
              return set.key == "survey_local";
            }).length > 0 ||
            this.settings.filter((set) => {
              return set.key == "survey_en";
            }).length > 0
          ) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        if (
          this.settings.filter((set) => {
            return set.key == "survey_local";
          }).length > 0 ||
          this.settings.filter((set) => {
            return set.key == "survey_en";
          }).length > 0
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    nav_options() {
      if (this.$auth.loggedIn()) {
        var filtered_navs = [];
        this.navs.forEach((nav) => {
          if (
            this.features.indexOf(nav.feature) > -1 ||
            nav.feature == undefined
          ) {
            console.log(nav.feature);
            filtered_navs.push(nav);
          }
        });
        return filtered_navs;
      } else {
        var login_filter = this.navs.filter((nav) => {
          return nav.needs_login == false;
        });
        var filtered_navs = [];
        login_filter.forEach((nav) => {
          if (
            this.features.indexOf(nav.feature) > -1 ||
            nav.feature == undefined
          ) {
            filtered_navs.push(nav);
          }
        });
        return filtered_navs;
      }
    },
  },
  watch: {
    manager: function (manager, eventType, data) {
      console.log("THE WATHC from vue");
      console.log("watch function in the watch and not on mounted");
      console.log(manager);
      console.log(eventType);
      console.log(data);
      if (eventType === "saveConsents") {
        console.log("HERE WE SAVE THE CONSENTS IN THE DB");
        client.saveConsent(this.user.sub, data.consents);
      }
    },
  },
  mounted() {
    console.log("mounting layout");
    console.log(this);
    console.log("KLARO!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(klaro);
    console.log(this);
    console.log(this.$t("consent.title", "de"));
    this.languages.forEach((lang) => {
      console.log(lang.lang);
      console.log(this.$t("consent.title", lang.lang));
      let translation = {
        consentModal: {
          title: "<u>" + this.$t("consent.title", lang.lang) + "</u>",
          description: this.$t("consent.consentModal_description", lang.lang),
        },
        usageTracker: {
          title: this.$t("consent.usageTracker_title", lang.lang),
          description: this.$t("consent.usageTracker", lang.lang),
        },
        purposes: {
          analytics: this.$t("consent.analytics", lang.lang),
          CSOs: this.$t("consent.CSOs", lang.lang),
        },
      };
      let klaroLang = lang.lang;
      if (klaroLang === "zh_Hans") {
        klaroLang = "zh";
      }
      this.klaro_config.translations[lang.lang] = translation;
    });
    let klaroLang = this.$userLang;
    if (klaroLang === "zh_Hans") {
      klaroLang = "zh";
    }
    this.klaro_config.lang = klaroLang;
    console.log(this.klaro_config);
    this.manager = klaro.getManager(this.klaro_config);

    console.log(this.manager);
    console.log("KLARO!!!!!!!!!!!!!!!");
    console.log(klaro.language());
    if (!localStorage.klaro) {
      klaro.show(this.klaro_config);
    } else {
      console.log("i'm klaro in local storage");
      console.log(JSON.parse(decodeURIComponent(localStorage.klaro)));
    }
    let uid = null;
    if (this.user != null) {
      uid = this.user.sub;
    }
    this.manager.watch({
      update: (manager, eventType, data) => {
        console.log("THE WATHC");
        console.log(manager);
        console.log(eventType);
        // console.log("user ID: " + uid)
        if (eventType === "saveConsents") {
          if (uid != null) {
            console.log("HERE WE SAVE THE CONSENTS IN THE DB");
            client.consentPresent(uid).then((response) => {
              console.log("I am counr");
              console.log(response);
              if (response.count == 0) {
                console.log("I'm in saving");
                client.saveConsent(uid, JSON.stringify(data.consents));
              } else {
                console.log("I'm in patching");
                client.updateConsent(uid, JSON.stringify(data.consents));
              }
            });
          }
          console.log(data);
          this.applyConsent(data.consents);
        }
      },
    });
  },
  methods: {
    goToLinkedSurvey() {
      window.location.replace("https://" + "www.csi.it");
    },
    openSurvey() {
      var surveyType = this.settings.filter((set) => {
        return set.key == "internal_survey";
      });
      console.log(surveyType);
      console.log(typeof surveyType);
      if (surveyType.length > 0) {
        if (surveyType[0].value == "true") {
          this.generateSurvey();
        } else {
          this.alert = true;
        }
      } else {
        this.alert = true;
      }
    },
    applyConsent(consent) {},
    consent() {
      klaro.show(this.klaro_config);
    },
    generateSurvey() {
      console.log("computed surveyrender");
      console.log(this.surveyJSON);
      if (this.surveyJSON != null) {
        this.survey = new SurveyVue.Model(this.surveyJSON);

        console.log("after survey initialization");
        this.survey.onComplete.add((result) => {
          console.log("result of SURVEY");
          console.log(result.data);
          this.saveResults(result.data);
        });
        this.alert_int = true;
        return this.survey;
      } else {
        return null;
      }
    },
    saveResults(answer) {
      console.log(this.surveys);
      var formatted_results = {
        idSurvey: this.surveys.id,
        idUser: this.user.sub,
        answer: JSON.stringify(answer),
        answerDate: new Date().toISOString(),
      };
      console.log(formatted_results);
      this.saveSurveyAnswer(formatted_results);
      console.log("I am saving the results of the survey!!!!!");
      this.setSurveyJSON(null);
    },
    action(lab) {
      switch (lab) {
        case "menu.documents":
          this.$router.push({ name: "about" });
          break;
        case "menu.glossary":
          this.$router.push({ name: "glossary" });
          break;
        case "menu.feedback":
          this.$refs.feedback.layout = true;
          break;
        case "menu.settings":
          this.$router.push({ name: "profile" });
          break;
        default:
        // code block
      }
    },
    registration() {
      this.$refs.user.toLogin();
    },
  },
  created() {
    this.$root.$refs.layout_ref = this;
    console.log(this.$root.$refs);
    console.log(this.$defaultLangString);
    if (this.user != null) {
      this.fetchMigrantSurvey(this.user.sub).then((sr) => {
        console.log("I AM THE SUrVEY");
        console.log(sr);
        if (sr != null) {
          //this.surveyJSON = JSON.parse(sr.survey)
          this.setSurveyJSON(JSON.parse(sr.survey));
        }
      });
    }
  },
};
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
.klaro .cookie-modal {
  z-index: 999999 !important;
}
</style>
