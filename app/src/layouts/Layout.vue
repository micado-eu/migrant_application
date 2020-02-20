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

        <q-toolbar-title>
          Micado App
        </q-toolbar-title>

        <ListenToggle />

        <div>Micado v0.1</div>
      </q-toolbar>
    </q-header>

    <q-footer >
      <q-tabs>
        <q-route-tab  v-for="(nav, index) in navs" :to="nav.to" :key="nav.label" :label="$t( nav.label )" :icon="nav.icon"  />
      </q-tabs>
    </q-footer>

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
          <q-item clickable exact v-for="(nav, index) in navs" :to="nav.to" :key="nav.label" >
            <q-item-section avatar>
              <q-icon :name="nav.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t( nav.label) }}</q-item-label>
              <q-item-label caption>{{ nav.description }}</q-item-label>
            </q-item-section>
          </q-item>
          <div class="row justify-center full-height full-width text-center">
            <img  alt="Powered by Micado" src="~assets/powered_Micado.png">
          </div>
           
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthMenu from './auth/AuthMenu'
import ListenToggle from 'components/ListenToggle'

export default {
  name: 'Layout',

  components: {
    AuthMenu, ListenToggle
  },


  data () {
    return {
      leftDrawerOpen: false,
      navs: [
        {label:'menu.services', icon: 'school', to: '/services', description: 'services from PA and ONGs'},
        {label:'menu.documents', icon: 'description', to: '/documents', description: 'documents saved in my wallet'},
        {label:'menu.assistant', icon: 'question_answer', to: '/chatbot', description: 'Micado Assistant'},
        {label:'menu.processes', icon: 'timeline', to: '/flows', description: 'flow description of processes'},
        {label:'menu.notifications', icon: 'mail_outline', to: '/notifications', description: 'messages from PA'},
        {label:'menu.search', icon: 'search', to: '/map', description: "PA's services around you"},
        {label:'menu.tasks', icon: 'assignment', to: '/tasks', description: "Tasks for your integration"},
        {label:'menu.speech', icon: 'record_voice_over', to: '/speech', description: "I'll listen to you"},
        {label:'menu.settings', icon: 'settings_applications', to: '/settings', description: "configure the application"},
        {label:'menu.glossary', icon: 'book', to: '/glossary', description: "glossary"}
      ]
    }
  }
}
</script>

<style>
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
  }

</style>
