<template>
  <q-page padding>
    <div v-if="this.loading">Loading...</div>
    <div v-else>
    <div class="div-1">
  <div class="div-2" >
     <div class="div-3" >
        <img 
        v-if="this.the_user.picture == null"
        alt="User Profile"
        src="~assets/user-placeholder.png" 
        class="image"
            />
        <img
          v-else
          width="250px"
          height="250px"
          class="col-6 image"
          :src="this.the_user.picture"
        />
      </div>
      <q-btn class="button" color="info" unelevated no-caps rounded text-color="white" :label="$t('profile.change_pic')" @click="picture_select = !picture_select; modifyPic()" />
      <div v-if="picture_select" class=" q-pa-xsm center">
     <div class="col-8 pad" >
         <q-file
            @input="getFilesPics($event)"
            bg-color="grey-3"
            dense
            :label="$t('input_labels.upload_doc_pics')"
            standout
            outlined
            accept=".jpg, image/*"
            @rejected="onRejected"
          />
      
      </div>
    </div>
    <div class=" q-pa-xsm center" >
      <h5 class="q-pa-md header">{{$t('profile.personal_profile')}}</h5>
      <div class="input-top">
        <q-input  dense :label="$t('profile.username')"  bg-color="grey-1"   standout outlined v-model="the_user.username" >
        <q-icon class="icon" name="img:statics/icons/Edit.png" size="md"/>
        </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
     <div class="col-8 input" >
        <q-input  dense  :type="isPwd ? 'password' : 'text'"  bg-color="grey-1" standout outlined :label="$t('profile.password')" v-model="the_user.password"  >
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
        <q-input  dense :label="$t('profile.legal_name')"  bg-color="grey-1" standout outlined v-model="the_user.legalname"  >
         <q-icon name="img:statics/icons/Edit.png" size="md"  />
        </q-input>
      </div>
    </div>
<div class=" q-pa-xsm " >
    <div class="col-8 input" >
        <q-input  dense  bg-color="grey-1" :label="$t('profile.nationality')" standout outlined v-model="the_user.nationality"  >
         <q-icon name="img:statics/icons/Edit.png" size="md"  />
        </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
      <div class="col-8 input" >
        <q-input  dense  bg-color="grey-1" :label="$t('profile.age')" standout outlined v-model="the_user.date_of_birth"  >
         <q-icon name="img:statics/icons/Edit.png" size="md"  />
        </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
      <div class="col-8 input" >
        <q-input  dense  bg-color="grey-1" :label="$t('profile.gender')" standout outlined v-model="the_user.gender"  >
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
  </div>
  </q-page>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'
export default {
  // name: 'PageName',
    mixins: [
    editEntityMixin,
    storeMappingMixin({
      getters: {
        user: 'user/users',
      }, actions: {
        fetchSpecificUser: 'user/fetchSpecificUser',
        saveUserPic:'user/saveUserPic',
        editUserPic:'user/editUserPic'
      }
    })

  ],
  data () {
    return {
      loading:true,
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
      the_user:{
        username:"MaryHassan",
        password:"",
        legalname:"Mariam Hassan",
        date_of_birth:null,
        nationality:"Egyptian",
        gender:"Female", 
        picture:null, 
        picture_id: null
      },
      user_picture:{
        id:-1,
        picture:null,
        tenantId:null,
        userId:null
      },
      user_pic_orig:null
    }
  },
  methods: {
    modifyPic(){
      if(this.user_pic_orig != this.the_user.picture){
           this.$q.notify({
        type: 'warning',
        message: 'Do you really want to change picture?',
        actions: [
          { label: 'Yes', color: 'red', handler: () => {
            if(this.user_pic_orig == null){
              //save the picture
              this.saveUserPic(this.user_picture)
              this.user_pic_orig = this.the_user.picture
              console.log(this.user_pic_orig == this.the_user.picture)
            }
            else{
              //edit the picture
              this.editUserPic({picture:this.user_picture.picture,id:this.the_user.picture_id })
              this.user_pic_orig = this.the_user.picture
              console.log(this.user_pic_orig == this.the_user.picture)
            }
            } },
          { label: 'No', color: 'accent', handler: () => { 
            this.the_user.picture = this.user_pic_orig
            } }
        ]
      })
      }
    },
   setLocale (locale) {   // set the Vue-i18n locale
     this.$i18n.locale = locale
     // load the Quasar language pack dynamically
     import(`quasar/lang/${locale}`).then(({ default: messages }) => {
       this.$q.lang.set(messages)
     })
   },
   onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
   },
       getFilesPics (files) {
      console.log(files)
      console.log(this)
      console.log(self)
      console.log(this.user)
      const reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(files)

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        const fileInfo = {
          name: files.name,
          type: files.type,
          size: `${Math.round(files.size / 1000)} kB`,
          base64: reader.result,
          file: files
        }
       // this.uploaded_images.push(fileInfo.base64)
        //console.log(this.uploaded_images)
        this.user_picture = {
          id: -1,
          picture: fileInfo.base64,
          userId:this.user.umId,
          tenantId:this.user.umTenantId
        }
        console.log(this.user_picture)
        this.the_user.picture = this.user_picture.picture
      }
    },
  },
  created () {
    var userId = this.$store.state.auth.user.umid
    console.log(userId)
    this.fetchSpecificUser(userId).then((user)=>{
      console.log(user)
      this.the_user.username = user.attributes.filter((attr)=>{
        return attr.umAttrName == "uid"
      })[0].umAttrValue
      if(user.userPicture){
        this.the_user.picture= user.userPicture.picture
        this.the_user.picture_id= user.userPicture.id
        this.user_pic_orig =  user.userPicture.picture
      }
      else{
        this.the_user.picture= null
      }
      console.log("after username")
      var name = ""
      var surname = ""
      var name_arr = user.attributes.filter((attr)=>{
        return attr.umAttrName == "givenName"
      })
      if(name_arr.length>0){
        name = name_arr[0].umAttrValue 
      }
      var surname_arr = user.attributes.filter((attr)=>{
        return attr.umAttrName == "sn"
      })
      if(name_arr.length>0){
        surname = surname_arr[0].umAttrValue 
      }
      var fullname = name + " " + surname
      this.the_user.legalname =  fullname
      var dob=""
      var dob_arr =  user.attributes.filter((attr)=>{
        return attr.umAttrName == "dateOfBirth"
      })
      if(dob_arr.length>0){
        dob = dob_arr[0].umAttrValue 
      }
      this.the_user.date_of_birth= dob
      var country = ""
      var country_arr = user.attributes.filter((attr)=>{
        return attr.umAttrName == "country"
      })
      if(country_arr.length>0){
        country = country_arr[0].umAttrValue 
      }
      this.the_user.nationality= country
      var gender =""
      var gender_arr =  user.attributes.filter((attr)=>{
        return attr.umAttrName == "gender"
      })
      if(gender_arr.length>0){
        gender = gender_arr[0].umAttrValue 
      }
      this.the_user.gender =  gender
      this.loading=false
      console.log("after loading")
    })
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