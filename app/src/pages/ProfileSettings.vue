<template>
  <q-page padding>
    <div class="div-1">
  <div class="div-2" >
     <div class="div-3" >
        <img alt="User Profile"
            src="~assets/user-placeholder.png" 
            class="image"
            />
      </div>
      <q-btn class="button" color="info" unelevated no-caps rounded text-color="white" :label="$t('profile.change_pic')" @click="picture_select = !picture_select" />
      <div v-if="picture_select" class=" q-pa-xsm center">
     <div class="col-8 pad" >
        <q-uploader
        class="uploader"
        url="http://localhost:8080/upload"
        :label="$t('desc_labels.change_pic')"
        color="accent"
        square
        flat
        bordered
      />
      </div>
    </div>
    <div class=" q-pa-xsm center" >
      <h5 class="q-pa-md header">{{$t('profile.personal_profile')}}</h5>
      <div class="input-top">
        <q-input  dense :label="$t('profile.username')"  bg-color="grey-1"   standout outlined v-model="user.username" >
        <q-icon class="icon" name="img:statics/icons/Edit.png" size="md"/>
        </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
     <div class="col-8 input" >
        <q-input  dense  :type="isPwd ? 'password' : 'text'"  bg-color="grey-1" standout outlined :label="$t('profile.password')" v-model="user.password"  >
          <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
        </q-input>
      </div>
    </div>
<div class=" q-pa-xsm " >
      <div class="col-8 input" >
        <q-input  dense :label="$t('profile.legal_name')"  bg-color="grey-1" standout outlined v-model="user.legalname"  >
         <q-icon name="img:statics/icons/Edit.png" size="md"  />
        </q-input>
      </div>
    </div>
<div class=" q-pa-xsm " >
    <div class="col-8 input" >
        <q-input  dense  bg-color="grey-1" :label="$t('profile.nationality')" standout outlined v-model="user.nationality"  >
         <q-icon name="img:statics/icons/Edit.png" size="md"  />
        </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
      <div class="col-8 input" >
        <q-input  dense  bg-color="grey-1" :label="$t('profile.age')" standout outlined v-model="user.age"  >
         <q-icon name="img:statics/icons/Edit.png" size="md"  />
        </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
      <div class="col-8 input" >
        <q-input  dense  bg-color="grey-1" :label="$t('profile.gender')" standout outlined v-model="user.gender"  >
         <q-icon name="img:statics/icons/Edit.png" size="md"  />
        </q-input>
      </div>
    </div>
  </div>
  </div>
    <div  >
     <div class="div-4">
    <h5>{{$t('desc_labels.privacy_settings')}}</h5>
    <q-card class="my-card">
      <q-card-section >
        <q-item v-for="option in options" :key="option.value">
          <div class="col-10 pad-top">
            {{option.label}}
             </div>
          <div class="col-2">
             <q-toggle
              v-model="option.toggle"
              color="blue"
              />
          </div>
         </q-item>
         <!-- <q-btn color="accent"  label="Save" />-->
      </q-card-section>
    </q-card>
  </div>
  </div>
  </q-page>
</template>

<script>
//import LanguageSelector from 'components/LanguageSelector'
export default {
  // name: 'PageName',
  data () {
    return {
      editing:null,
      picture_select:false, 
      isPwd:true,
      locale: this.$q.lang.isoName, 
      group:["consent"],
       options: [
        {
          label: "Share personal data",
          value: 1,
          toggle:true
        },
        {
          label: "Share integration plans",
          value: 2,
          toggle:false
        },
        {
          label: "Share legal status",
          value: 3,
          toggle:true
        },
        {
          label: "Share uploaded documents",
          value: 4,
          toggle:false
        },
      ], 
      user:{
        picture:"", 
        username:"MaryHassan",
        password:"",
        legalname:"Mariam Hassan",
        age:25,
        nationality:"Egyptian",
        gender:"Female"
      }
    }
  },
  methods: {
   setLocale (locale) {   // set the Vue-i18n locale
     this.$i18n.locale = locale
     // load the Quasar language pack dynamically
     import(`quasar/lang/${locale}`).then(({ default: messages }) => {
       this.$q.lang.set(messages)
     })
   }
  }
}
</script>
<style scoped>
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
  height:150px
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
</style>