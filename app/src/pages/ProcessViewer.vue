  <template>
  <div class="container">
    <h5> {{this.the_process}} </h5>
    <div class="row">
      <div class="col">
        <q-scroll-area
          horizontal
          style="height: 210px;"
          class="bg-grey-1"
        >
          <vue-mermaid
            :nodes="mermaid"
            type="graph LR"
            :config="merconf"
            v-on:nodeClick="editNodeMer"
          ></vue-mermaid>
        </q-scroll-area>
      </div>
    </div>
    <q-card
      :class="nodePanelVisible"
      header="Details of the step"
    >
      <!--          <q-field color="purple-12" label="Location" stack-label>
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{flowData.location}}</div>
            </template>
          </q-field>
          -->
      <LabelMap :label="flowData.location" />
      <q-field
        color="purple-12"
        label="Cost for the step"
        stack-label
      >
        <template v-slot:prepend>
          <q-icon name="euro_symbol" />
        </template>
        <template v-slot:control>
          <div
            class="self-center full-width no-outline"
            tabindex="0"
          >{{flowData.stepCost}}</div>
        </template>
      </q-field>
      <q-list>
        <q-item-label header>Required documents</q-item-label>
        <DocumentItem
          v-for="doc in documents"
          :theDoc="doc"
          :key="doc.id"
        >
        </DocumentItem>
      </q-list>
    </q-card>
    <div
      class="q-pa-md q-gutter-sm  col"
      style="padding-top:0px; padding-bottom:0px;"
    >
      <q-btn
        size="12px"
        no-caps
        style="width:130px;"
        rounded
        color="info"
        label="Back"
        to="/processes"
      />
    </div>
  </div>
</template>


<script>
import ListItem from 'components/ListItem'
import DocumentItem from 'components/DocumentItem'
import LabelMap from 'components/LabelMap'


export default {
  name: 'ProcessViewer',
  props: {
    msg: String
  },
  components: {
    DocumentItem, LabelMap
  },
  data () {
    return {
      details: false,
      id: this.$route.params.id,
      merconf: { theme: "default", startOnLoad: false, securityLevel: 'loose', useMaxWidth: false, fontSize: 9 },
      mermaid: [],
      the_process: this.$route.params.title

    }
  },
  computed: {
    processes () {
      return this.$store.state.flows.flows
    },
    flowData () {
      return this.$store.state.flows.flowdata
    },
    documents () {
      return this.$store.state.flows.documents
    },
    nodePanelVisible () {
      return this.$store.state.flows.nodePanelVisible
    },
  },
  methods: {
    preConfig (cytoscape) {
      console.log("calling pre-config");

      // register edgehandles extension
      //if (typeof cytoscape('core', 'edgehandles') !== 'function') {
      //cytoscape.use(edgeHandles)
      //}
    },

    editNodeMer (nodeId) {
      console.log(nodeId);
      const arr1 = this.mermaid.filter(d => d.id == nodeId);
      console.log(arr1[0].data);
      this.$store.commit("flows/setNodePanelVisible", "");
      this.$store.commit("flows/setDocuments", arr1[0].data.documents);
      this.$store.commit("flows/setFlowData", arr1[0].data);
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

    afterCreated (cy) {
      // cy: this is the cytoscape instance

      console.log("after created", cy);
      this.cy = cy;
      console.log(this.testdata)
      //this.cy.edgehandles();
      cy.layout({ name: 'grid' }).run();

      cy.resize();
      //cy.center()
      //console.log("i'm here")

    },
  },

  mounted () {

  },

  created () {
    this.loading = true
    console.log(this.$store);

    // TODO
    this.$store.dispatch('flows/fetchGraph', { id: this.id, userLang: this.$userLang })
      .then(graph => {
        /*
         var my_process = this.processes.filter((filt) => {
        console.log(filt)
          return filt.id == this.id
        })
        console.log(my_process[0])
      this.the_process = my_process[0].title
       console.log("opened accordion")
      console.log(this.id)
      const element = this.processes.filter(f => f.id == this.id);
      */
        console.log(graph)
        const elementFlow = graph
        console.log(elementFlow)
        this.mermaid = elementFlow
        this.$store.commit("flows/setNodePanelVisible", "hidden");

        return this.the_process
        //       this.loading = false
      })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  margin-left: -300px;
  background-color: blue;
}
</style>
