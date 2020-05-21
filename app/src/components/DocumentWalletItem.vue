<template>
  <div class="q-pa-md ">
  
  <div class="row" style="font-size:18px;width:320px; font-weight:bold;padding-bottom: 25px;margin: 0 auto;padding-left:10px"> {{this.Title}}
     </div>
  <div class="" style="margin: 0 auto;width:320px">
  <router-link :to="'documents/' + this.Link">
  <img alt="Powered by Micado" :src="this.Image" width="320px" />
  </router-link>
  </div>

   <div class="q-pa-lg" style="width:320px; margin: 0 auto;padding-left:10px; padding-top:0px">
  <q-btn  color="accent" rounded icon-right="send" />
  <q-btn  color="info" rounded icon-right="edit" :to="'documents/edit/' + this.Link" />
   </div>
</div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["Title", "Image", "Link"],
  data () {
    return {}
  }
}
</script>
