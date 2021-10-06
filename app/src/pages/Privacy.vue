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
</style>
