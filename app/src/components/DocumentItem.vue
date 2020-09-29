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
        :id="theDoc.id"
        color="info"
        :label="$t('button.view_template')"
        @click="show = true"
      />
    </q-item-section>
      <q-dialog v-model="show"
      @show="showPictures()"
      @hide="close()">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Pictures</div>
          <q-space />
          
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <img class="image" v-for="picture in pictures"
          :key="picture.id"
          :src="picture.image">
        </q-card-section>
      </q-card>
    </q-dialog>
    </q-item>

    
</template>

<script>


//
export default {
  // name: 'ComponentName',
  props: ['theDoc', 'pictures'],
  data () {
    return {
      show:false
    }
  },
  methods: {
    generateForm() {
      this.$router.push({ name: "certificates" , params: { certificateId: '123' }});
    },
    showPictures(){
      console.log("showing")
      this.$emit('showpicture')
    },
    close(){
      console.log("hiding the dialog")
    }
  }
}
</script>
<style scoped>
.image{
  max-width:80%;
  max-height: 80%;
}
</style>