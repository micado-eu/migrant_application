<template>
  <q-page padding>
    <h5 class="q-pa-md" style="margin:0 auto; width:750px">Profile</h5>
    <div style="text-align:center">
  <div class=" q-pa-lg" style="display:inline-block; width:750px;border-width:2px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px">
     <div style="margin:0 auto" >
        <img alt="User Profile"
            src="~assets/UserProfile.png" 
            style="width:300px; height:300px"
            @click="picture_select = !picture_select"
            />
      </div>
      <div v-if="picture_select" class=" q-pa-xsm row" style="text-align:center">
     <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px; margin-top:0px"> Profile picture </h5>
      </div>
      <div class="col-8" style="margin-bottom:10px" >
        <q-uploader
        
        url="http://localhost:8080/upload"
        label="Upload picture"
        color="accent"
        square
        flat
        bordered
        style="max-width: 300px;display:inline-block"
      />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
     <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px; margin-top:0px"> First name </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px;margin-top:0px">
        <q-input rounded dense  bg-color="grey-3" standout outlined v-model="user.firstname" />
      </div>
    </div>
    
   
    
    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px"> Last name </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px">
        <q-input rounded dense  bg-color="grey-3" standout outlined v-model="user.lastname"  />
      </div>
    </div>

    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px"> Age </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px">
        <q-input rounded dense  type="number" style="max-width: 150px"  bg-color="grey-3" standout outlined v-model="user.age"  />
      </div>
    </div>

<div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px"> Nationality </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px">
        <q-input rounded dense  bg-color="grey-3" standout outlined v-model="user.nationality"  />
      </div>
    </div>
    
    
    
   
  </div>
  </div>
                 <div class="q-pa-md" style="">
                   <div class=" q-pa-lg" style="margin:0 auto; width:750px;">
    <h5>Consent management</h5>
    <q-card class="my-card">
      <q-card-section>
        <q-option-group v-model="group" :options="options" color="yellow" type="toggle" />
        <q-btn color="accent"  label="Save" />
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
      picture_select:false, 
      locale: this.$q.lang.isoName, 
      group:["consent"],
       options: [
        {
          label: "Share personal data",
          value: 1
        },
        {
          label: "Share integration plans",
          value: 2
        },
        {
          label: "Share legal status",
          value: 3
        },
        {
          label: "Share uploaded documents",
          value: 4
        },
      ], 
      user:{
        picture:"", 
        firstname:"Mariam",
        lastname:"Hassan",
        age:25,
        nationality:"Egyptian"
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