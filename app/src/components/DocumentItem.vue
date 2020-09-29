<template>
  <q-item :key="this.theDoc.id">
    <q-item-section avatar>
      <q-avatar rounded>
      <img :src="this.theDoc.image">
      </q-avatar>
    </q-item-section>
    <q-item-section class="col-3">
      <q-item-label>{{this.theDoc.text}}</q-item-label>
      <q-item-label caption >Emitted by:{{this.theDoc.emitter}} - lasting up to: {{this.theDoc.expire_date}}</q-item-label>
      <q-item-label caption >cost: {{this.theDoc.price}}</q-item-label>

<!-- <q-btn round @click="generateForm">    <q-icon left size="1em" name="hearing" /> 
</q-btn>-->

    </q-item-section>
        <q-item-section class="col-2">
           <q-btn
        size="12px"
        no-caps
        class="button"
        rounded
        color="info"
        :label="$t('button.view_template')"
        to="/processes"
      />
    </q-item-section>

    </q-item>
</template>

<script>


//
export default {
  // name: 'ComponentName',
  props: ['theDoc'],
  data () {
    return {}
  },
  methods: {
    generateForm() {
      this.$router.push({ name: "certificates" , params: { certificateId: '123' }});
    }
  }
}
</script>
