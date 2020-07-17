<template>
<div class="" style=" border-width:3px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin: 0 auto; width:750px; padding-left:20px; padding-right:20px; margin-top:25px; padding-bottom:10px">
    <div class="  row" style="text-align:center">
      <div class="col-4">
        <h5 style="text-align:left;margin-bottom:0px"> Document type </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px">
        <q-select
            filled
            dense
            clearable
            emit-value
            map-options
            v-model="doc_shell.documentTypeId"
            :options="this.t_docs"
            label="Document Type"
            style="width: 200px"
          />
      </div>
    </div>
    <div class="row" style="text-align:center">
      <div class=" col-4">
        <h5 style="text-align:left"> Expiration date </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input dense rounded standout outlined :value="doc_shell.userId"  />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Document pictures </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-file
              @input="getFiles($event)"
              bg-color="grey-3"
              dense
              rounded
              multiple
              standout
              outlined
            >
        </q-file>
       
  </div>
  </div>
   <div class="row">
                <div class="col" v-for="image in uploaded_images" :key="image">
        <q-img 
              :src="image"
              spinner-color="white"
              style="max-height: 100px; max-width: 150px"
            />
            <q-btn  no-caps rounded style="width:100px;margin-right:20px" filled color="accent" @click="removePicture(image)"  label="Remove" />
          </div>
          </div>
  <div class="" style="text-align:center; padding-top:20px">
    
    <q-btn  no-caps rounded style="width:100px;margin-right:20px" filled color="accent" @click="saveDocument(doc_shell)"  label="Save" />


    <q-btn  no-caps rounded color="info" style="width:100px;" to="/documents" @click="back()" label="Back" />

  </div>
  </div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'


export default {
  // name: 'ComponentName',
  props: ["thedoc"],
  mixins: [editEntityMixin],
  data () {
    return {
      id: this.$route.params.id,
      doc_shell:{
         id: -1, 
         pictures: [], 
         userId: null, 
         userTenant:null, 
         askValidateByTenant:null, 
         validated:false, 
         validationDate:null, 
         validatedByTenant:null, 
         validatedByUser:null, 
         uploadedByMe:true, 
         expirationDate:null,
         documentTypeId: ""  
         },
      t_docs:[], 
      picture_files:[], 
      uploaded_images:[],
      is_new : true
    }
  }, methods: {
     createShell () {
      this.doc_shell = { id: -1, pictures: [], userId: null, userTenant:null, askValidateByTenant:null, validated:false, validationDate:null, validatedByTenant:null, validatedByUser:null, uploadedByMe:true, expirationDate:null, documentTypeId: ""  }
      /*this.languages.forEach(l => {
        this.edit_process.translations.push({ id: -1, lang: l.lang, process: '', description: '', translationDate: null })
      });*/
    },
    mergeProcess (document) {
      console.log("MERGING")
      console.log(process)
      this.doc_shell.id = document.id
      this.doc_shell.userId = document.userId
      this.doc_shell.userTenant = document.userTenant
      this.doc_shell.askValidateByTenant = document.askValidateByTenant
      this.doc_shell.validated = document.validated
      this.doc_shell.validationDate = document.validationDate
      this.doc_shell.validatedByTenant = document.validatedByTenant
      this.doc_shell.validatedByUser = document.validatedByUser
      this.doc_shell.uploadedByMe = document.uploadedByMe
      this.doc_shell.expirationDate = document.expirationDate
      this.doc_shell.documentTypeId = document.documentTypeId
      this.doc_shell.pictures = document.pictures


      //this.edit_process.applicableUsers = process.applicableUsers
      //    this.edit_process.processTopics = process.processTopics
      
    },
    saveDocument(document){
      console.log("SAVING")
      console.log(document)
      if(this.is_new){
      this.$store.dispatch('documents/saveDocument', document)
      this.$router.push('/documents')
      }
      else{
        this.$store.dispatch('documents/editDocument', document)
        this.$router.push('/documents')
      }
    },
   
    getFiles(files) {
       console.log(files);
      console.log(this)

      console.log(self)

      let reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(files[0])

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: files[0].name,
          type: files[0].type,
          size: Math.round(files[0].size / 1000) + ' kB',
          base64: reader.result,
          file: files[0]
        }
        this.uploaded_images.push(fileInfo.base64)
        this.doc_shell.pictures.push({
          id:-1,
          picture: fileInfo.base64,
          docId: -1,
          order: null
        })
        console.log(fileInfo)
        console.log("i am the pictures")
        console.log(this.doc_shell.pictures)

    }
    }, 
    back(){
      this.$router.push('/documents')
    }, 
    removePicture(image){
     var idx =  this.uploaded_images.findIndex(an_image => an_image === image)
     this.uploaded_images.splice(idx, 1)
     console.log(this.uploaded_images)
     var doc_idx = this.doc_shell.pictures.findIndex(an_image => an_image.picture === image)
     this.doc_shell.pictures.splice(doc_idx, 1)
     console.log(this.doc_shell.pictures)

    }
  },
   computed:{
     documents() {
      return this.$store.state.documents.documents
    }, 
    document_types(){
      return this.$store.state.document_type.document_type

    }
    /*the_document(){
      if(this.id != null){
        for(var i = 0; i< this.documents.length; i++){
          if(this.documents[i].id == this.id){
            console.log("id documento" + this.documents[i].id)
            console.log(this.documents[i])
            console.log("id route" + this.id)
            return this.documents[i]
          }
        }
      }
      else{
        return this.doc_shell
      }
    }*/
    
   },
  created () {
    this.createShell()
    console.log("SHELL CREATED")
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('documents/fetchDocuments')
      .then(documents => {
        console.log(documents)
        this.loading = false
      })
    this.$store.dispatch('document_type/fetchDocumentType')
    .then(document_types => {
        console.log(document_types)
        document_types.forEach(document_type => {
          var the_doc = { label: document_type.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document, value: document_type.id }
          this.t_docs.push(the_doc)
        })

      })
    console.log("i am document types")
    console.log(this.document_types)
      if (this.thedoc != null) {
      console.log("Editing document")
      this.is_new = false
      this.mergeProcess(this.thedoc)
      this.doc_shell.pictures.forEach((a_picture) => {
        this.uploaded_images.push(a_picture.picture)
        
      })
      console.log("the images")
      console.log(this.uploaded_images)
      console.log(this.doc_shell)
    }
  },
}
</script>
