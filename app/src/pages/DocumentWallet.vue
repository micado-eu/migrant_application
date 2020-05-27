<template>
  <q-page class="flows container-fluid"  style="background-color:#efefef">
    <div >
  <div class="q-pa-md" style="text-align:center; padding-top:30px; padding-bottom:0px; ">
  <q-btn id="button" unelevated rounded color="info" no-caps style="width:320px;margin-right:25px" to="/documents/add" label="Add document" />
  </div >
    <q-list >
    <div  class="q-gutter-xsm  row"
              v-for="i in Math.ceil(this.documents.length / 3)"
              v-bind:key="i" 
              style="padding-top:0px">
     <DocumentWalletItem 
     v-for="document in documents.slice((i - 1) * 3, i * 3)"
     :Title="document.title"
     :Image="document.image"
     :Link="document.id"
     :key="document.id">
     </DocumentWalletItem>
     </div>
     </q-list>
</div>
  </q-page>
</template>

<script>

import DocumentWalletItem from 'components/DocumentWalletItem'



export default {
  name: 'Documents',
  props: {
    msg: String
  },
  data() {
      return{
      }
    },
  components: {
    DocumentWalletItem
  },
  created () {
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('documents/fetchDocuments')
      .then(documents => {
        this.loading = false
      })
  },
  computed:{
   documents() {
      return this.$store.state.documents.documents
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="uppy/dist/uppy.css">

</style>
