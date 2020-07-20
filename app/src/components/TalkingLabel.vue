<template>
  <div class="" style="">
       {{ this.Title }} 
    <q-icon @click.stop="readClick(text)" :id="this.text" name="img:statics/icons/placeholder_icon.png" size="xsm"  />
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
    }
  },
  props: ["Title", "text"],




  methods: {
   readClick(value) {
      console.log("speaking")
        responsiveVoice.speak(value)
  },
 
  
   }
}
</script>
