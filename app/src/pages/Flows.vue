<template>
  <q-page class="flows container-fluid">
    <!-- <div class="flows container-fluid"> -->
    <div class="row">
      <div class="col">
        <q-scroll-area
          horizontal
          style="height: 210px;"
          class="bg-grey-1"
        >
          <vue-mermaid
            :nodes="mermaid"
            type="graph TD"
            :config="merconf"
            v-on:nodeClick="editNodeMer"
          ></vue-mermaid>
        </q-scroll-area>
      </div>
    </div>
    <div class="row">

      <div class="col">
        <span v-if="loading">Loading…</span>

        <q-list
          bordered
          v-else
        >
          <q-expansion-item
            v-for="flow in flows"
            group="somegroup"
            :label="flow.title"
            header-class="text-accent"
            :key="flow.id"
            @show="showFlow(flow.id)"
          >
            <q-card>

              <q-card-section>
                {{ flow.text }}

              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>

      </div>
      <div class="col">
        <!--      <cytoscape ref="flow_cyt" :config="configcy" v-on:mousedown="addNode" v-on:cxttapstart="updateNode" :preConfig="preConfig" :afterCreated="afterCreated">
          <cy-element
            v-for="def in flowData"
            :key="`${def.data.id}`"
            :definition="def"
            v-on:mousedown="deleteNode($event, def)"
          />

        </cytoscape>
        -->
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
      </div>
    </div>
  </q-page>
</template>

<script>
import { Core, EventObject } from 'cytoscape'
//import Cytoscape from '@/components/Cytoscape'
//import CyElement from '@/components/CyElement'
import configcy from '../configs/cytoscapeConfig'
//import configcy from "./config-cy";
import DocumentItem from 'components/DocumentItem'
import LabelMap from 'components/LabelMap'

console.log(configcy);
export default {
  name: 'Flows',
  props: {
    msg: String
  },
  components: {
    DocumentItem, LabelMap
  },
  data () {
    return {
      loading: false,
      elementFlow: {},
      documentsFlow: {},
      mermaid: [
        /*        {
                  id: "a1",
                  text: "A",
                  link: "---",
                  next: ["a2"],
                  editable: true,
                  style: "fill:#f9f,stroke:#333,stroke-width:4px",
                  "data": {"longitude":41, "latitude": 7, "documents":[{"id":1,"type":"adoc"}]}
                },
                { id: "a2", text: "B", edgeType: "circle", editable: true, next: ["a3"] },
                { id: "a3", text: "C", next: ["a4", "a6"] },
                { id: "a4", text: "D", link: "-- This is the text ---", next: ["a5"] },
                { id: "a5", text: "E" },
                { id: "a6", text: "F" }
                */
      ],
      merconf: { theme: "default", startOnLoad: false, securityLevel: 'loose', useMaxWidth: false, fontSize: 9 },
      workingcy: null,
      //    configcyt,
      configcy,
      elements: [
        {
          data: { id: "a" },
          position: { x: 589, y: 182 },
          group: "nodes"
        },
        {
          data: { id: "b" },
          position: { x: 689, y: 282 },
          group: "nodes"
        },
        {
          data: { id: "c" },
          position: { x: 489, y: 282 },
          group: "nodes"
        },
        {
          data: { id: "ab", source: "a", target: "b" },
          group: "edges"
        }
      ]
    }
  },
  computed: {
    flows () {
      return this.$store.state.flows.flows
    },
    flowData () {
      return this.$store.state.flows.flowdata
    },
    longitude () {
      return this.$store.state.flows.longitude
    },
    longitude () {
      return this.$store.state.flows.longitude
    },
    nodePanelVisible () {
      return this.$store.state.flows.nodePanelVisible
    },
    documents () {
      return this.$store.state.flows.documents
    }
  },
  methods: {
    showFlow (id) {
      console.log("opened accordion")
      console.log(id)
      const element = this.flows.filter(f => f.id == id);
      console.log(element)
      const elementFlow = element[0].mermaid
      console.log(elementFlow)
      this.mermaid = elementFlow
      this.$store.commit("flows/setNodePanelVisible", "hidden");

    },
    //    configcy(){
    //      console.log("checking the value of the json file");
    //      console.log(configcy);
    //      return configcy;
    //    },
    editNodeMer (nodeId) {
      console.log(nodeId);
      const arr1 = this.mermaid.filter(d => d.id == nodeId);
      console.log(arr1[0].data);
      this.$store.commit("flows/setNodePanelVisible", "");
      this.$store.commit("flows/setDocuments", arr1[0].data.documents);
      this.$store.commit("flows/setFlowData", arr1[0].data);
    },
    addNode (event) {
      console.log(event.target);
      //    if (event.target === this.$refs.cyRef.instance)
      console.log("adding node", event.target);
    },
    deleteNode (event, node) {
      console.log("node clicked", node);
      if (node.group === 'nodes') {
        console.log(node.data.id);
        console.log(node.data.data.longitude);
        this.$store.commit("flows/setNodePanelVisible", "");

        this.$store.commit("flows/setDocuments", node.data.data.documents);

      }

    },
    updateNode (event) {
      console.log("right click node", event);
    },
    preConfig (cytoscape) {
      //console.log(config);

      //console.log(this.configCyto);
      //    console.log(this.configcyt);
      //    console.log(configcyt);
      console.log("calling pre-config", cytoscape);
    },
    afterCreated (cy) {
      // cy: this is the cytoscape instance
      console.log("after created", cy);
      cy.resize();
    }
  },

  mounted () {
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      if (isJustShown) {
        console.log('collapseId:', collapseId)
        console.log('isJustShown:', isJustShown)
        const cytElement = this.$refs.flow_cyt
        //      const id = collapseId
        var id = collapseId.replace('accordion-', '');
        //      console.log(cytElement);
        console.log(cytElement.instance);
        var mycy = cytElement.instance
        //      mycy.remove(this.flowData);
        console.log(this.flows[id].graph);
        //  console.log();

        //      cytElement.instance.elements = null;
        //  this.$store.commit("flows/setFlowData", {});
        cytElement.instance.elements().remove();
        this.$store.commit("flows/setFlowData", this.flows[id].graph);
        var layout = cytElement.instance.layout({ name: 'breadthfirst', fit: true, avoidOverlap: true, condense: false, padding: 30, avoidOverlapPadding: 10 });
        layout.run();
        //            cytElement.instance.fit();
        cytElement.instance.center();
        //          cytElement.instance.json(this.flows[id].graph);
        //      cytElement.instance.remove(this.elements);
        //      cytElement.instance.add(this.flows[1].graph);

        //    cytElement[0].instance.data = ;
        //        cytElement.instance.resize();
        //      ((cytElement as Cytoscape).instance).resize()
        //    console.log((this.$refs.cyt1 as Cytoscape))
        //      this.workingcy.resize();
      }

    })
  },

  created () {
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('flows/fetchFlows')
      .then(flows => {
        this.loading = false
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
