<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
  var customcss = document.createElement("link");
    customcss.type = "text/css";
    customcss.href = "/customcss/migrant.css"
    customcss.rel = "stylesheet"
    console.log("I'm custom css")
    console.log(customcss)
    document.getElementsByTagName('head')[0].appendChild(customcss);
  },
  created(){
    
  }
}
</script>
 