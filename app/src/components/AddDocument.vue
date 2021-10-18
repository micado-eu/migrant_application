<template>
<div>
  <div v-if="loading">{{$t('desc_labels.loading')}}</div>
<div v-else class="">
  <div style="text-align:center;padding-top:25px">
        <TalkingLabel
        v-if="thedocid != null"
        class="title"
        :icon="top_icon"
        :text="$t('desc_labels.edit_doc')"
        :Title="$t('desc_labels.edit_doc')"

        />
        <TalkingLabel
        v-else
        :icon="top_icon"
        class="title"
        :text="$t('desc_labels.add_doc')"
        :Title="$t('desc_labels.add_doc')"

        />
        
  </div>
  <hr style="border: 1px solid #FF7C44;">
  <div class="row container" style="padding-bottom:10px" >
        <div class="col-8">
          <q-checkbox class="field" v-model="doc_shell.shareable" :label="$t('input_labels.shareable')" color="accent" />
        </div>
        <div class="col-4">
        <TalkingLabel
        class="field"
        :text="$t('input_labels.shareable')"
        :title_col="'col-11'"
        :icon_col="'col-1'"
        :icon_style="'text-align:right; padding-top:8px'"
        />
        </div>
         
          
    </div>
    <hr class="container-hr">
    <div class="select container" >
        <TalkingLabel
        class="field"
        :text="$t('desc_labels.add_doc')"
        :Title="$t('desc_labels.add_doc')"
        :row="'row'"
        :title_col="'col-11'"
        :icon_col="'col-1'"
        :icon_style="'text-align:right'"
        />
        <q-select
            filled
            style="padding-bottom:20px"
            dense
            clearable
            emit-value
            map-options
            v-model="doc_shell.documentTypeId"
            :options="this.t_docs"
            :label="$t('input_labels.doc_type')" 
          />
          <hr >
    </div>
        
    <div class="col-8 input container" >
      <TalkingLabel
        class="field"
        :text="$t('desc_labels.image')"
        :Title="$t('desc_labels.image')"
        :row="'row'"
        :title_col="'col-11'"
        :icon_col="'col-1'"
        :icon_style="'text-align:right'"
        />
        <q-file
        :label="$t('input_labels.upload_doc')"
              @input="getFiles($event)"
              bg-color="grey-3"
              dense
              
              multiple
              standout
              outlined
            >
        </q-file>
    </div>
        <div class="col">
            <span class=" row span" style="justify-content:center">
            <q-btn icon="img:statics/icons/Icon - Delete.svg" style="margin-top:25px"  no-caps rounded class="negative-button" filled  @click="removePicture(image)"  :label="$t('button.remove')" />
            <TalkingLabel
                  :text="$t('button.remove')"
                  :icon_style="'margin-top:31px; margin-left:10px'"                  
                />
            </span>    
    </div>  
    <div class="row container" v-for="image in uploaded_images" :key="image">
    <div class="col" style="text-align:center">
        <q-img 
              :src="image"
              spinner-color="white"
              class="image"
            />
    </div>
  
          </div>        
  <div class="button-container container" >
    <q-btn class="go_back" :icon="'img:statics/icons/Icon - X (cancel).svg'" no-caps rounded to="/documents" @click="back()" :label="$t('button.cancel')" />
    <q-btn  :icon="'img:statics/icons/Icon - Checkmark.svg'" no-caps rounded  color="accent" @click="savingDocument(doc_shell)"  :label="$t('button.save')" />
    
  </div>
  </div>
</div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'
const TalkingLabel = () => import('./TalkingLabel')



