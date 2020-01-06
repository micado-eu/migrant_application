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

        <div>Micado v0.1</div>
      </q-toolbar>
    </q-header>

    <q-footer >
      <q-tabs>
        <q-route-tab  v-for="(nav, index) in navs" :to="nav.to" :key="nav.label" :label="nav.label" :icon="nav.icon"  />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breackpoint="767"
      bordered
      content-class="bg-grey-2"
    >
      <auth-menu />
      <q-list>
        <q-item-label header>My tools</q-item-label>
          <q-item clickable exact v-for="(nav, index) in navs" :to="nav.to" :key="nav.label">
            <q-item-section avatar>
              <q-icon :name="nav.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ nav.label }}</q-item-label>
              <q-item-label caption>{{ nav.description }}</q-item-label>
            </q-item-section>
          </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthMenu from './auth/AuthMenu'

export default {
  name: 'Layout',

  components: {
    AuthMenu
  },

  data () {
    return {
      leftDrawerOpen: false,
      navs: [
        {label:'Available services', icon: 'school', to: '/services', description: 'services from PA and ONGs'},
        {label:'My Documents', icon: 'description', to: '/documents', description: 'documents saved in my wallet'},
        {label:'My Assistant', icon: 'question_answer', to: '/chatbot', description: 'Micado Assistant'},
        {label:'Administrative processes', icon: 'record_voice_over', to: '/flows', description: 'flow description of processes'},
        {label:'Notifications', icon: 'record_voice_over', to: '/notifications', description: 'messages from PA'},
        {label:'Search', icon: 'record_voice_over', to: '/map', description: "PA's services around you"},
        {label:'Speech', icon: 'record_voice_over', to: '/speech', description: "I'll listen to you"}
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
