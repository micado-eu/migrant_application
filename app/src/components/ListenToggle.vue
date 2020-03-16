<template>
  <q-btn
    @click="toggleAssistant()"
    :color="color"
    round
  >
    <q-avatar size="42px">
      <img src="~assets/bb-micado.png">
      <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
        >

        </q-tooltip>
    </q-avatar>
    <SpeechComp ref="spc"/>

  </q-btn>

</template>

<script>
import SpeechComp from 'components/SpeechComp.vue'


export default {
  // name: 'ComponentName',
  data () {
    return {
      isAssistantActive: false,
      color: "primary"
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
        this.color = "primary"
        this.$refs.spc.pause()

      }
    }
  }
}
</script>
