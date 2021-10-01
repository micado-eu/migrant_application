<template>
<div class = "row">
  <q-item style="width:90%" :class="this.completed ? 'completed' : 'not_completed' "  clickable @click="goToPlan()">
    <div class="row" style="width:100%">
      <h5  class="col-9 header">
        {{this.plan}}
      </h5>
      <h5 class="col-3 progress">
        <q-circular-progress
                show-value
                class="q-ma-md"
                :value="completion"
                size="50px"
                track-color="grey-3"
                color="orange"
              >
              {{this.completion}}%
        </q-circular-progress>
      </h5>
    </div>
  </q-item>
      <slot style="width:10%"></slot>

</div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['plan','planid', 'completion', 'completed'],
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
  margin-bottom:10px;
  
}
.header{
  margin: auto;
  margin-top:25px;
  margin-bottom:0px;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  color: #0F3A5D;

}
.progress{
  text-align: right;
  padding-right:10px;
  margin-top: 0px;
  margin-bottom:0px;
    margin: auto;

}
.not_completed{
  background-color: white;
  color:#0F3A5D;
  border: 1px solid #0F3A5D;
  border-radius: 5px;
  margin-bottom:10px;

}
.completed{
  background-color: #0F3A5D;
  color:white;
  border: 1px solid #0F3A5D;
  border-radius: 5px;
  margin-bottom:10px;

}
</style>
