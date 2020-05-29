<template>
<div class="" style=" border-width:3px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin: 0 auto; width:750px; padding-left:20px; padding-right:20px; margin-top:25px; padding-bottom:10px">
    <div class="  row" style="text-align:center">
      <div class="col-4">
        <h5 style="text-align:left;margin-bottom:0px"> Document type </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px">
        <q-input dense rounded standout outlined :value="the_document.type"  />
      </div>
    </div>
    <div class="row" style="text-align:center">
      <div class=" col-4">
        <h5 style="text-align:left"> Document issuer </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input dense rounded standout outlined :value="the_document.emitter"  />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Document icon </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
         <q-uploader
        url="http://localhost:8080/upload"
        label="Batch upload"
        multiple
        batch
        color="accent"
        style="max-width: 500px"
      />
  </div>
  </div>
  <div class="" style="text-align:center; padding-top:20px">
    
    <q-btn  no-caps rounded style="width:100px;margin-right:20px" filled color="accent"  label="Save" />


    <q-btn  no-caps rounded color="info" style="width:100px;" to="/documents" label="Back" />

  </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      id: this.$route.params.id,
      edit: {
        type:"",
        emitter: "",
        image:""
      }
    }
  }, methods: {
    getFiles() {

    }
  },
   computed:{
     documents() {
      return this.$store.state.documents.documents
    }, 
    the_document(){
      if(this.id != null){
        for(var i = 0; i< this.documents.length; i++){
          if(this.documents[i].id == this.id){
            console.log("id documento" + this.documents[i].id)
            console.log(this.documents[i])
            console.log("id route" + this.id)
            return this.documents[i]
          }
        }
      }
      else{
        return this.edit
      }
    }
    
   },
  created () {
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('documents/fetchDocuments')
      .then(documents => {
        console.log(documents)
        this.loading = false
      })
  },
}
</script>
