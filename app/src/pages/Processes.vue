  <template>
  <div>
   <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
    <div class="q-gutter-md  col justify-center items-center" >
   <q-input items-center filled v-model="search" label="Search" />
  </div>
    <div class="q-gutter-md  col justify-center items-center">
     <q-select
        filled
        clearable
        @clear="clearUser"
        v-model="user"
        multiple
        :options="u_tags"
        @input="setUserTag"
        label="User Tags"
        style="width: 250px"
      />
      </div>
      <div class="q-gutter-md  col justify-center items-center">
     <q-select
        filled
        clearable
        @clear="clearTopic"
        v-model="topic"
        multiple
        :options="t_tags"
        @input="setTopicTag"
        label="Topic Tags"
        style="width: 250px"
      />
      </div>
    </div>
  </div>
  
   <div class="q-pa-md" style="max-width: 100%">
  <h4> Guided Processes </h4>
  </div>
    <div class="container">
    <q-list  >
        <ListItem v-for="process in filteredProcesses"
         :key="process.id"
         :Title="process.title"
         :Tag_1="process.topic_tags"
         :Tag_2="process.user_tags"
         :Link="process.id">
        </ListItem>
    </q-list>
    </div>
  </div>
</template>


<script>
import ListItem from 'components/ListItem'
import { Core, EventObject } from 'cytoscape'
//import Cytoscape from '@/components/Cytoscape'
//import CyElement from '@/components/CyElement'
import configcy from '../configs/cytoscapeConfig'
//import configcy from "./config-cy";
import DocumentItem from 'components/DocumentItem'
import LabelMap from 'components/LabelMap'

console.log(configcy);
export default {
  name: 'Processes',
  props: {
    msg: String
  },
  components: {
    DocumentItem, LabelMap, ListItem
  },
  data () {
    return {
      user: null,
      topic: null,
      u_tags: [
        
      ],
      t_tags: [
        
      ],
      selected_u_tags:[],
      selected_t_tags:[],
      search: ' ',
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
      merconf: { theme: "default", startOnLoad: false, securityLevel: 'loose', useMaxWidth: false, fontSize:9 },
      workingcy: null,
  //    configcyt,
  configcy,
      elements:[
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
    processes () {
      return this.$store.state.flows.flows
    },
      filteredProcesses () {
        //if none of the fields is filled in it will give the full list of processes
        if( this.search == "" && this.selected_u_tags.length == 0 && this.selected_t_tags.length == 0) {
          return this.processes
        }
        else if(this.selected_u_tags.lenght != 0 || this.search != "" || this.selected_t_tags.lenght != 0) {
          return this.processes.filter((filt) =>{
          //Splits the search field and puts the words in an array
          var searchArray = this.search.split(" ")
          //console.log(" tag_u boolean " + this.selected_u_tags.every( string => filt.user_tags.includes(string)))
          //console.log("text boolean " + searchArray.every(string => filt.title.toLowerCase().includes(string)))
          if( searchArray.every(string => filt.title.toLowerCase().includes(string)) &&
            this.selected_u_tags.every( item => {
              for(let i = 0; i< filt.user_tags.length; i++){
               if(item.value == filt.user_tags[i].value){
                return item.value == filt.user_tags[i].value
                break;
              }
              }
            } ) &&
            this.selected_t_tags.every( item => {
              for(let i = 0; i< filt.topic_tags.length; i++){
               if(item.value == filt.topic_tags[i].value){
                return item.value == filt.topic_tags[i].value
                break;
              }
              }
            })){
              return true;
            }})
        } 
      },
    flowData(){
      return this.$store.state.flows.flowdata
    },
    longitude(){
      return this.$store.state.flows.longitude
    },
    longitude(){
      return this.$store.state.flows.longitude
    },
    nodePanelVisible(){
      return this.$store.state.flows.nodePanelVisible
    },
    documents() {
      return this.$store.state.flows.documents
    },
    topics() {
      return this.$store.state.topic.topic
    }, 
    users() {
      return this.$store.state.user_type.user_type
    }, 
  },
  methods: {
    setUserTag(value) {
      //the Q-select passe an array of objects, so this takes the value property of the objects and puts them into an array
      if ( value != null){
        this.selected_u_tags = []
        console.log(value)
        for( var i = 0; i < value.length; i++){
          this.selected_u_tags.push(value[i])
        }
        console.log( this.selected_u_tags)
        return this.selected_u_tags
      }
    },
    clearUser() {
      //clears the array and makes possible the refresh of the filter
      this.selected_u_tags = []
      console.log("cleared t-tags")
      console.log(this.selected_u_tags)
      return this.selected_u_tags
    },

    setTopicTag(value) {
      if (value != null){
        this.selected_t_tags = []
        console.log(value)
        for( var i = 0; i < value.length; i++){
          this.selected_t_tags.push(value[i])
        }
        console.log("queste sono le t-tags " + this.selected_t_tags)
        return this.selected_t_tags
      }
    },
    clearTopic() {
      this.selected_t_tags = []
      console.log("cleared t-tags")
      console.log(this.selected_t_tags)
      return this.selected_t_tags
    },
   
    showFlow(id){
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
    editNodeMer(nodeId) {
      console.log(nodeId);
      const arr1 = this.mermaid.filter(d => d.id == nodeId);
      console.log(arr1[0].data);
      this.$store.commit("flows/setNodePanelVisible", "");
      this.$store.commit("flows/setDocuments", arr1[0].data.documents);
      this.$store.commit("flows/setFlowData", arr1[0].data);
    },
    addNode(event) {
      console.log(event.target);
  //    if (event.target === this.$refs.cyRef.instance)
        console.log("adding node", event.target);
    },
    deleteNode(event, node) {
      console.log("node clicked", node);
      if(node.group === 'nodes'){
        console.log(node.data.id);
        console.log(node.data.data.longitude);
        this.$store.commit("flows/setNodePanelVisible", "");

        this.$store.commit("flows/setDocuments", node.data.data.documents);

      }

    },
    updateNode(event) {
      console.log("right click node", event);
    },
    preConfig(cytoscape) {
    //console.log(config);

    //console.log(this.configCyto);
//    console.log(this.configcyt);
//    console.log(configcyt);
      console.log("calling pre-config", cytoscape);
    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance
      console.log("after created", cy);
      cy.resize();
    }
  },

  mounted() {
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      if (isJustShown){
        console.log('collapseId:', collapseId)
        console.log('isJustShown:', isJustShown)
        const cytElement = this.$refs.flow_cyt
  //      const id = collapseId
        var id = collapseId.replace('accordion-','');
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
              var layout = cytElement.instance.layout({name:'breadthfirst', fit: true, avoidOverlap: true, condense: false, padding: 30,avoidOverlapPadding: 10});
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
      .then(processes => {
        this.loading = false
      })
      this.$store.dispatch('topic/fetchTopic')
      .then(topic => {
        console.log(topic)
         for ( var i = 0; i<this.topics.length; i++){
        var the_topic = {label: this.topics[i].topic, value:this.topics[i].id}
        this.t_tags.push(the_topic)
      }
        this.loading = false
      })
      this.$store.dispatch('user_type/fetchUserType')
      .then(user_type => {
        console.log(user_type)
        for ( var j = 0; j<this.users.length; j++){
        var the_user = {label: this.users[j].user_type, value:this.users[j].id}
        this.u_tags.push(the_user)
      }  
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
