<template>
<div :class="row">
  <div :class="title_col">
       {{ this.Title }} 
  </div>
  <div :class="icon_col" :style="icon_style" >
    <q-icon @click.stop="readClick(text)" :id="this.text" name="img:statics/icons/Icon-Auto_Read_(selected).svg" size="xsm"  />
  </div>
</div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
    }
  },
  props: ["Title", "text", 'row', 'title_col', 'icon_col', 'icon_style'],
  methods: {
   readClick(value) {
     var voice= ""
     switch(this.$userLang) {
  case 'nl':
    voice= "Dutch Female"
    break;
  case 'it':
    voice= "Italian Female"
    break;
  case 'es':
    voice= "Spanish Female"
    break;
  case 'de':
    voice= "Deutsch Female"
    break;
  default:
    voice= "UK English Female"
}
     if(responsiveVoice.isPlaying()){
       responsiveVoice.cancel()
     }
     else{
      console.log("speaking")
        responsiveVoice.speak(value, voice)
     }
  },
  }
}
</script>
