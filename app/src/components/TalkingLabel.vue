<template>
  <div class="" style="">
    <q-icon  name="img:statics/icons/placeholder_icon.png" size="xsm"  />
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
    }
  },




  methods: {
   readClick(value) {
      console.log("speaking")
        responsiveVoice.speak(value)
  },
  
   }
}
</script>
