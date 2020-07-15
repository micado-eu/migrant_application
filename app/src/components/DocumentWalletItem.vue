<template>
  <div class=" " style="margin:0 auto">
  
  <div id="title" class="row" style="width:320px;padding-bottom: 10px;margin: 0 auto;padding-left:10px;padding-top:30px"> {{this.Title}}
     </div>
  <div class="" style="margin: 0 auto;width:320px;border-radius: 10px; background-color:white; text-align:center; height:120px;overflow:hidden;">
  <router-link :to="'documents/' + this.Link">
  <img alt="Powered by Micado"  style="margin: 0 auto; margin-top:2px" :src="this.Image" width="320px" />
  </router-link>
  </div>

   <div class="q-pa-lg" style="width:320px; margin: 0 auto;padding-left:10px; padding-top:10px;padding-bottom:0px">
    <q-icon style="margin-right:10px;" name="img:statics/icons/Edit.png" size="md" @click="editing" />
    <q-icon  name="img:statics/icons/Send.png" size="md" />
  
   </div>
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
      this.$router.push({ name: 'editdocument', params: { thedoc: this.theDocument } })
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