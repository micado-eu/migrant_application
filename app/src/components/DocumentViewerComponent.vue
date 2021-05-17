<template>

  <div> 
   <!-- <p id="filename" style="width:320px; margin: 0 auto;padding-top:30px;padding-left:10px;padding-bottom:10px">{{the_document.title}}</p>-->
  <div>
    <div class="container">
      <TalkingLabel
        class="title"
        :text="findType()"
        :Title="findType()"

        />
      <img width="320px" class="image"  alt="Powered by Micado" :src="the_document.pictures[0].picture" />
     
    </div>
    <div class="icon-container row">
    <div class="col ico">
    <q-icon class="icon" name="img:statics/icons/Edit.png" size="md" @click="editing" />
    </div>
    <div class="col ico">
    <q-icon  name="img:statics/icons/Send.png" size="md" />
    </div>
    <div class="col ico">
    <q-icon class="icon" name="img:statics/icons/Icon - Download.svg" size="md" @click="downloading = true" />
    </div>
    <div class="col ico">
    <q-icon  name="img:statics/icons/Icon - Delete.svg" @click="deleting = true" size="md" />
    </div>
   </div>
  </div>
  
    <div class="fields-container" >
     <div class="field"> 
         <hr style="margin-bottom:27px;width: 100%;">
        <TalkingLabel
        class="textup"
        :text="$t('desc_labels.document_type') + findType()"
        :Title="$t('desc_labels.document_type')"
        :row="'row'"
        :title_col="'col-11'"
        :icon_col="'col-1'"
        :icon_style="'text-align:right'"
        />
    <!--<p class="textup">{{$t('desc_labels.document_type')}}:</p>-->
    <p class="textdown">{{findType()}}</p>
      <hr>
    </div>
    <div  class="field"> 
        <TalkingLabel
        class="textup"
        :text="$t('desc_labels.document_issuer') + findIssuer()"
        :Title="$t('desc_labels.document_issuer')"
        :row="'row'"
        :title_col="'col-11'"
        :icon_col="'col-1'"
        :icon_style="'text-align:right'"
        />
    <!--<p class="textup" >{{$t('desc_labels.document_issuer')}}:</p>-->
    <p class="textdown">{{findIssuer()}}</p>
      <hr>
    </div>
    <!--<div class="last-field"> 
    <p class="textup" >{{$t('desc_labels.review_date')}}:</p>
    <p class="textdown">{{the_document.expirationDate}}</p>
    </div>-->
  <div style="text-align:center">
    <q-btn :icon="'img:statics/icons/Icon - go back.svg'"   class="go_back" size="12px" rounded no-caps filled  to="/documents" :label="$t('button.go_back')" />
    <!--<q-btn class="button-2" size="12px" rounded no-caps color="accent" :label="$t('button.download')" />-->
  </div>  
   
    
  </div>
  <q-item>
      <q-dialog v-model="downloading">
        <q-card class="q-pa-md" style="padding-top:0px">
          <div style="padding-top:30px; text-align:center">
          <TalkingLabel
                  class="option_3"
                  style="width:100%"
                  :Title="$t('desc_labels.document_download')"
                  :text="$t('desc_labels.document_download')"
                />
          </div>
          <div style="text-align:center; padding-top:40px">
            <q-icon  size="80px" :name="'img:statics/icons/Icon - Download.svg'"/>
          </div>
          <div style="text-align:center;">
          <q-btn
            :label="$t('button.download')"
            color="secondary"
            style="width:150px"
            rounded
            unelevated
            no-caps
            size="15px"
            @click="downloadDoc"
          />
          </div>
        </q-card>
    </q-dialog>
     <q-dialog v-model="deleting">
       

        <q-card class="q-pa-md" style="padding-top:0px">
          <div style="padding-top:30px; text-align:center">

          <TalkingLabel
                  class="option_3"
                  style="width:100%"
                  :Title="$t('desc_labels.document_delete')"
                  :text="$t('desc_labels.document_delete')"
                />
          </div>
          <div style="text-align:center; padding-top:40px">
            <q-icon  size="80px" :name="'img:statics/icons/Icon - Delete2.svg'"/>
          </div>
          <div style="text-align:center;">
          <q-btn
            class="go_back"
            :label="$t('button.cancel')"
            rounded
            unelevated
            no-caps
            size="15px"
            @click="deleting = false"
            style="margin-right:10px"
          />
            <q-btn
            :label="$t('button.delete')"
            rounded
            unelevated
            color="accent"
            no-caps
            size="15px"
            @click="deleteDocument"
          />
          
          </div>
                
        </q-card>
    </q-dialog>
  </q-item>
  </div>
  
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'
const TalkingLabel = () => import('./TalkingLabel')


export default {
  // name: 'ComponentName',
  props: ["Image","thedocid"],
  mixins: [editEntityMixin,
  storeMappingMixin({
    getters: {
      documents: 'documents/my_documents',
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
      downloading:false,
      deleting:false

    }
  },
  components:{
    TalkingLabel
  },
  methods:{
    deleteDocument () {
      if(this.the_document.uploadedByMe){
      console.log("in delete document event")
      this.$store.dispatch("documents/deleteDocument", this.the_document.id).then(()=>{
        this.$router.push({ name: 'document' })
      })
      }
       else{
        this.$q.notify({
        message: 'You can\'t delete documents not uploaded by you',
        color: 'purple'
      })
      this.deleting = false
      }
    },
    downloadDoc(){
      this.downloading = false
      console.log(this.the_document.pictures[0].picture)
      this.the_document.pictures.forEach((pic)=>{
        var a = document.createElement("a"); //Create <a>
      a.href = pic.picture //Image Base64 Goes here
      a.download = "Image.jpeg"; //File name Here
      a.click()
      })
    },
    editing(){
       if(this.the_document.uploadedByMe){
        console.log("prima di mandare i process")
        console.log(this.theDocument)
        this.$router.push({ name: 'editdocument', params: { thedoc: this.the_document } })
       }
       else{
        this.$q.notify({
        message: 'You can\'t edit documents not uploaded by you',
        color: 'purple'
      })
       }
    }, 
    findType(){
     var doc_type = this.document_types.filter((type)=>{return type.id == this.the_document.documentTypeId})[0]
      return doc_type.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document
    },
    findIssuer(){
      var doc_type = this.document_types.filter((type)=>{return type.id == this.the_document.documentTypeId})[0]
      console.log(doc_type.issuer)
      return doc_type.issuer
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

  margin:0 auto;
  border-radius: 10px; 
  background-color:white; 
  text-align:center;
  padding-top:20px
}
.image{
  margin: 0 auto; 
  margin-top:10px
}
.icon-container{
  margin: 0 auto;
  padding-left:0px; 
  padding-top:10px; 
  padding-bottom:20px
}
.icon{
  margin-right:10px; 
  margin-left:5px
}
.fields-container{
  margin: 0 auto;
  padding-left:10px; 
  padding-right: 10px;
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
.ico{
  text-align:center;
}
.title{
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #0F3A5D;
}
  .go_back {
  background-color: white;
  color:#0F3A5D;
  border: 1px solid #0F3A5D;
  border-radius: 50px;
}
.option_3{
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #0F3A5D;
}
</style>