<template>
  <q-item :key="this.theDoc.id">
    <q-item-section avatar>   
      <q-btn
          size="10px"
          dense
          @click.native="showDoc()"
          :key="theDoc.id"
          :id="theDoc.id"
          :disabled="!this.isInWallet"
          :class="[{in_wallet: this.isInWallet},{not_in_wallet: !this.isInWallet}]"
          
        >
      <q-avatar rounded>
      <img 
      :src="this.theDoc.image">
      </q-avatar>
      </q-btn>
    </q-item-section>
    <q-item-section class="col-3">
      <q-item-label>{{this.theDoc.text}}</q-item-label>
      <q-item-label caption >Emitted by:{{this.theDoc.emitter}} - lasting up to: {{this.theDoc.expire_date}}</q-item-label>
      <q-item-label caption >cost: {{this.theDoc.price}}</q-item-label>

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
  props: ['theDoc', 'pictures', 'isInWallet'],
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
    },
    showDoc(){
      console.log("showing doc")
      this.$emit('showdoc')
    }
  }
}
</script>
<style scoped>
.image{
  max-width:80%;
  max-height: 80%;
}
.in_wallet{
  background-color: green 
}
.not_in_wallet{
   pointer-events: none;
}
</style>