<template>
  <div class="notifications">
  <q-list bordered class="rounded-borders" >

    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://upload.wikimedia.org/wikipedia/it/archive/6/6e/20110803184228%21Bologna-Stemma.png">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">Your permit is ready</q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold">Bologna Municipality</span>
          -- You can go to the office number 12 to get your permit
        </q-item-label>
      </q-item-section>

      <q-item-section side top>
        1 min ago
      </q-item-section>
    </q-item>

    <q-separator inset="item" />

    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar4.jpg">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">Translation support</q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold">John</span>
          -- I'll be at office 12 entrance to support you
        </q-item-label>
      </q-item-section>

      <q-item-section side top>
        1 min ago
      </q-item-section>
    </q-item>
  </q-list>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
