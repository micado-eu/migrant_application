<template>
<div  class="q-pa-sm q-gutter-sm">
  <q-btn
    @click="toggleAssistant()"
    :color="color"
    size="15px"
  >
    <q-avatar size="30px" style="color:#4D4D4D">
      <q-icon name="mic"/>
      <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
        >

        </q-tooltip>
    </q-avatar>
    <SpeechComp @spoken="parseText" ref="spc"/>

  </q-btn>
</div>
</template>

<script>
import SpeechComp from 'components/SpeechComp.vue'


export default {
  // name: 'ComponentName',
  data () {
    return {
      isAssistantActive: false,
      color: "white"
    }
  },
  components: {
    SpeechComp
  },
  methods: {
    stopRecognition(){
       if(this.isAssistantActive){
        console.log("speechcomp is active")
        this.$refs.spc.abort()
        this.isAssistantActive = false
      }
    },
    parseText(value){
      console.log("I AM UTTERET TEXT")
      console.log(value)
      this.$emit('speak', value)
    },
    toggleAssistant(){
      
      if(!this.isAssistantActive){
        console.log("speechcomp is active")
        console.log(this)
        this.color = "red"
        this.$refs.spc.start()
        this.isAssistantActive = true
      }else{
        console.log("speechcomp is paused")
        console.log(this)
        this.color = "white"
        this.$refs.spc.pause()
        this.isAssistantActive = false

      }
    }
  }
}
</script>
