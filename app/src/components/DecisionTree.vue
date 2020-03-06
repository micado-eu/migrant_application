<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered padding class="rounded-borders">
      <q-item clickable v-ripple @click="chooseOption($event)" v-for="decision in filteredDecisions" :key="decision.name" 
                    :id="decision.id">
          {{decision.name}} 
      </q-item>
 </q-list>
  <q-btn  color="white" text-color="black" @click="back()" label="Back" />
  </div>
</template>

<script>
export default {
// name: 'ComponentName',
 //props: ['theDecision'],

  data () {
    return {
      initial: ["integration", "health"],
      parentId: " ", 
      parentName: " "
      }
  }, 

  computed: {
    decisions () {
      return this.$store.state.decisions.decisions
    },

    filteredDecisions(){
      //console.log(this.decisions)
      //console.log(this.initial)
      return this.decisions.filter(function(filt) {
        //console.log("in filter")
        //console.log(filt)
        //console.log(this)
        //console.log(this.includes(filt.id))
      return this.includes(filt.id);},this.initial)
    }
  },

  methods: {
    back() {
      if(this.parentId == "integration" || this.parentId == "health"){
        this.initial = ["integration", "health"]
        this.parentId = " "
        this.parentName = "What do you need?"
        this.$emit('option', this.parentName )
        console.log(this.parentName )
        //console.log(this.parentId)
          }
      else if(this.parentId == " "){
        //console.log(this.parentId)
          }
      else {
        for(let i = 0; i< this.decisions.length; i++){
          if(this.decisions[i].children.includes(this.parentId)){
            this.parentName = this.decisions[i].name
            this.$emit('option', this.parentName )
            console.log(this.parentName )
            this.initial = this.decisions[i].children
            //console.log(this.initial)
            this.parentId = this.decisions[i].id
            //console.log(this.parentId)
            break;
                }
              }
            }
      }, 
      
    chooseOption (event) {
        let targetId = event.currentTarget.id
        for(let i= 0; i< this.filteredDecisions.length; i++) {
          if(targetId == this.filteredDecisions[i].id) {
            if(this.filteredDecisions[i].children == null){
               //console.log("the end")
             }
            else{
             this.parentName = this.filteredDecisions[i].name
             this.$emit('option', this.filteredDecisions[i].name)
             console.log(this.filteredDecisions[i].name)
             this.initial = this.filteredDecisions[i].children
             //console.log(this.initial)
             this.parentId = targetId
             //console.log(this.parentId)
             
             }
           }
         }
        }
    } 
}

    
            

          
          
        
    



</script>