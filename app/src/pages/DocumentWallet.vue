<template>
  <q-page class="flows container-fluid" style="background-color:#efefef">
    <div
      class="q-pa-md"
      style="text-align:center; padding-top:30px; padding-bottom:20px; "
    >
      <q-btn
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
        v-for="document in documents"
        :Title="setTitle(document)"
        :Image="document.pictures[0].picture"
        :theDocument="document"
        :Link="document.id"
        :key="document.id"
        @delete="deleteDocument"
      >
      </DocumentWalletItem>
    </q-list>
  </q-page>
</template>

<script>
import DocumentWalletItem from "components/DocumentWalletItem";
import editEntityMixin from "../mixin/editEntityMixin";

export default {
  name: "Documents",
  mixins: [editEntityMixin],
  props: {
    msg: String
  },
  data() {
    return {};
  },
  components: {
    DocumentWalletItem
  },
  created() {
    this.loading = true;
    console.log(this.$store);
    this.$store.dispatch("documents/fetchDocuments").then(documents => {
      this.loading = false;
      console.log("documents in created");
      console.log(documents);
    });
    this.$store
      .dispatch("document_type/fetchDocumentType")
      .then(document_types => {
        console.log("we are the docs");
        console.log(document_types);
      });
  },
  methods: {
    setTitle(document) {
      var the_doc_type = this.document_types.filter(a_doc_type => {
        return a_doc_type.id == document.documentTypeId;
      });
      if (the_doc_type.length == 1) {
        var the_transl = the_doc_type[0].translations.filter(transl => {
          return transl.lang == this.activeLanguage || transl.lang === "en";
        });
        if (the_transl.length > 0) {
          return the_transl[0].document;
        }
        return "";
      }
    },
    deleteDocument(value) {
      console.log("in delete document method");
      console.log(value);
      this.$store.dispatch("documents/deleteDocument", value);
    }
  },
  computed: {
    documents() {
      return this.$store.state.documents.documents;
    },
    document_types() {
      return this.$store.state.document_type.document_type;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="uppy/dist/uppy.css"></style>
