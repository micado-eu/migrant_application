<template>

  <q-item
  style="padding-top:0px; padding-bottom:0px;"
  >
    <div style="margin:0 auto">
      <div >
        <div class=" q-pa-md col" style="width:750px; padding-bottom:0px; padding-left:0px;">
          <div style="font-size:20px; text-align:left; font-size:18px">{{ this.Title }}</div>
        </div>
     
    </div>
    <div class=" row" style="width:750px">
        <q-chip dense size="12px" v-for="tag in Tag_1" :label="tag.label" :key="tag.value"></q-chip>
        <q-chip dense size="12px" v-for="tag in Tag_2" :label="tag.label" :key="tag.value"></q-chip>
      <div class="q-pa-md q-gutter-sm  col" style="padding-top:0px; padding-bottom:0px; text-align:right">
      <q-btn size="12px" unelevated no-caps style="width:130px;margin-bottom:2px" rounded color="accent" :id="this.Link" label="Show process" :to="'processes/' + this.Link"  />
      </div>
    </div>
    <hr style="margin:0px">
    </div>
  </q-item>
</template>

<script>
export default {
  name: 'Process',
  props: ["Title",  "Tag_1", "Tag_2", "Link", "Path"], 
  data() {
    return {};
  },

  methods: {
  showProcess(event){
      let target = event.currentTarget.id
      console.log(this.Link)
      this.$emit('showing', this.Link)

    }
  }
}
</script>
<style scoped>
/*div >>> .q-item {
  border-radius: 2rem;

  &:hover {
    color: blue;
  }
}*/
</style>