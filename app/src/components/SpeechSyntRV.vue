<template>
  <q-btn :color="color" :disable="!enabled" @click="speak" flat >
    <q-icon left size="1em" name="hearing" />
    <div>{{text}}</div>
  </q-btn>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['text', 'lang', 'rate', 'pitch', 'settings', 'classes', 'styles'],
  data () {
    return {
      color: "primary",
      enabled: false,
      voice: {
        name: ""
      }
    }
  },
  created (){
    console.log("in created")
     console.log(this.lang)
    this.initialize()
  },
  
  methods: {
    loadVoices(){
      var voices = window.responsiveVoice.getVoices()
      console.log(voices)
      //console.log(this.lang)
      let searchedLang = this.lang
      this.voice = voices.filter(function(voice){return voice.name == searchedLang;})[0]
      //console.log(voices.filter(function(voice){return voice.name == searchedLang;})[0])
      //console.log(this.voice)
      if(this.voice != null){
        console.log("the voice for required lang exists")
      }else{
        console.log("we fallback on english")
        this.voice = voices.filter(function(voice){return voice.name == "UK English Male";})[0]
        console.log(this.voice)
        //if(this.voice == 'undefined'){
          //this.color = "negative"
          //this.enabled = false

        //}
      }

    },
    initialize(){
      if("responsiveVoice" in window){
        console.log("supported")
        this.enabled = true
        this.loadVoices()
        var self = this
        window.responsiveVoice.onvoiceschanged = function(e) {
          console.log(e)
          console.log("onvoiceschanged")

          self.loadVoices()
        }
      }else{
        console.log("not supported")
        console.log(window)
        this.color = "negative"
      }
    },

    speak(){
      console.log("speaking")
      let msg = this.text
      //console.log(msg)
      //console.log(this.lang)
      responsiveVoice.speak(msg, this.voice.name)
    }
  }
}
</script>
