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
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>{{ $t( "application_title") }}</q-toolbar-title>
        <LanguageSelector data-cy="language_selector_button"></LanguageSelector>
        <UserButton />
        <!-- <ListenToggle /> -->

      </q-toolbar>
    </q-header>

    <!-- <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="(nav) in navs"
          :to="nav.to"
          :key="nav.label"
          :label="$t( nav.label )"
          :icon="nav.icon"
          v-feature-flipping="nav.feature"
        />
      </q-tabs>
    </q-footer>-->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="767"
      bordered
      content-class="bg-accent text-white"
    >
      <!-- 
      <auth-menu />
      -->
      <q-list dark>
        <!--
        <q-item-label header>{{ $t('menu.title') }}</q-item-label>
        -->
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
//import AuthMenu from "./auth/AuthMenu";
//import ListenToggle from "components/ListenToggle";
import LanguageSelector from "components/LanguageSelector";
import UserButton from "components/UserButton"

export default {
  name: "Layout",

  components: {
    UserButton,
    //ListenToggle, 
    LanguageSelector
  },

  data () {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: "menu.home",
          icon: "img:statics/icons/Home (600x600) white.png",
          to: "/",
          description: "menu.home_desc",
          feature: "FEAT_DEFAULT",
          visible: false
        },
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
        },
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
body {
  font-family: "Nunito", sans-serif;
}
</style>
