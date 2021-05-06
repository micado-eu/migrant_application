<template>
<div  class="q-pa-sm q-gutter-sm">
  <q-btn
    @click="toggleAssistant()"
    :style="color"
    dense
    round
    flat
    size="15px"
  >
    <q-avatar size="30px" >
      <q-icon :name="'img:statics/icons/Icon - Microphone.svg'"/>
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
        this.color = "background-color:red"
        this.$refs.spc.start()
        this.isAssistantActive = true
      }else{
        console.log("speechcomp is paused")
        console.log(this)
        this.color = "background-color:white"
        this.$refs.spc.pause()
        this.isAssistantActive = false

      }
    }
  }
}
</script>
