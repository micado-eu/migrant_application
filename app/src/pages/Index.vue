<template>
  <q-page class="flex flex-center column">
    <div class="row justify-center full-height full-width text-center">
      <img
        alt="Micado logo"
        src="~assets/asp_logo.jpg"
      >
      <div class="h6">Build: {{buildDate}}</div>

    </div>
    <div class="row justify-center full-height full-width text-center">
      <img
        alt="Powered by Micado"
        src="~assets/powered_Micado.png"
      >
      <div text-caption>This project has received funding from the European Union’s H2020 Innovation Action under Grant Agreement No 822717.</div>
      <img
        alt="Funded by EU"
        src="~assets/Flag_of_Europe.png"
      >
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      buildDate: Date(process.env.APP_BUILD_DATE)
    }
  }
}
</script>
