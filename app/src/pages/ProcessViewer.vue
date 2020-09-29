  <template>
  <div class="container">
    <h5> {{this.the_process}} </h5>
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
          >
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
      comments: 'comments/comments'
    }, actions: {
      fetchGraph: 'flows/fetchGraph',
      fetchCommentsByProcess: 'comments/fetchCommentsByProcess',
      fetchComments: 'comments/fetchComments'
    }
  })
  ],
  props:['processid'],
  components: {
    DocumentItem, LabelMap,CommentList
  },
  data () {
    return {
      details: false,
      id: this.$route.params.id,
      merconf: { theme: "default", startOnLoad: false, securityLevel: 'loose', useMaxWidth: false, flowchart: { padding: 5 } },
      mermaid: [],
      the_process: null,
      selected_process_comments:[]
    }
  },
  methods: {
    editNodeMer (nodeId) {
      console.log(nodeId);
      const arr1 = this.mermaid.filter(d => d.id == nodeId);
      console.log("I am flow data")
      console.log(arr1[0].data);
      this.$store.commit("flows/setNodePanelVisible", "");
      this.$store.commit("flows/setDocuments", arr1[0].data.documents);
      this.$store.commit("flows/setFlowData", arr1[0].data);
      this.$store.commit("flows/setShellData", arr1[0]);
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
    this.the_process = this.processes.filter((process) =>{
      return process.id == this.processid
    })[0].process
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


</style>
