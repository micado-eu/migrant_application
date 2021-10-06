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
              </div>
        <div class="q-pa-md q-gutter-sm col button-div">
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
      logged: false
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
  this.fetchMixedSettings().then(ret=> console.log(ret))
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
</style>
