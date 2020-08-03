<template>
  <q-page padding>
    
    <div style="text-align:center; padding-top:14px">
  <div class=" " style="display:inline-block;margin-bottom: 1px; width:300px">
     <div style="margin:0 auto" >
        <img alt="User Profile"
            src="~assets/user-placeholder.png" 
            style="width:150px; height:150px"
            
            />
      </div>
      <q-btn color="info" unelevated style="width:150px" no-caps rounded text-color="white" :label="$t('desc_labels.change_pic')" @click="picture_select = !picture_select" />
      <div v-if="picture_select" class=" q-pa-xsm " style="text-align:center">
     
      <div class="col-8" style="margin-bottom:10px; padding-top:10px" >
        <q-uploader
        
        url="http://localhost:8080/upload"
        :label="$t('desc_labels.change_pic')"
        color="accent"
        square
        flat
        bordered
        style="max-width: 300px;display:inline-block"
      />
      </div>
    </div>
    <div class=" q-pa-xsm " style="text-align:center">
      <h5 class="q-pa-md" style="margin:0 auto; text-align:left; padding-left:0px;font-size:18px;font-weight:600">Personal Profile</h5>
     
      <div class="" style="margin: auto;display: block;margin-bottom:0px;margin-top:0px; padding-bottom:10px">
        <q-input  dense :label="$t('desc_labels.username')"  bg-color="grey-1"   standout outlined v-model="user.username" >
        <q-icon style="padding-top:5px; padding-left:5px" name="img:statics/icons/Edit.png" size="md"  />
        </q-input>
      </div>
    </div>
    
   
    
    <div class=" q-pa-xsm " >
     
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px; padding-bottom:10px">
        <q-input  dense  :type="isPwd ? 'password' : 'text'"  bg-color="grey-1" standout outlined :label="$t('desc_labels.password')" v-model="user.password"  >
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
      
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px; padding-bottom:10px">
        <q-input  dense   style="" :label="$t('desc_labels.legal_name')"  bg-color="grey-1" standout outlined v-model="user.legalname"  >
         <q-icon style="padding-top:5px; padding-left:5px" name="img:statics/icons/Edit.png" size="md"  />
        </q-input>
      </div>
    </div>

<div class=" q-pa-xsm " >
      
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px;padding-bottom:10px">
        <q-input  dense  bg-color="grey-1" :label="$t('desc_labels.nationality')" standout outlined v-model="user.nationality"  >
         <q-icon style="padding-top:5px; padding-left:5px" name="img:statics/icons/Edit.png" size="md"  />
        </q-input>
      </div>
    </div>

    <div class=" q-pa-xsm " >
      
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px;padding-bottom:10px">
        <q-input  dense  bg-color="grey-1" :label="$t('desc_labels.age')" standout outlined v-model="user.age"  >
         <q-icon style="padding-top:5px; padding-left:5px" name="img:statics/icons/Edit.png" size="md"  />
        </q-input>
      </div>
    </div>

    <div class=" q-pa-xsm " >
      
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px;padding-bottom:10px">
        <q-input  dense  bg-color="grey-1" :label="$t('desc_labels.gender')" standout outlined v-model="user.gender"  >
         <q-icon style="padding-top:5px; padding-left:5px" name="img:statics/icons/Edit.png" size="md"  />
        </q-input>
      </div>
    </div>
    
    
    
   
  </div>
  </div>
    <div class="" >
     <div class=" " style="margin:0 auto;width:300px ">
    <h5>Privacy Settings</h5>
    <q-card class="my-card" style="width:300px; display:inline-block">
      <q-card-section >
        <q-item v-for="option in options" :key="option.value">
          
          <div class="col-10" style="padding-top:10px">
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