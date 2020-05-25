<template>

  <div>
    <p style="width:320px; margin: 0 auto;padding-top:25px; font-size:18px;font-weight:bold;padding-left:10px">{{the_document.title}}</p>
  <div class="q-pa-md" style="padding-top:5px; padding-left:0px; padding-right:0px">
    <div style="width:320px;margin:0 auto">
     
      <img style="width:320px" alt="Powered by Micado" :src="the_document.image" />
     <div class="q-pa-lg" style="width:320px; margin: 0 auto;padding-left:10px; padding-top:0px; padding-bottom:0px">
  <q-btn  color="accent" rounded icon-right="send" />
  <q-btn  color="info" rounded icon-right="edit" :to="'edit/' + this.id" />
   </div>
    </div>
  </div>
    <div class="q-pa-lg" style="width:320px; margin: 0 auto;padding-left:10px">
      
    <p style="font-size:24px; font-weight:bold">Document type:</p>
    <p>{{the_document.type}}</p>
    <p style="font-size:24px; font-weight:bold">Document issuer:</p>
    <p>{{the_document.emitter}}</p>
    <p style="font-size:24px; font-weight:bold">Reviewed by:</p>
    <p>{{the_document.emitter}}</p>
    <p style="font-size:24px; font-weight:bold">Review date:</p>
    <p>{{the_document.expire_date}}</p>
  
    
    <q-btn  rounded no-caps color="accent" style="width:100px;margin-right:15px" label="Download" />
    <q-btn  rounded no-caps style="width:100px;margin-right:15px" filled color="info" to="/documents" label="Back" />
    
   
    
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
