<template>
  <div class="q-pa-md">
    <div style="text-align:center">
      <img alt="Powered by Micado" :src="the_document.image" />
    </div>
    <div class="q-pa-lg">
    <p style="font-size:24px; font-weight:bold">Document type:</p>
    <p>{{the_document.type}}</p>
    <p style="font-size:24px; font-weight:bold">Document issuer:</p>
    <p>{{the_document.emitter}}</p>
    <p style="font-size:24px; font-weight:bold">Reviewed by:</p>
    <p>{{the_document.emitter}}</p>
    <p style="font-size:24px; font-weight:bold">Review date:</p>
    <p>{{the_document.expire_date}}</p>
    </div>
    <div class="row q-pa-md">
    <div class="col-2" >
    <q-btn  rounded style="width:100px; height:40px" filled color="accent" to="/documents" label="Back" />
    </div>
    <div class="col-2" >
    <q-btn  rounded color="accent" style="width:100px; height:40px" label="Download" />
    </div>
  </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["Image",],
  data () {
    return {
      id:this.$route.params.id,

    }
  },
   computed:{
     documents() {
      return this.$store.state.documents.documents
    }, 
    the_document(){
        for(var i = 0; i< this.documents.length; i++){
          if(this.documents[i].id == this.id){
            console.log("id documento" + this.documents[i].id)
            console.log(this.documents[i])
            console.log("id route" + this.id)
            return this.documents[i]
          }
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
