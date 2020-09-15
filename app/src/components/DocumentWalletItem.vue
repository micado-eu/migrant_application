<template>
  <div>
    <q-item
    style="padding-top:0px;display:inline-block padding-left:0px; padding-right:0px"
    clickable
    @click="viewDoc"
  >
   <q-item-section
    class="col-2"
    style="width:96px;height:64px">
        <img 
        style="width:64px;height:64px;margin-top:20px" 
        :src="this.Image">
    </q-item-section>
      <div
    class="col-10"
    style="height:64px">
      <div 
      class="row" 
      style="height:32px;vertical-align:text-top">
          <q-item-section 
          class="col" 
          style="font-size:15px; font-weight:600;">
          {{ this.Title }}
          </q-item-section>
    </div>
    <div>
    <q-icon style="margin-right:10px;" name="img:statics/icons/Edit.png" size="md" @click.stop="editing" />
    <q-icon style="margin-right:10px;" name="img:statics/icons/Send.png" size="md" />
    <q-icon :id="this.Link" name="img:statics/icons/Icon - Delete.svg" @click.stop="deleteDocument($event)" size="md" />
    
    </div>
   
    </div>
  
 <!-- <div id="title" class="row" style="width:320px;padding-bottom: 10px;margin: 0 auto;padding-left:10px;padding-top:30px"> {{this.Title}}
     </div>
  <div class="" style="margin: 0 auto;width:320px;border-radius: 10px; background-color:white; text-align:center; height:120px;overflow:hidden;">
  <router-link :to="'documents/' + this.Link">
  <img alt="Powered by Micado"  style="margin: 0 auto; margin-top:2px" :src="this.Image" width="320px" />
  </router-link>
  </div>

   <div class="q-pa-lg" style="width:320px; margin: 0 auto;padding-left:10px; padding-top:10px;padding-bottom:0px">
    <q-icon style="margin-right:10px;" name="img:statics/icons/Edit.png" size="md" @click.stop="editing" />
    <q-icon style="margin-right:10px;" name="img:statics/icons/Send.png" size="md" />
    <q-icon :id="this.Link" name="img:statics/icons/Icon - Delete.svg" @click.stop="deleteDocument($event)" size="md" />
  
   </div>-->
   
    </q-item>
    <hr style="border: 1px solid #E8E8E8;">
    </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["Title", "Image", "Link", "theDocument"],
  data () {
    return {}
  },
  methods:{
    editing(){
      console.log("prima di mandare i process")
      console.log(this.theDocument)
      this.$router.push({ name: 'editdocument', params: { thedocid: this.Link} })
    },
    deleteDocument(){
      console.log("in delete document event")
      this.$emit('delete', event.currentTarget.id)
    },
    viewDoc(){
      this.$router.push({ name: 'viewdocument', params: { thedocid: this.Link } })
    }
  }
}
</script>
<style scoped>
#title {
   
   font-size: 16pt;
   font-weight: bold;
}

</style>