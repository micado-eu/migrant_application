  <template>
  <div class="container">
    <h5 class="title"> {{this.the_process}} </h5>
    <div class="row pad">
              <q-img
                class="image"
                v-for="tag in full_process.topics"
                :src="topics.filter(topic => topic.id == tag)[0].icon"
                :key="tag"
              >
              </q-img>
               <q-img
                class="image"
                v-for="tag in full_process.users"
                :src="users.filter(user => user.id == tag)[0].icon"
                :key="tag"
              >
               </q-img>
    </div>
    <div class="row">
      <div class="col">
        <q-scroll-area
          vertical
          id="scroll"
          class="bg-grey-1"
        >
          <vue-mermaid
            :nodes="mermaid"
            :config="merconf"
            type="graph TD"
            v-on:nodeClick="editNodeMer"
          ></vue-mermaid>
        </q-scroll-area>
      </div>
    </div>
    
    <q-card
      :class="nodePanelVisible"
      header="Details of the step1"
    >
    <h5
      :class="nodePanelVisible"
      id="header"
    >{{this.shell_data.text}}</h5>
    
      <q-field
        color="purple-12"
        :label="$t('desc_labels.description')"
        stack-label
      >
        <template v-slot:prepend>
          <q-icon name="img:statics/icons/Description.svg" />
        </template>
        <template v-slot:control>
          <div
            class="self-center full-width no-outline"
            tabindex="0"
          >{{shell_data.description}}</div>
        </template>
      </q-field>
      <LabelMap :label="flowData.location" />
      <q-field
        color="purple-12"
        :label="$t('desc_labels.cost')"
        stack-label
      >
        <template v-slot:prepend>
          <q-icon name="euro_symbol" />
        </template>
        <template v-slot:control>
          <div
            class="self-center full-width no-outline"
            tabindex="0"
          >{{flowData.cost}}</div>
        </template>
      </q-field>
      <q-list>
        <q-item-label header>{{$t('desc_labels.required_documents')}}</q-item-label>
        <DocumentItem
          v-for="doc in documents"
          :theDoc="doc"
          :key="doc.id"
          :pictures="doc.pictures"
          :isInWallet="checkWallet(doc.id)"
          @showdoc="showDocument(doc.id)"  >
        </DocumentItem>
      </q-list>
    </q-card>
    <CommentList
    :selected_process_comments ="selected_process_comments"
    >
    </CommentList>
    <div class="q-pa-md q-gutter-sm  col button-div">
      <q-btn
        size="12px"
        no-caps
        class="button"
        rounded
        color="info"
        :label="$t('button.back')"
        to="/processes"
      />
    </div>
  </div>
</template>


<script>
import ListItem from 'components/ListItem'
import DocumentItem from 'components/DocumentItem'
import LabelMap from 'components/LabelMap'
import storeMappingMixin from '../mixin/storeMappingMixin'
import editEntityMixin from '../mixin/editEntityMixin'
import CommentList from 'components/CommentList'


