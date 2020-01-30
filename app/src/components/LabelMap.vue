<template>
<q-field color="purple-12" label="Location" clickable stack-label >
  <template v-slot:prepend>
    <q-icon name="place" />
  </template>
  <template v-slot:control>
    <div class="self-center full-width no-outline" tabindex="0"><a :href="gmap_location"> {{label}} </a></div>
  </template>
</q-field>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['label'],
  data () {
    return {}
  },
  computed: {
    gmap_location() {
      return "https://www.google.com/maps/search/?api=1&query=" + this.label
    }
  }
}
</script>