export default {
  // name: 'ComponentName',
  props: ["thedocid"],
  mixins: [editEntityMixin,
  storeMappingMixin({
    getters: {
      documents: 'documents/my_documents',
      document_types: 'document_type/document_types_migrant'
    }, actions: {
      editDocument: 'documents/editDocument',
      saveDocument: 'documents/saveDocument',
      fetchDocuments: 'documents/fetchDocuments',
      fetchDocumentType: 'document_type/fetchDocumentTypeMigrant'
    }
  })],
  components:{
    TalkingLabel
  },
  data () {
    return {
      loading:true,
      id: this.$route.params.id,
      doc_shell:{
         id: -1, 
         pictures: [], 
         userId: this.$store.state.auth.user.umid, 
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
      is_new : true,
      top_icon:null
    }
  }, methods: {
     createShell () {
      this.doc_shell = { id: -1, pictures: [], userId: this.$store.state.auth.user.umid, userTenant:null, askValidateByTenant:null, validated:false, validationDate:null, validatedByTenant:null, validatedByUser:null, uploadedByMe:true, expirationDate:null, documentTypeId: "", shareable:false  }
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
      this.doc_shell.shareable = document.shareable

    },
    savingDocument(document){
      console.log("SAVING")
      console.log(document)
      if(this.is_new){
      this.saveDocument(document)
      this.$q.loading.show({
        message: 'Saving'
      })
      this.timer = setTimeout(() => {
          this.$q.loading.hide()
          this.$router.push('/documents');
        }, 2000)              
      }
      else{
        this.editDocument(document)
      this.$q.loading.show({
        message: 'Saving'
      })
        this.timer = setTimeout(() => {
          this.$q.loading.hide()
          this.$router.push('/documents');
        }, 2000)
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
  created () {
    this.createShell()
    console.log("SHELL CREATED")
    this.loading = true
    console.log(this.$store);
    this.fetchDocuments()
      .then(documents => {
        console.log(documents)
            console.log("i am document types")
    console.log(this.thedocid)
    console.log(this.document_types)
      if (this.thedocid != null) {
      console.log("Editing document")
      this.is_new = false
      var selected_doc = this.documents.filter((a_doc) =>{
        return a_doc.id == this.thedocid
      })[0]
      this.mergeProcess(selected_doc)
      console.log(this.doc_shell.pictures)
      this.doc_shell.pictures.forEach((a_picture) => {
        this.uploaded_images.push(a_picture.picture)       
      })
      console.log("the images")
      console.log(this.uploaded_images)
      console.log(this.doc_shell)
    }
      })
    this.fetchDocumentType({defaultLang: this.$defaultLang, currentLang:this.$userLang})
    .then(document_types => {
        console.log(document_types)
        document_types.forEach(document_type => {
          var the_doc = { label: document_type.document, value: document_type.id }
          this.t_docs.push(the_doc)
        })
        if(this.thedocid != null){
          this.top_icon = 'img:statics/icons/Icon - edit.svg'
        }
        else{
          this.top_icon = 'img:statics/icons/Icon - add doc.svg'
        }
        this.loading = false

      })
      

  },
}
</script>
<style scoped>
.negative-button{
  border: 1px solid #9E1F63;
  box-sizing: border-box;
  border-radius: 50px;
}
.button{
  width:100px;
  margin-right:20px
}
.container{
   margin: 0 auto;  
   margin-top:25px; 
   padding-bottom:0px; 
   width:90%
}
.container-hr{
     margin: 0 auto;  
   width:90%
}
.select{
  margin: auto;
  display: block;
  margin-bottom:0px; 
  padding-top:20px; 
  padding-bottom:10px
}
.input{
  margin: auto;
  display: block;
  padding-bottom:10px
}
.image{
  max-height: 100px; 
  max-width: 150px
}
.span{
  text-align:right; 
  padding-left:20px
}
.button-container{
  text-align:center; 
  padding-top:20px
}
.title{
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #0F3A5D;
}
.field{
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
  padding-bottom:10px
}
  .go_back {
  background-color: white;
  color:#0F3A5D;
  border: 1px solid #0F3A5D;
  border-radius: 50px;
  margin-right:10px
}
</style>