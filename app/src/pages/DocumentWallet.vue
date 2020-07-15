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
     :Title="setTitle(document)"
     :Image="document.pictures[0].picture"
     :theDocument="document"
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
import editEntityMixin from '../mixin/editEntityMixin'



export default {
  name: 'Documents',
    mixins: [editEntityMixin],
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
      this.$store.dispatch('document_type/fetchDocumentType')
  },
   methods:{
     setTitle(document){
      var the_doc_type =  this.document_types.filter((a_doc_type) => {
        return a_doc_type.id == document.documentTypeId
      })[0]
      console.log(the_doc_type)
      var the_transl =  the_doc_type.translations.filter((transl) => {
         return transl.lang == this.activeLanguage

      })[0]
      console.log(the_transl)
      return the_transl.document
     }
   },
  computed:{
   documents() {
      return this.$store.state.documents.documents
    },
    document_types(){
      return this.$store.state.document_type.document_type

    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="uppy/dist/uppy.css">

</style>
