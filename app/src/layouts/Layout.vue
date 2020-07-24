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
        <LanguageSelector></LanguageSelector>
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
          v-for="(nav) in navs"
          :to="nav.to"
          :key="nav.label"
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
import AuthMenu from "./auth/AuthMenu";
//import ListenToggle from "components/ListenToggle";
import LanguageSelector from "components/LanguageSelector";
import UserButton from "components/UserButton"

export default {
  name: "Layout",

  components: {
    AuthMenu,
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
          feature: "FEAT_DEFAULT"
        },
        {
          label: "menu.processes",
          icon: "img:statics/icons/Guided Processes (600x600) white.png",
          to: "/processes",
          description: "menu.processes_desc",
          feature: "FEAT_PROCESSES"
        },
        {
          label: "menu.information",
          icon: "img:statics/icons/Genreal Information (600x600) white.png",
          to: "/information",
          description: "integration information, events and services",
          feature: "FEAT_INFO"
        },
        {
          label: "menu.chatbot",
          icon: "img:statics/icons/Chatbot (600x600) white.png",
          to: "/chatbot",
          description: "Micado smart assistant",
          feature: "FEAT_CHATBOT"
        },
        {
          label: "menu.documents",
          icon: "img:statics/icons/Document Wallet (600x600) white.png",
          to: "/documents",
          description: "my integration document collection",
          feature: "FEAT_DOCUMENTS"
        },
        {
          label: "menu.tasks",
          icon: "img:statics/icons/Task Monitor (600x600) white.png",
          to: "/tasks",
          description: "your personal integration plan",
          feature: "FEAT_TASKS"
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
          icon: "img:statics/icons/MICADO PA APP Icon - Glossary Page (white).png",
          to: "/glossary",
          description: "commonly used words",
          feature: "FEAT_GLOSSARY"
        },
        {
          label: "menu.settings",
          icon: "img:statics/icons/Settings (600x600) white.png",
          to: "/settings",
          description: "manage your account",
          feature: "FEAT_SETTINGS"
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
