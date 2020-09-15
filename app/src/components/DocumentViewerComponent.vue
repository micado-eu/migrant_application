<template>

  <div> 
   <!-- <p id="filename" style="width:320px; margin: 0 auto;padding-top:30px;padding-left:10px;padding-bottom:10px">{{the_document.title}}</p>-->
  <div>
    <div class="container">
     
      <img width="320px" class="image"  alt="Powered by Micado" :src="the_document.pictures[0].picture" />
     
    </div>
    <div class="icon-container">
  <q-icon class="icon" name="img:statics/icons/Edit.png" size="md" @click="editing" />
    <q-icon  name="img:statics/icons/Send.png" size="md" />
   </div>
  </div>

    <div class="fields-container" >
     <div class="field"> 
    <p class="textup">{{$t('desc_labels.document_type')}}:</p>
    <p class="textdown">{{findType()}}</p>
    </div>
    <div  class="field"> 
    <p class="textup" >{{$t('desc_labels.document_issuer')}}:</p>
    <p class="textdown">{{the_document.emitter}}</p>
    </div>
    <div  class="field" > 
    <p class="textup" >{{$t('desc_labels.reviewed_by')}} by:</p>
    <p class="textdown">{{the_document.emitter}}</p>
    </div>
    <div class="last-field"> 
    <p class="textup" >{{$t('desc_labels.review_date')}}:</p>
    <p class="textdown">{{the_document.expirationDate}}</p>
    </div>
  
    <q-btn class="button-1" size="12px" rounded no-caps filled color="info" to="/documents" :label="$t('button.back')" />
    <q-btn class="button-2" size="12px" rounded no-caps color="accent" :label="$t('button.download')" />
    
   
    
  </div>
  </div>
  
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'

export default {
  // name: 'ComponentName',
  props: ["Image","thedocid"],
  mixins: [editEntityMixin,
  storeMappingMixin({
    getters: {
      documents: 'documents/documents',
      document_types: 'document_type/document_types'
    }, actions: {
      editDocument: 'documents/editDocument',
      saveDocument: 'documents/saveDocument',
      fetchDocuments: 'documents/fetchDocuments',
      fetchDocumentType: 'document_type/fetchDocumentType'
    }
  })
  ],
  data () {
    return {
      id:this.thedocid,

    }
  },
  methods:{
    editing(){
     this.$router.push({ name: 'editdocument', params: { thedoc: this.the_document } })
    }, 
    findType(){
     var doc_type = this.document_types.filter((type)=>{return type.id == this.the_document.documentTypeId})[0]
      return doc_type.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document
    }
  },
   computed:{
    document_types(){
      return this.$store.state.document_type.document_type
    },
     documents() {
      return this.$store.state.documents.documents
    }, 
    the_document(){
        for(var i = 0; i< this.documents.length; i++){
          if(this.documents[i].id == this.id){
            console.log("id documento" + this.documents[i].id)
            console.log(this.documents[i])
            console.log("id route" + this.id)
            return this.documents[i]
          }
        }
      }
    
   },
  created () {
    this.loading = true
    console.log(this.$store);
    this.fetchDocuments()
    //this.$store.dispatch('documents/fetchDocuments')
      .then(documents => {
        console.log(documents)
        this.loading = false
      })
      this.fetchDocumentType()
      //this.$store.dispatch('document_type/fetchDocumentType')
      .then(documents => {
        console.log(documents)
        this.loading = false
      })
  },
}
</script>
<style scoped>
.textup {
  font-family: "Nunito", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  margin-bottom:2px;
}
#filename {
   font-size: 16pt;
   font-weight: bold;
}
.textdown {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 0px;
}
.container{
  width:320px;
  margin:0 auto;
  border-radius: 10px; 
  background-color:white; 
  text-align:center;
}
.image{
  margin: 0 auto; 
  margin-top:10px
}
.icon-container{
  width:320px; 
  margin: 0 auto;
  padding-left:10px; 
  padding-top:10px; 
  padding-bottom:20px
}
.icon{
  margin-right:10px; 
  margin-left:5px
}
.fields-container{
  width:320px; 
  margin: 0 auto;
  padding-left:10px
}
.field{
  padding-bottom:20px
}
.last-field{
  padding-bottom:40px
}
.button-1{
  width:100px;
  margin-right:15px;
  margin-top:20px
}
.button-2{
  width:100px;
  margin-right:10px;
  margin-top:20px
}
</style>