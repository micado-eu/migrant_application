<template>
  <q-page class="flows container-fluid">
  <div class="q-pa-md" style="text-align:center">
  <q-btn unelevated rounded color="accent" to="/documents/add" label="Add document" />
  </div>
    <q-list >
    <div
              class="q-gutter-lg row"
              style="text-align:center"
              v-for="i in Math.ceil(documents.length / 3)"
              v-bind:key="i"
            >
     <DocumentWalletItem 
     v-for="document in documents.slice((i - 1) * 3, i * 3)"
     :Title="document.title"
     :Image="document.image"
     :Link="document.id"
     :key="document.id">
     </DocumentWalletItem>
     </div>
     </q-list>

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
<style src="uppy/dist/uppy.css"></style>
