<template>
  <q-page class="flows container-fluid">
    <q-list >
      <q-item-label header>Owned documents</q-item-label>
      <DocumentItem v-for="doc in documents" :theDoc="doc" :key="doc.id" >
      </DocumentItem>
    </q-list>
    Upload new documents

    <div class="ThumbnailContainer" v-if="collection === 'thumbnail'">
      <button id="open-thumbnail-modal" class="button">Select file</button>

    </div>
    <div id="DashboardContainer" v-else></div>
    </div>
  </q-page>
</template>

<script>
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import XHRUpload from '@uppy/xhr-upload'
import Tus from '@uppy/tus'
import DocumentItem from 'components/DocumentItem'

//const Uppy = require('@uppy/core');
//const Dashboard = require('@uppy/dashboard');
//const XHRUpload = require('@uppy/xhr-upload');
//const Tus = require('@uppy/tus')

export default {
  name: 'Documents',
  props: {
    msg: String
  },
  data() {
      return {
      files: {},
      mainProps: { width: 50, height: 50, class: 'm1' }
      }
    },
  components: {
    DocumentItem
  },
  computed: {
  uppyId() {
    return `${this.modelId}-${this.collection}`;
  },
    documents() {
      return this.$store.state.documents.documents
    }
  },
  created () {
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('documents/fetchDocuments')
      .then(documents => {
        this.loading = false
      })
  },
  mounted() {
    const uppy = Uppy({
      id: this.uppyId,
      autoProceed: false,
      debug: true,
      thumbnailGeneration: true,
      restrictions: {
        maxFileSize: false,
        allowedFileTypes: ['image/*', 'application/pdf'],
      },
      meta: {
        modelId: this.modelId,
        collection: this.collection,
      },
      onBeforeFileAdded: () => {
        Promise.resolve();
      },
      onBeforeUpload: (files) => {
        this.files = files;
        Promise.resolve();
      },
    });
    if (this.collection === 'thumbnail') {
      uppy.use(Dashboard, {
        trigger: '#open-thumbnail-modal',
        metaFields: [
          { id: 'owner', name: 'Owner', placeholder: 'name of the photographer/owner' },
          { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' },
          { id: 'order', name: 'Order', placeholder: 'order' },
        ],
      });
    } else {
      uppy.use(Dashboard, {
        inline: true,
        target: '#DashboardContainer',
        replaceTargetContent: true,
        note: 'Images and PDF only.',
        maxHeight: 500,
        metaFields: [
          { id: 'owner', name: 'Owner', placeholder: 'name of the photographer/owner' },
          { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' },
          { id: 'order', name: 'Order', placeholder: 'order' },
        ],
      });
    }
    uppy.use(Tus, {
      endpoint: 'http://localhost:8081/upload', // use your tus endpoint here
      resume: true,
      autoRetry: true,
      retryDelays: [0, 1000, 3000, 5000]
    })
    /*
    uppy.use(XHRUpload, {
      endpoint: this.endpoint,
      headers: {
        'X-CSRF-TOKEN': window.csrfToken,
      },
    });
    // uppy.on('upload-success', (fileId, resp, uploadURL) => {
    //   debugger;
    //   console.log(uploadURL)
    //   var img = new Image()
    //   img.width = 300
    //   img.alt = fileId
    //   img.src = uploadURL
    //   document.body.appendChild(img)
    // });
    */
    uppy.run();
  },
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="uppy/dist/uppy.css"></style>
