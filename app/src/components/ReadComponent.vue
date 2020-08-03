<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn :color="color" text-color="white" :label="$t('input_labels.read')" @click="toggleRead()" />
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
    active: false, 
    color:"primary"
    }
  },

  mounted() {
    this.$root.$on('option', data => {
        console.log(data)
        this.readClick(data)
    })
  },


  methods: {
   readClick(value) {
      if(this.active){
        console.log(this.active)
        console.log("sono nel readalong")
        responsiveVoice.speak(value)
      }
   },

    toggleRead(){
      this.active = !this.active
      if(this.active){
        console.log("ReadAlong is active")
        this.color = "red"
      }else{
        console.log("ReadAlong is disabled")
        this.color = "primary"
      }
    }
  }
}
</script>
