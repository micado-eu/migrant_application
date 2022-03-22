<template>
   <q-page>
     <div class="row justify-center full-height full-width text-center">
      <img
        alt="Micado logo"
        :src="this.$paLogo"
        style="width:60%;max-width:320px;height:auto;"
      >

    </div>

    <div class="row justify-center full-height full-width text-center">
      <img
        alt="Powered by Micado"
        src="~assets/MICADO Logo - powered by.svg"
      >
      </div>
      <div class="pad" style="text-align:center" text-caption>
        <TalkingLabel
                  class="option_3"
                  style="width:100%"
                  :Title="$t('privacy.grant')"
                  :text="$t('privacy.grant')"
                />
        </div>
              <div class="pad" style="text-align:center" >

      <img
      style="width:80px; height:53px"
        alt="Funded by EU"
        src="~assets/Flag_of_Europe.png"
      >
      <hr/>
      </div>
      <div v-for="partner in partners" class="pad" :key="partner.url" style="text-align:center" >
      <a :href="partner.url" target="_blank">
      <img
        style="width:200px;height:100px;object-fit:scale-down;"
        :alt="partner.alt"
        :src="partner.picture"
      >
      </a>
      <hr style="color:#BDBDBD"/>
      </div>
              
        <div class="q-pa-md q-gutter-sm col" style="text-align:center">
        <q-btn
          size="12px"
          :icon="'img:statics/icons/Icon - go back.svg'"
          no-caps
          class="go_back"
          rounded
          :label="$t('button.go_back')"
          @click="back()"
        />
      </div>
   </q-page>
</template>

<script>
const TalkingLabel = () => import('components/TalkingLabel')
import storeMappingMixin from "../mixin/storeMappingMixin";

export default {
  name: 'PageIndex',
  components:{
    TalkingLabel
  },
  mixins: [
    storeMappingMixin({
      getters: {
        mixed_settings:"settings/mixed_settings"
      },
      actions: {
        fetchMixedSettings:"settings/fetchMixedSettings"
      },
    })
  ],
  data () {
    return {
      logged: false,
      partners:[
        {url:"https://www.hcu-hamburg.de/research/csl/", picture:"statics/HCU-DCS_Logo_horizontal-blue.svg", alt:"HCU Hamburg"},
        {url:"https://www.urjc.es/", picture:"statics/05 URJC.svg", alt:"URJC"},
        {url:"https://www.colpolsoc.org/", picture:"statics/11 Logo nuevo Madrid-1.svg", alt:"Colpolsoc"},
        {url:"https://www.aspbologna.it/", picture:"statics/asp-bologna.svg", alt:"ASP Bologna"},
        {url:"https://www.atlas-antwerpen.be/en", picture:"statics/atlas.svg", alt:"Atlas"},
        {url:"https://www.csipiemonte.it/en", picture:"statics/CSI_2020_RGB_trasparente.svg", alt:"CSI"},
        {url:"https://www.comunidad.madrid/", picture:"statics/DGSSIS.svg", alt:"DGSSIS"},
        {url:"https://www.digipolisantwerpen.be/", picture:"statics/digipolis_font.svg", alt:"Digipolis"},
        {url:"https://www.hamburg.de/", picture:"statics/FHH Hamburg.svg", alt:"FHH Hamburg"},
        {url:"https://www.antwerpen.be/sociale-hulp-en-zorg", picture:"statics/Stad-antwerpen-logo.svg", alt:"Stad Antwerpen"},
        {url:"https://www.synyo.com/", picture:"statics/SYNYO-Logo-(1200x655) 1.svg", alt:"SYNYO"},
        {url:"https://simlab.tuwien.ac.at/", picture:"statics/TU Logo 1.svg", alt:"TU"},
        {url:"https://www.unibo.it/en", picture:"statics/Universität di bologna Logo-03 1.svg", alt:"Università di Bologna"},
        {url:"https://www.hwwi.org/home.html", picture:"statics/2000px-HWWI-logo.svg", alt:"HWWI"},

        ]
    }
  },
  methods:{
    back(){
    this.$router.go(-1);
    },
     welcome(){
       this.$router.push({name:'welcome'})      
     },
     consent(){
       console.log(this.$root.$refs)
      this.$root.$refs.layout_ref.consent();
     },
      privacy(){

      this.$router.push({ name: 'privacy' })

    },
    poweredBy(){

      this.$router.push({ name: 'poweredBy' })

    },
  },
  created () {
  this.fetchMixedSettings({
        defaultLang: this.$defaultLang,
        userLang: this.$userLang
        }).then(ret=> console.log(ret))
  }
}
</script>
<style scoped>
.pad{
  padding-left:10px;
  padding-right:10px
}
.center{
  text-align:center
}
.input{
  margin: auto;
  display: block;
  margin-bottom:0px;
  padding-bottom:10px
}
.div-1{
  text-align:center; 
  padding-top:14px
}
.div-2{
display:inline-block;
margin-bottom: 1px; 
width:300px
}
.div-3{
  margin:0 auto
}
.image{
  width:150px; 
  height:150px;
  border-radius:50%
}
.button{
  width:150px
}
.pad{
  margin-bottom:10px; 
  padding-top:10px
}
.uploader{
  max-width: 300px;
  display:inline-block
}
.header{
  margin:0 auto; 
  text-align:left; 
  padding-left:0px;
  font-size:18px;
  font-weight:600
}
.input-top{
  margin: auto;
  display: block;
  margin-bottom:0px;
  margin-top:0px; 
  padding-bottom:10px
}
.icon{
  padding-top:5px; 
  padding-left:5px
}
.div-4{
  margin:0 auto;
  width:300px 
}
.my-card{
width:300px; 
display:inline-block
}
.pad-top{
  padding-top:10px
}
.option{
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 29px;
}
.logout {
  background-color: white;
  color:#9E1F63;
  border: 1px solid #9E1F63;
  width:250px;
  border-radius: 50px;
}
.go_back{
  border: 1px solid #0F3A5D;
  box-sizing: border-box;
  border-radius: 50px;
}
</style>
