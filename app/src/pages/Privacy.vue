<template>
  <q-page class="flex flex-center column">
    <div>
      {{$t('privacy')}}
    </div>
  <div style="background-color:#EFEFEF; height:5px">
    &nbsp;
  </div>
    <div class="row justify-center full-height full-width text-center">
      <img
        alt="Micado logo"
        :src="this.$paLogo"
        class="width"
      >

    </div>

    <div class="row justify-center full-height full-width text-center">
      <img
        alt="Powered by Micado"
        src="~assets/powered_Micado.png"
      >
      </div>
      <div class="pad" text-caption>This project has received funding from the European Union’s H2020 Innovation Action under Grant Agreement No 822717.</div>
      <img
        alt="Funded by EU"
        src="~assets/Flag_of_Europe.png"
      >
    
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      logged: false
    }
  },
  created () {
   
  }
}
</script>
<style scoped>
.pad{
  padding-left:10px;
  padding-right:10px
}
</style>
