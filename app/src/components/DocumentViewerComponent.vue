<template>

  <div style="background-color:#efefef"> 
    <p id="filename" style="width:320px; margin: 0 auto;padding-top:30px;padding-left:10px;padding-bottom:10px">{{the_document.title}}</p>
  <div class="q-pa-md" style="padding-top:0px; padding-left:0px; padding-right:0px">
    <div style="width:320px;margin:0 auto;border-radius: 10px; background-color:white; text-align:center;">
     
      <img width="320px" style="margin: 0 auto; margin-top:10px"  alt="Powered by Micado" :src="the_document.pictures[0].picture" />
     
    </div>
    <div class="" style="width:320px; margin: 0 auto;padding-left:10px; padding-top:10px; padding-bottom:20px">
  <q-icon style="margin-right:10px; margin-left:5px" name="img:statics/icons/Edit.png" size="md" @click="editing" />
    <q-icon  name="img:statics/icons/Send.png" size="md" />
   </div>
  </div>

    <div class="" style="width:320px; margin: 0 auto;padding-left:10px">
     <div style="padding-bottom:30px"> 
    <p id="textup" style="margin-bottom:2px">Document type:</p>
    <p id="textdown">{{findType()}}</p>
    </div>
    <div  style="padding-bottom:30px"> 
    <p id="textup" style="margin-bottom:2px">Document issuer:</p>
    <p id="textdown">{{the_document.emitter}}</p>
    </div>
    <div  style="padding-bottom:30px"> 
    <p id="textup" style="margin-bottom:2px">Reviewed by:</p>
    <p id="textdown">{{the_document.emitter}}</p>
    </div>
    <div  style="padding-bottom:40px"> 
    <p id="textup" style="margin-bottom:2px">Review date:</p>
    <p id="textdown">{{the_document.expirationDate}}</p>
    </div>
  
    
    <q-btn id="button" size="12px" rounded no-caps color="accent" style="width:100px;margin-right:10px" :label="$t('button.download')" />
    <q-btn id="button" size="12px" rounded no-caps style="width:100px;margin-right:15px" filled color="info" to="/documents" :label="$t('button.back')" />
    
   
    
  </div>
  </div>
  
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'

export default {
  // name: 'ComponentName',
  props: ["Image","thedocid"],
  mixins: [editEntityMixin],
  data () {
    return {
      id:this.thedocid,

    }
  },
  methods:{
    editing(){
      this.$router.push('edit/' + this.id)
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
    this.$store.dispatch('documents/fetchDocuments')
      .then(documents => {
        console.log(documents)
        this.loading = false
      })
      this.$store.dispatch('document_type/fetchDocumentType')
      .then(documents => {
        console.log(documents)
        this.loading = false
      })
  },
}
</script>
<style scoped>
#textup {
   
   font-size: 16pt;
   font-weight: bold;
}
#filename {
   
   font-size: 16pt;
   font-weight: bold;
}
#textdown {
 
   font-size: 14pt;
}

</style>