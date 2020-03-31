<template>
<div  class="q-pa-sm q-gutter-sm">
  <q-btn
    @click="toggleAssistant()"
    :color="color"
    size="15px"
  >
    <q-avatar size="30px" style="color:#4D4D4D">
      <img src="~assets/bb-micado.png">
      <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
        >

        </q-tooltip>
    </q-avatar>
    <SpeechComp ref="spc"/>

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
    toggleAssistant(){
      this.isAssistantActive = !this.isAssistantActive
      if(this.isAssistantActive){
        console.log("speechcomp is active")
        console.log(this)
        this.color = "red"
        this.$refs.spc.start()
      }else{
        console.log("speechcomp is paused")
        console.log(this)
        this.color = "white"
        this.$refs.spc.pause()

      }
    }
  }
}
</script>
