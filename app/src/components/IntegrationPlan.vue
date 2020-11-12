<template>
  <q-item class="rounded-borders item" rounded clickable @click="goToPlan()">
    <div class="row" style="width:100%">
      <h5  class="col-9 header">
        {{this.plan}}
      </h5>
      <h5 class="col-3 progress">
        <q-circular-progress
                show-value
                class="text-white q-ma-md"
                :value="completion"
                size="50px"
                track-color="grey-3"
                color="orange"
              />
      </h5>
    </div>
  </q-item>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['plan','planid', 'completion'],
  data () {
    return {}
  },
  computed: {
   
  }, 
  methods:{
    goToPlan(){
      console.log("i am sending the id")
      console.log(this.planid)
       this.$router.push({ name: 'plan', params: { theplanid: this.planid } })
    }
  }
}
</script>
<style scoped>
.item{
  background-color: #0F3A5D;
  margin-bottom:10px;
  border-radius: 5px;
  
}
.header{
  color:white;
  margin: auto;
}
.progress{
  text-align: right;
  padding-right:10px
}
</style>
