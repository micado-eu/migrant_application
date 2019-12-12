<template>
  <q-layout view="lHh Lpr lFf">
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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <auth-menu />
      <q-list>
        <q-item-label header>My services</q-item-label>
        <q-item clickable tag="a" to="/services">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Available services</q-item-label>
            <q-item-label caption>services from PA and ONGs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a"  to="/documents">
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My Documents</q-item-label>
            <q-item-label caption>documents saved in my wallet</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/chatbot">
          <q-item-section avatar>
            <q-icon name="question_answer" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My Assistant</q-item-label>
            <q-item-label caption>Micado Assistant</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a"  to="/flows">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Administrative processes</q-item-label>
            <q-item-label caption>flow description of processes</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a"  to="/notifications">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Notifications</q-item-label>
            <q-item-label caption>messages from PA</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a"  to="/map">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Search</q-item-label>
            <q-item-label caption>PA's services around you</q-item-label>
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
  name: 'MyLayout',

  components: {
    AuthMenu
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
