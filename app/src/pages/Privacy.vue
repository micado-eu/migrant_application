<template>
<div>   
    <div class="q-pa-md">

    <TalkingLabel
                  :Title="$t('privacy.privacy')"
                  :text="$t('privacy.privacy')"
                  :row="'row'"
                  :title_col="'col-11'"
                  :container_style="'display: flex;'"
                  :icon_style="'flex-shrink:0;text-align:right'"
                  :showing="'flex-grow:1;white-space: nowrap; overflow: hidden;text-overflow: ellipsis; font-weight: bold;font-size: 16px;line-height: 16px;color: #0F3A5D;'"
                />
    </div>
       <div class="q-pa-md">

    <TalkingLabel
                  :Title="privacy"
                  :text="privacy"
                  :row="'row'"
                  :title_col="'col-11'"
                  :container_style="'display: flex;'"
                  :icon_style="'flex-shrink:0;text-align:right'"
                  :showing="'flex-grow:1;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;font-weight: normal;font-size: 14px;line-height: 16px;color: #000000;'"
                />
    </div>
     <div class="q-pa-md q-gutter-sm col" style="text-align:center">
        <q-btn
          size="12px"
          :icon="'img:statics/icons/Icon - go back.svg'"
          no-caps
          class="go_back"
          rounded
          :label="$t('button.go_back')"
          @click="back()"
        />
      </div>
  </div>
</template>

<script>
const TalkingLabel = () => import('components/TalkingLabel')
import storeMappingMixin from "../mixin/storeMappingMixin";

export default {
  name: 'PageIndex',
  components:{
    TalkingLabel
  },
  mixins: [
    storeMappingMixin({
      getters: {
        mixed_settings:"settings/mixed_settings"
      },
      actions: {
        fetchMixedSettings:"settings/fetchMixedSettings"
      },
    })
  ],
  data () {
    return {
      logged: false
    }
  },
  computed:{
    privacy(){
      var info = this.mixed_settings.filter((set) => set.key == 'policy')
      if(info.length >0){
        return info[0].value
      }
      else{
        return 'default text'
      }
    }
  },
  methods:{
    back(){
    this.$router.go(-1);
    },
  },
  created () {
  this.fetchMixedSettings().then(ret=> console.log(ret))
  }
}
</script>
<style scoped>
.pad{
  padding-left:10px;
  padding-right:10px
}
.go_back{
  border: 1px solid #0F3A5D;
  box-sizing: border-box;
  border-radius: 50px;
}
</style>
