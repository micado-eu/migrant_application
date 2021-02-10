<template>
  <q-page class="flows container-fluid" style="">
    <div
      class="q-pa-md"
      style="text-align:center; padding-top:30px; padding-bottom:20px; "
    >
      <q-btn
      :data-cy="'adddocument'"
        id="button"
        unelevated
        rounded
        color="info"
        no-caps
        style="width:320px;margin-right:25px"
        to="/documents/add"
        :label="$t('button.add_document')"
      />
    </div>
    <hr style="border: 1px solid #FF7C44;" />
    <q-list style="width:100%; margin:0 auto">
      <DocumentWalletItem
        v-for="document in user_docs"
        :Title="setTitle(document)"
        :Image="document.pictures[0].picture"
        :theDocument="document"
        :Link="document.id"
        :key="document.id"
        @delete="deleteDocument"
        @sendDoc="sendDoc"
      >
      </DocumentWalletItem>
    </q-list>
  </q-page>
</template>

<script>
const DocumentWalletItem = () => import("components/DocumentWalletItem")
import editEntityMixin from "../mixin/editEntityMixin"
import storeMappingMixin from '../mixin/storeMappingMixin'

export default {
  name: "Documents",
  mixins: [editEntityMixin, 
  storeMappingMixin({
    getters: {
      documents: 'documents/my_documents',
      document_types: 'document_type/document_types_migrant',
    }, actions: {
      fetchDocuments: 'documents/fetchDocuments',
      fetchDocumentType: 'document_type/fetchDocumentTypeMigrant',
      sendDocumentMail:'documents/sendDocumentMail'
    }
  })],
  data() {
    return {};
  },
  components: {
    DocumentWalletItem
  },
  computed:{
    user_docs(){
      var user = this.$store.state.auth.user.umid
      return this.documents.filter((doc)=>{
        return doc.userId == user
      })
    }
  },
  created() {
    this.loading = true;
    console.log(this.$store);
    this.fetchDocuments()
    //this.$store.dispatch("documents/fetchDocuments")
    .then(documents => {
      this.loading = false;
      console.log("documents in created");
      console.log(documents);
    });
    this.fetchDocumentType({defaultLang: this.$defaultLang, currentLang:this.$userLang})
    //this.$store.dispatch("document_type/fetchDocumentType")
      .then(document_types => {
        console.log("we are the docs");
        console.log(document_types);
      });
  },
  methods: {
    sendDoc(value){
      console.log(value)
      var sendingDoc = this.documents.filter((doc)=>{
        return doc.id == value.docid
      })[0]
      console.log(sendingDoc)
      console.log(value.email)
      console.log("here goes the call to the backend to send the document")
      //this.sendDocumentMail({id:value.docid, email:value.email})
    },
    setTitle(document) {
      var the_doc_type = this.document_types.filter(a_doc_type => {
        return a_doc_type.id == document.documentTypeId;
      })[0];
      return the_doc_type.document
     /* if (the_doc_type.length == 1) {
        var the_transl = the_doc_type[0].translations.filter(transl => {
          return transl.lang == this.activeLanguage || transl.lang === "en";
        });
        if (the_transl.length > 0) {
          return the_transl[0].document;
        }
        return "";
      }*/
    },
    deleteDocument(value) {
      console.log("in delete document method");
      console.log(value);
      this.$store.dispatch("documents/deleteDocument", value);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="uppy/dist/uppy.css"></style>