export default {
  name: 'ProcessViewer',
  mixins:[editEntityMixin,
    storeMappingMixin({
    getters: {
      processes: 'flows/processes',
      flowData: 'flows/flowData',
      shell_data: 'flows/shell_data',
      documents: 'flows/documents',
      nodePanelVisible: 'flows/nodePanelVisible',
      process_comments: 'comments/process_comments',
      comments: 'comments/comments',
      document_types: 'document_type/document_types',
      topics: 'topic/topics',
      users: 'user_type/users',
      my_documents:'documents/my_documents'
    }, actions: {
      fetchGraph: 'flows/fetchGraph',
      fetchCommentsByProcess: 'comments/fetchCommentsByProcess',
      fetchComments: 'comments/fetchComments',
      fetchDocumentType: 'document_type/fetchDocumentType',
      fetchTopic: 'topic/fetchTopic',
      fetchUserType: 'user_type/fetchUserType',
      fetchFlows: 'flows/fetchFlows',
      fetchDocuments: 'documents/fetchDocuments'

    }
  })
  ],
  props:['processid'],
  components: {
    DocumentItem, LabelMap, CommentList
  },
  data () {
    return {
      details: false,
      id: this.$route.params.id,
      merconf: { theme: "default", startOnLoad: false, securityLevel: 'loose', useMaxWidth: false, flowchart: { padding: 5 } },
      mermaid: [],
      the_process: null,
      selected_process_comments:[],
      pictures:[],
      full_process:null
    }
  },
  computed: {
     
  },
  methods: {
    showDocument(docid){
        console.log("inside show document")
      var userId= this.$store.state.auth.user.umid
        var user_docs = this.my_documents.filter((my_doc)=>{
          return my_doc.userId == userId
        })
        console.log("I am user docs in view document")
        console.log(user_docs)
        var the_doc = user_docs.filter((doc)=>{
          return doc.documentTypeId == docid
        })[0]
        console.log("i am found doc in view docs")
        console.log(the_doc.id)
        this.$router.push({ name: 'viewdocument', params: { thedocid: the_doc.id } })
        console.log("after doc")
        //console.log(the_doc.uploadedByMe)
        //return the_doc.id

    },
     checkWallet(docid){
      if(this.$auth.loggedIn()){
        var userId= this.$store.state.auth.user.umid
        console.log(userId)
        console.log(this.my_documents)
        var user_docs = this.my_documents.filter((my_doc)=>{
          return my_doc.userId == userId
        })
        console.log("I am user docs")
        console.log(user_docs)
        var the_doc = user_docs.filter((doc)=>{
          return doc.documentTypeId == docid
        })
        console.log("i am found doc")
        console.log(the_doc)
        if(the_doc.length != 0){
          console.log("inside if true")
          return true
        }
        else{
          console.log("inside first else")
          return false
        }

      }
      else{
        console.log("inside second else")
        return false
      }
    },
  
    editNodeMer (nodeId) {
      console.log(nodeId);
      const arr1 = this.mermaid.filter(d => d.id == nodeId);
      console.log("I am flow data")
        arr1[0].data.documents.forEach((doc) =>{
        for(var i = 0; i< this.document_types.length; i++){
        if(this.document_types[i].pictures != null){
         for(var j = 0; j < this.document_types[i].pictures.length; j++){
           if(doc.id == this.document_types[i].pictures[j].documentTypeId){
             if(doc.pictures == null){
               doc.pictures = [this.document_types[i].pictures[j]]
             }
             else{
               doc.pictures.push(this.document_types[i].pictures[j])
             }
           }
         }
        }
      }
      })
      console.log(arr1[0].data);
      this.$store.commit("flows/setNodePanelVisible", "");
      this.$store.commit("flows/setDocuments", arr1[0].data.documents);
      this.$store.commit("flows/setFlowData", arr1[0].data);
      this.$store.commit("flows/setShellData", arr1[0]);
      console.log("I am the documents")
      console.log(this.documents)
    },

    showStep (event, node) {
      console.log(node)
      if (node.group == "nodes") {
        console.log("editing")
        this.details = true
        console.log("I'm old")
        this.step = JSON.parse(JSON.stringify(node))
        console.log(this.step)
      }
    },
  },


 async created () {
    this.loading = true
    console.log(this);
    console.log(this.$Countly);
    this.$Countly.q.push(['add_event', {
      "key": "process",
      "count": 1,
      "sum": 1,
      "dur": 1,
      "segmentation": {
        "idprocess": this.id,
        "nationality": "italian",
        "language": this.$userLang
      }
    }]);
    this.full_process = this.processes.filter((process) =>{
      return process.id == this.processid
    })[0]
    console.log("i am full process")
    console.log(this.full_process)
    this.the_process = this.full_process.process
    // TODO
    this.fetchGraph({ id: this.processid, userLang: this.$userLang })
      .then(graph => {
        console.log(graph)
        const elementFlow = graph
        console.log("i am element flow")
        console.log(elementFlow)
        this.mermaid = elementFlow
        this.$store.commit("flows/setNodePanelVisible", "hidden");


        return this.the_process
      })
      this.fetchDocumentType()
      console.log("I AM DOCUMENT TYPES")
      console.log(this.document_types)
    await this.fetchComments()
    await this.fetchCommentsByProcess(this.processid)
    console.log(this.process_comments)
    console.log(this.comments)
    console.log("BEFORE FOREACH")
    this.process_comments.forEach((comment) =>{
      console.log("INSIDE FOREACH")
      console.log(comment)
      for(var i = 0; i < this.comments.length; i++){
        console.log("INSIDE FOR")
        if(comment.idcomment == this.comments[i].id){
          console.log("INSIDE IF")
          this.selected_process_comments.push(this.comments[i])
        }
      }
      
    })
    console.log("these are the comments")
    console.log(this.selected_process_comments)
    await this.fetchTopic({ defaultLang: this.$defaultLang, userLang: this.$userLang })  
    await this.fetchUserType({ defaultLang: this.$defaultLang, userLang: this.$userLang })
    .then(user_types =>{
      console.log("in user type")
      console.log(user_types)
    })
    this.fetchDocuments()
    console.log("I AM LOGGED")
    console.log(this.$auth.loggedIn())
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
canvas {
  margin-left: -300px;
  background-color: blue;
}
g.label {
  font-size: 10px;
}
#scroll{
  height: 210px
}
#header{
  font-weight: 600;
  font-size: 16px; 
  padding-left:30px
}
.button{
  width:130px; 
  margin-top:20px
}
.button-div{
  padding-top:0px; 
  padding-bottom:0px;
}
.image{
  max-height: 40px; 
  max-width: 40px;
  margin-right:5px
}
.title{
  margin-bottom:5px
}


</style>
