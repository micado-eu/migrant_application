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
          <SpeechComp ref="spc"/>
        </q-tooltip>
    </q-avatar>
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
        console.log(this)
        this.color = "red"
        this.$refs.spc.resume()
      }else{
        console.log(this)
        this.color = "primary"
        this.$refs.spc.pause()

      }
    }
  }
}
</script>
