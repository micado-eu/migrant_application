<template>
  <q-btn round>
    <q-avatar size="42px">
      <img src="https://cdn.quasar.dev/img/avatar2.jpg">
    </q-avatar>
    <q-menu
      anchor="bottom left"
      self="top right"
    >
      <q-item clickable>
        <q-item-section>Login/Register</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section>Settings</q-item-section>
      </q-item>
    </q-menu>
    <!--
    <q-list>
      <q-item
        clickable
        v-close-popup
      >
        <q-item-section>
          <q-item-label>Login/Register</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-close-popup
      >
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-close-popup
      >
        <q-item-section>
          <q-item-label>Settings</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    -->
  </q-btn>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>
