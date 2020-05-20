  <template>
  <div class="container" >
   <div >
   <div class="col" style="display:inline-block;text-align:left;width:600px">
   <h5> {{this.the_process}} </h5>
  </div>
  
  </div>
    <div >
    <q-card style=" height:300px" class="my-card">
      <q-card-section>
<cytoscape ref="cyRef" :config="configcy" :preConfig="preConfig" :afterCreated="afterCreated">
          <cy-element
            v-for="def in testdata"
            :key="`${def.data.id}`"
            :definition="def"
            v-on:mousedown="showStep($event, def)"
          />

        </cytoscape>  
            </q-card-section>
    </q-card>
    <div style="text-align:center; padding-top:40px;" v-if="this.details">
  <div class=" q-pa-lg" style="display:inline-block; width:750px;border-width:2px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px">
    <div class=" q-pa-xsm row" style="text-align:center">
      
        <h5 style="display:inline-block"> {{this.step.data.title}} </h5>
      
      </div>
      
    
   
    
    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step location </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
       {{this.step.data.location}}
      </div>
    </div>

    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step cost </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        {{this.step.data.cost}}
      </div>
    </div>

    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Required documents </h5>
      </div>
      <div class=" q-pa-md col-8">
     {{this.step.data.required_documents}}
      </div>
      </div>
      
       <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Linked processes </h5>
      </div>
      <div class=" q-pa-md col-8">
     {{this.step.data.linked_processes}}
      </div>
      </div>

      

    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step description </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
       {{this.step.data.description}}
      </div>
    </div>


   
    
    
   
  </div>
 
</div>
    </div>
  </div>
</template>


<script>
import configcy from '../configs/cytoscapeConfig'

console.log(configcy);
export default {
  name: 'Processes',
  props: {
    msg: String
  },
  components: {
   
  },
  data () {
    return {
      details:false,
     id:this.$route.params.id,
      configcy,
       testdata:[],
       step:{ 
         data:{
        title:"",
        location:"",
        cost:"",
        required_documents:[],
        linked_processes:[],
        description:"", 
        process_id:[]
        },
        group:"", 
        position:{}
      }, 
      the_process:""
   
    }
  },
  computed: {
   graphs() {
      return this.$store.state.graphs.graphs
    },
    processes () {
      return this.$store.state.flows.flows
    },
    my_process(){
     
    }
  },
  methods: {
     preConfig(cytoscape) {
    console.log("calling pre-config");

    // register edgehandles extension
    //if (typeof cytoscape('core', 'edgehandles') !== 'function') {
      //cytoscape.use(edgeHandles)
    //}
     },
    showStep(event, node) {
      console.log(node)
      if(node.group == "nodes"){
      console.log("editing")
      this.details = true
      
    
      console.log("I'm old")
     
      this.step =  JSON.parse(JSON.stringify(node))
     console.log(this.step)

    
    
    }
    },
   
    afterCreated(cy) {
      // cy: this is the cytoscape instance
      
      console.log("after created", cy);
      this.cy = cy;
      console.log(this.testdata)
       //this.cy.edgehandles();
       //cy.layout({ name: 'cose' }).run();
       
      cy.resize();
      //cy.center()
      //console.log("i'm here")
      
    },
  },

  mounted() {
   
  },

  created () {
      this.loading = true
    console.log(this.$store);
    this.$store.dispatch('flows/fetchFlows')
      .then(processes => {
         var my_process = this.processes.filter((filt) => {
        console.log(filt)
          return filt.id == this.id
        })
        console.log(my_process[0])
      this.the_process = my_process[0].title
      return this.the_process
        this.loading = false
      })  
     console.log(this.$store);
    this.$store.dispatch('graphs/fetchGraphs')
      .then(graphs => {
          var filteredGraphs =  this.graphs.filter((filt) => {
          //console.log("in fil")
          //console.log(filt)
          //console.log(typeof(this.id))
         //console.log(filt.process_id)
          return filt.graph_process == this.id
        })  
        console.log(filteredGraphs)
        var my_graph = filteredGraphs[0]
        if(my_graph != null){
        this.graph_id = my_graph.id_graph
      
        console.log("this is the graph id" + this.graph_id)
        console.log(my_graph)
        for(var i = 0; i < my_graph.elements.length;i++){
         this.testdata.push(my_graph.elements[i])
      }
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
