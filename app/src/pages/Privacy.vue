<template>
<div>   
    <div class="q-pa-md">

    <TalkingLabel
                  :showing="'font-weight: bold;font-size: 16px;line-height: 16px;color: #0F3A5D;'"
                  :Title="$t('privacy.privacy')"
                  :text="$t('privacy.privacy')"
                  :row="'row'"
                  :title_col="'col-11'"
                  :icon_col="'col-1'"
                  :icon_style="'text-align:right'"
                />
    </div>
       <div class="q-pa-md">

    <TalkingLabel
                  :showing="'font-weight: normal;font-size: 14px;line-height: 16px;color: #000000;'"
                  :Title="mixed_settings.filter(set => set.key == 'policy')[0].value"
                  :text="mixed_settings.filter(set => set.key == 'policy')[0].value"
                  :row="'row'"
                  :title_col="'col-11'"
                  :icon_col="'col-1'"
                  :icon_style="'text-align:right'"
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
