<template>
  <div class="q-pa-md ">
  
  <div class="row" style="font-size:22px; font-weight:bold;padding-bottom: 25px;"> {{this.Title}} </div>
  <div class="row" style="margin: 0 auto">
  <router-link :to="'documents/' + this.Link">
  <img alt="Powered by Micado" :src="this.Image" width="500" />
  </router-link>
  </div>
  <div class="row q-pa-md">
    <div class="col" style="margin: 0 auto">
    <q-btn  rounded style="width:100px; height:40px" filled color="accent" :to="'documents/edit/' + this.Link" label="Edit" />
    </div>
    <div class="col" style="margin: 0 auto">
    <q-btn  rounded color="accent" style="width:100px; height:40px" label="Send to" />
    </div>
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
