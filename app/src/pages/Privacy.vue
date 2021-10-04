<template>
  <q-page class="flex flex-center column" style="min-height:0px">
   
    <div style="padding-top:20px; padding-bottom:20px; text-align:center">
      <TalkingLabel
      v-if="mixed_settings.filter(set => set.key == 'policy').length >0"
                  style="width:100%"
                  :Title="mixed_settings.filter(set => set.key == 'policy')[0].value"
                  :text="mixed_settings.filter(set => set.key == 'policy')[0].value"
                />
    <TalkingLabel
      v-else
                  style="width:100%"
                  :Title="$t('privacy.privacy')"
                  :text="$t('privacy.privacy')"
                />
    </div>
  <div style="background-color:#EFEFEF; height:5px; width:100%">
    &nbsp;
  </div>
    <div class="row justify-center full-height full-width text-center">
      <img
        alt="Micado logo"
        :src="this.$paLogo"
        style="width:60%;max-width:320px;height:auto;"
      >

    </div>

    <div class="row justify-center full-height full-width text-center">
      <img
        alt="Powered by Micado"
        src="~assets/MICADO Logo - powered by.svg"
      >
      </div>
      <div class="pad" style="text-align:center" text-caption>
        <TalkingLabel
                  class="option_3"
                  style="width:100%"
                  :Title="$t('privacy.grant')"
                  :text="$t('privacy.grant')"
                />
        </div>
      <img
      style="width:80px; height:53px"
        alt="Funded by EU"
        src="~assets/Flag_of_Europe.png"
      >
    
  </q-page>
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
