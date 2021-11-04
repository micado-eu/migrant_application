<template>
        <div
          class="q-gutter-sm col box"
          :style="boxstile"
        >
          <TalkingLabel
            style="width:95%;margin-left: 0px; margin-top: 0px; margin-right:0px"
            :text="contentName"
            :row="'row'"
            :title_col="' ellipsis col-10'"
            :icon_col="'col-2'"
            :icon_style="'text-align:right'"
          />
          <q-icon
            :name="contentIcon"
            style="margin-left: 0px; width: 27px; height: 27px"
          />
          <div class="topic_names" style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">
            {{ contentName }}
          </div>
        </div>
</template>

<script>
const TalkingLabel = () => import('components/TalkingLabel')

export default {

  // name: 'ComponentName',
  props: ['contentName', 'contentIcon', 'boxstile'],
  data () {
    return {}
  },
  components:{
    TalkingLabel
  }
}
</script>
<style scoped>
.topic_names {
  color: #5c81a2;
  margin-left: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  font-weight: 600;
font-size: 12px;
line-height: 16px;
padding-left: 5px;
padding-right: 5px;
}
.box{
  text-align: center;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #fafafa;
  height: 100px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  border: 0.5px solid #FF7C44;
}

</style>