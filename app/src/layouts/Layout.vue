<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Micado App</q-toolbar-title>
        <LanguageSelector></LanguageSelector>
        <ListenToggle />

        <div>Micado v0.1</div>
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
      content-class="bg-green-4"
    >
      <auth-menu />
      <q-list>
        <q-item-label header>{{ $t('menu.title') }}</q-item-label>
        <q-item
          clickable
          exact
          v-for="(nav) in navs"
          :to="nav.to"
          :key="nav.label"
          v-feature-flipping="nav.feature"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t( nav.label) }}</q-item-label>
            <q-item-label caption>{{ nav.description }}</q-item-label>
          </q-item-section>
        </q-item>
        <div class="row justify-center full-height full-width text-center">
          <img alt="Powered by Micado" src="~assets/powered_Micado.png" />
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
import ListenToggle from "components/ListenToggle";
import LanguageSelector from "components/LanguageSelector";

export default {
  name: "Layout",

  components: {
    AuthMenu,
    ListenToggle, 
    LanguageSelector
  },

  data() {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: "menu.home",
          icon: "home",
          to: "/",
          description: "MICADO home page",
          feature: "FEAT_DEFAULT"
        },
        {
          label: "menu.processes",
          icon: "timeline",
          to: "/flows",
          description: "guided integration processes",
          feature: "FEAT_PROCESSES"
        },
        {
          label: "menu.info",
          icon: "search",
          to: "/info",
          description: "integration informaton explained",
          feature: "FEAT_INFO"
        },
        {
          label: "menu.chatbot",
          icon: "question_answer",
          to: "/chatbot",
          description: "Micado Assistant",
          feature: "FEAT_CHATBOT"
        },
        {
          label: "menu.documents",
          icon: "description",
          to: "/documents",
          description: "documents saved in my wallet",
          feature: "FEAT_DOCUMENTS"
        },
        {
          label: "menu.tasks",
          icon: "assignment",
          to: "/tasks",
          description: "Tasks for your integration",
          feature: "FEAT_TASKS"
        },
        {
          label: "menu.messenger",
          icon: "mail_outline",
          to: "/notifications",
          description: "messages from PA",
          feature: "FEAT_MESSENGER"
        },
        {
          label: "menu.settings",
          icon: "settings_applications",
          to: "/settings",
          description: "configure the application",
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
  body {
    font-family: 'Nunito', sans-serif;
  }
}
</style>
