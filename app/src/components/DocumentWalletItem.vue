<template>
  <div>
    <q-item
    class="item"
    clickable
    @click="viewDoc">
   <q-item-section class="col-2 section">
        <img 
        class="image"
        :src="this.Image">
    </q-item-section>
      <div class="col-10 div-1">
      <div class="row div-2">
          <q-item-section class="col section-2">
          {{ this.Title }}
          </q-item-section>
    </div>
    <div>
    <q-icon class="icon" name="img:statics/icons/Edit.png" size="md" @click.stop="editing" />
    <q-icon class="icon" name="img:statics/icons/Send.png" size="md" @click.stop="show = true"/>
    <q-icon :id="this.Link" name="img:statics/icons/Icon - Delete.svg" @click.stop="deleteDocument($event)" size="md" />
    </div>
    </div>
     <q-dialog
     @hide="clean()"
     v-model="show">
       <q-card class="q-pa-md">
       <h5 class="header">{{$t('desc_labels.send_doc')}} </h5>
      <q-input dense standout outlined :label="$t('input_labels.email')" v-model="email"/>
         <q-btn
        size="12px"
        no-caps
        class="button"
        rounded
        color="info"
        :label="$t('button.send')"
        @click="sendDoc()"
      />
       </q-card>
     </q-dialog>
    </q-item>
    <hr class="hr">

    </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["Title", "Image", "Link", "theDocument"],
  data () {
    return {
      show:false,
      email:""
    }
  },
  methods:{
    editing(){
      console.log("prima di mandare i process")
      console.log(this.theDocument)
      this.$router.push({ name: 'editdocument', params: { thedocid: this.Link} })
    },
    deleteDocument(){
      console.log("in delete document event")
      this.$emit('delete', event.currentTarget.id)
    },
    viewDoc(){
      this.$router.push({ name: 'viewdocument', params: { thedocid: this.Link } })
    },
    clean(){
      this.email = ""
    },
    sendDoc(){
      this.$emit('sendDoc', {docid:this.Link, email:this.email})
      this.show=false
    }

  }
}
</script>
<style scoped>
#title {
   font-size: 16pt;
   font-weight: bold;
}
.header{
  margin-top:5px;
  margin-bottom:20px
}
.item{
  padding-top:0px;
  padding-right:0px
}
.section{
  width:96px;
  height:64px
}
.image{
  width:64px;
  height:64px;
  margin-top:20px
}
.div-1{
  height:64px
}
.div-2{
  height:32px;
  vertical-align:text-top
}
.section-2{
  font-size:15px; 
  font-weight:600;
}
.icon{
  margin-right:10px;
}
.hr{
  border: 1px solid #E8E8E8
}
.button{
  margin-top:10px
}
</style>