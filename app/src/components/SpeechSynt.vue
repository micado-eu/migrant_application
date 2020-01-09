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
      voice: {}
    }
  },
  created (){
    console.log("in created")
    this.initialize()
  },
  methods: {
    loadVoices(){
      var voices = window.speechSynthesis.getVoices()
      console.log(voices)
      let searchedlang = this.lang
      this.voice = voices.filter(function(voice){return voice.lang == searchedlang;})[0]
      console.log(this.voice)
      if(this.voice){
        console.log("the voice for required lang exists")
      }else{
        console.log("we fallback on english")
        this.voice = voices.filter(function(voice){return voice.lang == "en-US";})[0]
        console.log(this.voice)
        if(this.voice == 'undefined'){
          this.color = "negative"
          this.enabled = false

        }
      }

    },
    initialize(){
      if("speechSynthesis" in window){
        console.log("supported")
        this.enabled = true
        this.loadVoices()
        var self = this
        window.speechSynthesis.onvoiceschanged = function(e) {
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
      var msg = new SpeechSynthesisUtterance()

      msg.text = this.text
      msg.voice = this.voice
      window.speechSynthesis.speak(msg)
    }
  }
}
</script>
