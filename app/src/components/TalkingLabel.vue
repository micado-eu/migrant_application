<template>
  <div :class="row" :style="this.container_style">
    <div :class="title_col" :style="this.showing">
      <q-icon
        style="margin-bottom: 5px"
        :size="icon_size"
        v-if="this.icon && !this.is_new"
        :name="this.icon"
      />      
      <q-icon
        style="margin-bottom: 5px"
        :size="icon_size"
        v-else-if="this.icon && this.is_new"
        :name="this.icon_new"
      />
      {{ this.Title }}
    </div>

    <div :class="icon_col" :style="icon_style">
      <q-icon
        v-if="!amISpeaking"
        @click.stop="readClick(text)"
        :id="this.text"
        name="img:statics/icons/Icon - Auto Read  (selected).svg"
        size="xsm"
      />
      <q-icon
        v-else
        @click.stop="readClick(text)"
        :id="this.text"
        name="img:statics/icons/pause.png"
        size="xsm"
      />
    </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data() {
    return {
      amISpeaking: false,
    };
  },
  props: [
    "Title",
    "text",
    "row",
    "title_col",
    "icon_col",
    "icon_style",
    "icon_class",
    "icon",
    "icon_size",
    "showing",
    "container_style",
    "is_new",
    "icon_new"
  ],
  methods: {
    /* readClick(value) {
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
  case 'zh':
    voice = "Chinese Female"
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
  },*/
    readClick(value) {
      console.log("IN NEW TEXT TO SPEECH API");
      var synth = window.speechSynthesis;
      this.amISpeaking = synth.speaking;
      if (this.amISpeaking) {
        console.log("already speaking");
        synth.cancel();
      } else {
        //speechSynthesis.speak(new SpeechSynthesisUtterance(value));
        console.log(synth.getVoices());
        var u = new SpeechSynthesisUtterance();
        u.text = value;
        u.lang = this.$userLang;
        u.rate = 1.0;
        speechSynthesis.speak(u);
        this.amISpeaking = true;
        u.onend = (event) => {
          this.amISpeaking = false;
        };
      }
    },
  },
};
</script>
