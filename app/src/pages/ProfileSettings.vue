<template>
  <q-page padding>
    <div v-if="this.loading">{{$t('desc_labels.loading')}}</div>
    <div v-else>
    <div class="div-1">
  <UserButton ref="user" />
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
        <q-input :readonly="!editing"  dense :label="$t('profile.username')"  bg-color="grey-1"   standout outlined v-model="the_user.username" >
        </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
     <div class="col-8 input" >
        <q-input  dense :readonly="!editing" bg-color="grey-1" standout outlined :label="$t('profile.phone_number')" v-model="the_user.phoneNumber"  >
          <template v-slot:append>
          <q-icon
          />
        </template>
        </q-input>
      </div>
    </div>
<div class=" q-pa-xsm " >
      <div class="col-8 input" >
        <q-input  dense :readonly="!editing" :label="$t('profile.legal_name')"  bg-color="grey-1" standout outlined v-model="the_user.legalname"  >
        </q-input>
      </div>
    </div>
<div class=" q-pa-xsm " >
    <div class="col-8 input" >
        <q-input  dense :readonly="!editing"  bg-color="grey-1" :label="$t('profile.country')" standout outlined v-model="the_user.nationality"  >
        </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
      <div class="col-8 input" >
        <q-input  dense :readonly="!editing" bg-color="grey-1" :label="$t('profile.dob')" standout outlined v-model="the_user.date_of_birth"  >
        </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
      <div class="col-8 input" >
        <q-input  dense :readonly="!editing" bg-color="grey-1" :label="$t('profile.gender')" standout outlined v-model="the_user.gender"  >
        </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
      <div class="col-8 input" >
        <q-input  dense :readonly="!editing" bg-color="grey-1" :label="$t('profile.mail')" standout outlined v-model="the_user.email"  >
        </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
      <div v-if="!editing" class="col-8 input" >
        <q-btn class="button" color="info" unelevated no-caps rounded text-color="white" :label="$t('button.edit')" @click="editing=true" />
        <q-btn class="button" color="accent" unelevated no-caps rounded text-color="white" :label="$t('button.change_pass')" @click="change_pass=true" />
      </div>
      <div v-else class="col-8 input" >
        <q-btn class="button" color="accent" unelevated no-caps rounded text-color="white" :label="$t('button.save')" @click="editUser()" />
        <q-btn class="button" color="red" unelevated no-caps rounded text-color="white" :label="$t('button.cancel')" @click="cancelUser()" />
      </div>
    </div>
    <q-dialog v-model="change_pass">
<q-card class="q-pa-md" style="padding-top:0px">
      <div class="q-pa-md" style="text-align:center; padding_bottom:30px">
        <TalkingLabel
                  class="option"
                  style="width:100%"
                  :Title="$t('profile.password_change')"
                  :text="$t('profile.password_change')"
                />
      </div>
    <div class=" q-pa-sm " >
      <div class="col-8 input" >
      <q-input dense   outlined bg-color="grey-1" v-model="password.old_password" filled :type="isPwd0 ? 'password' : 'text'" :label="$t('profile.old_pass')">
        <template v-slot:append>
          <q-icon
            :name="isPwd0? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd0 = !isPwd0"
          />
        </template>
      </q-input>
      </div>
    </div>
    <div class=" q-pa-sm " >
      <div class="col-8 input" >
      <q-input dense   outlined bg-color="grey-1" v-model="password.new_password" filled :type="isPwd1 ? 'password' : 'text'" :label="$t('profile.new_pass')">
        <template v-slot:append>
          <q-icon
            :name="isPwd1? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd1 = !isPwd1"
          />
        </template>
      </q-input>
      </div>
    </div>
    <div class=" q-pa-sm " >
      <div class="col-8 input" >
      <q-input dense   outlined bg-color="grey-1" v-model="password.confirm_password" filled :type="isPwd2? 'password' : 'text'" :label="$t('profile.confirm_pass')">
        <template v-slot:append>
          <q-icon
            :name="isPwd2 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd2 = !isPwd2"
          />
        </template>
      </q-input>
      </div>
    </div>
    <div class="col-8 input" >
        <q-btn class="go_back"  no-caps rounded :icon="'img:statics/icons/Icon - X (cancel).svg'"  :label="$t('button.cancel')" @click="cancelPass()" />
        <q-btn class="button" color="accent" unelevated no-caps rounded text-color="white" :label="$t('button.change_pass')" @click="editPass()" />
      </div>
</q-card>
    </q-dialog>
    <!--<div v-if="change_pass">
    <div class=" q-pa-xsm " >
      <div class="col-8 input" >
      <q-input dense  standout outlined bg-color="grey-1" v-model="password.old_password" filled :type="isPwd0 ? 'password' : 'text'" :label="$t('profile.old_pass')">
        <template v-slot:append>
          <q-icon
            :name="isPwd0? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd0 = !isPwd0"
          />
        </template>
      </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
      <div class="col-8 input" >
      <q-input dense  standout outlined bg-color="grey-1" v-model="password.new_password" filled :type="isPwd1 ? 'password' : 'text'" :label="$t('profile.new_pass')">
        <template v-slot:append>
          <q-icon
            :name="isPwd1? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd1 = !isPwd1"
          />
        </template>
      </q-input>
      </div>
    </div>
    <div class=" q-pa-xsm " >
      <div class="col-8 input" >
      <q-input dense  standout outlined bg-color="grey-1" v-model="password.confirm_password" filled :type="isPwd2? 'password' : 'text'" :label="$t('profile.confirm_pass')">
        <template v-slot:append>
          <q-icon
            :name="isPwd2 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd2 = !isPwd2"
          />
        </template>
      </q-input>
      </div>
    </div>
    <div class="col-8 input" >
        <q-btn class="button" color="accent" unelevated no-caps rounded text-color="white" :label="$t('button.save')" @click="editPass()" />
        <q-btn class="button" color="red" unelevated no-caps rounded text-color="white" :label="$t('button.cancel')" @click="cancelPass()" />
      </div>-->
    <q-dialog v-model="pass_changed">
        <q-card class="q-pa-md" style="padding-top:0px">
          <div style="padding-top:50px; text-align:center">
          <q-icon  size="150px" :name="'img:statics/icons/Icon - Round checkmark blue.svg'"/>
          <TalkingLabel
                  class="option_2"
                  style="width:100%"
                  :Title="$t('profile.password_changed')"
                  :text="$t('profile.password_changed')"
                />
          </div>
          <div style="text-align:center; padding-top:30px">
          <q-btn
            class="go_back"
            :label="$t('button.go_back')"
            :icon="'img:statics/icons/Icon - go back.svg'"
            rounded
            no-caps
            size="15px"
            @click="pass_changed = false"
          />
          </div>
</q-card>
    </q-dialog>
  <div v-if="users.length >0">
<h5 class="q-pa-md header">{{$t('profile.user_pref')}}</h5>    <div class="row" v-for="user_top in users" :key="user_top.id">
    <div style="padding-top:8px;" class="col-2">
      <q-img style="width:24px; height:24px"  :src="user_top.icon"  />
    </div>
    <div class="col-8" style="text-align:left;padding-top:8px">
      {{user_top.user_type}}
    </div>
    <div class="col-2" style="text-align:right">
    <q-checkbox :disable="!edit_preferences" color="accent" v-model="preferences.filter((pref)=>{return pref.id == user_top.id})[0].active" />
    </div>
    </div>
    <div v-if="!edit_preferences" class="col-8 input" >
        <q-btn class="button" color="info" unelevated no-caps rounded text-color="white" :label="$t('button.edit')" @click="edit_preferences=!edit_preferences" />
      </div>
      <div v-else class="col-8 input" >
        <q-btn class="button" color="accent" unelevated no-caps rounded text-color="white" :label="$t('button.save')" @click="editPref()" />
        <q-btn class="button" color="red" unelevated no-caps rounded text-color="white" :label="$t('button.cancel')" @click="cancelPref()" />
      </div>
  </div>
  <q-btn
            class="go_back"
            :label="$t('button.go_back')"
            :icon="'img:statics/icons/Icon - go back.svg'"
            rounded
            no-caps
            size="15px"
            to="/profile"
          />
  </div>
  </div>

   <!-- <div  >
      
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
          <q-btn color="accent"  label="Save" />
      </q-card-section>
    </q-card>
  </div>
  </div>
  <ChatWidget />-->
  </div>
  </q-page>
</template>

<script>
import ChatWidget from 'components/ChatWidget'
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'
import UserButton from "components/UserButton"
const TalkingLabel = () => import('components/TalkingLabel')

export default {
  // name: 'PageName',
    mixins: [
    editEntityMixin,
    storeMappingMixin({
      getters: {
        user: 'user/users',
        users: 'user_type/users',
      }, actions: {
        fetchSpecificUser: 'user/fetchSpecificUser',
        saveUserPic:'user/saveUserPic',
        editUserPic:'user/editUserPic',
        editUserData:'user/editUserData',
        editUserPassword:'user/editUserPassword',
        fetchUserType: 'user_type/fetchUserType',
        editUserPreferences:'user/editUserPreferences'
      }
    })

  ],
  components:{
    ChatWidget, UserButton,TalkingLabel
  },
  computed:{
    check(value){
      this.preferences.includes(value)
    }
  },
  data () {
    return {
      isPwd0:true,
      isPwd1:true,
      isPwd2:true,
      change_pass:false,
      pass_changed:false,
      password:{
        old_password:null,
        new_password:null,
        confirm_password:null
      },
      loading:true,
      editing:false,
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
        userid:null,
        username:"MaryHassan",
        phoneNumber:"",
        legalname:"Mariam Hassan",
        givenName:"",
        familyName:"",
        date_of_birth:null,
        nationality:"Egyptian",
        gender:"Female", 
        email:"",
        picture:null, 
        picture_id: null,
        user_pref:[]
      },
      the_user_orig:{
        userid:null,
        username:"MaryHassan",
        phoneNumber:"",
        legalname:"Mariam Hassan",
        givenName:"",
        familyName:"",
        date_of_birth:null,
        nationality:"Egyptian",
        gender:"Female", 
        email:"",
        picture:null, 
        picture_id: null,
        user_pref:[]
      },
      user_picture:{
        id:-1,
        picture:null,
        tenantId:null,
        userId:null
      },
      user_pic_orig:null, 
      preferences: [],
      preferences_orig: [],
      edit_preferences:false
    }
  },
  methods: {
    logout(){
      this.$refs.user.toLogout()
    },
    editPref(){
      console.log("saving preferences")
      var saving_pref = []
      this.edit_preferences = false
      console.log(this.preferences)
      var temp_pref = this.preferences.filter((pref)=>{
        return pref.active == true
      })
      temp_pref.forEach((tmp)=>{
        saving_pref.push({idUserType:tmp.id})
      })
      this.editUserPreferences({user_id:this.$store.state.auth.user.umid, preferences:saving_pref})
      this.preferences_orig = JSON.parse(JSON.stringify(this.preferences))
    },
    cancelPref(){
      console.log("reverting preferences")
      this.preferences = JSON.parse(JSON.stringify(this.preferences_orig))
      this.edit_preferences = false
    },
    cancelPass(){
      this.change_pass = false
      this.password.old_password=null
      this.password.new_password=null
      this.password.confirm_password = null
    },
    editPass(){
      var user_admin = this.the_user.username
      console.log(user_admin)
      var user_pass = this.password.old_password
      console.log(user_pass)
      var pass_payload = JSON.stringify({password:this.password.new_password})
      console.log(pass_payload)
      if(this.password.new_password == this.password.confirm_password){
        console.log("saving new password")
        this.editUserPassword({admin:user_admin, adminpwd:user_pass, payload:pass_payload})
        this.cancelPass()
        this.pass_changed = true
      }
      else{
        this.$q.notify({
        message: 'The new password and the confirmation password do not match',
        color: 'purple'
      })
      }
    },
    findAttribute(umAttribute,userAttribute){
      console.log(umAttribute)
      var arr = this.user.attributes.filter((attr)=>{
        return attr.umAttrName == String(umAttribute)
      })
      if(arr.length>0){
        console.log("inside if")
        this.the_user[userAttribute] = arr[0].umAttrValue 
      }
    },
    editUser(){
      var idx = this.the_user.legalname .indexOf(" "); 
      this.the_user.givenName = this.the_user.legalname.substr(0, idx)
      this.the_user.familyName = this.the_user.legalname.substr(idx +1)
      console.log(this.the_user)
      this.the_user_orig=JSON.parse(JSON.stringify( this.the_user ))
      var working_user = JSON.parse(JSON.stringify(this.the_user, [ 'userid', 'username', 'phoneNumber', 'givenName', 'familyName', 'date_of_birth', 'nationality', 'gender', 'email']));
      console.log(working_user)
      var working_token = "testtoken"
      console.log(working_token)
      this.editUserData({user:JSON.stringify(working_user), token:working_token})
      this.editing = false
    },
    cancelUser(){
      console.log("in cancel")
      console.log(this.the_user_orig)
      console.log(this.the_user)
      this.the_user=JSON.parse(JSON.stringify(this.the_user_orig))
      this.editing = false
    },
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
      console.log("this is the user in store")
      console.log(this.user)
      this.the_user.username = this.user.attributes.filter((attr)=>{
        return attr.umAttrName == "uid"
      })[0].umAttrValue
      this.the_user.userid = this.user.attributes.filter((attr)=>{
        return attr.umAttrName == "scimId"
      })[0].umAttrValue
      this.findAttribute('mobile', 'phoneNumber')
      this.findAttribute('uid', 'username')
      this.findAttribute('scimId', 'userid')
      this.findAttribute('givenName', 'givenName')
      this.findAttribute('sn', 'familyName')
      this.the_user.legalname = this.the_user.givenName + " " + this.the_user.familyName
      this.findAttribute('dateOfBirth', 'date_of_birth')
      this.findAttribute('gender', 'gender')
      this.findAttribute('country', 'nationality')
      this.findAttribute('mail', 'email')
      if(user.userPicture){
        this.the_user.picture= this.user.userPicture.picture
        this.the_user.picture_id= this.user.userPicture.id
        this.user_pic_orig =  this.user.userPicture.picture
      }
      else{
        this.the_user.picture= null
      }
      this.the_user_orig=JSON.parse(JSON.stringify( this.the_user ))
      console.log("after loading")
      if(user.userPreferences){
        this.the_user.user_pref = user.userPreferences
      }
      console.log(this.the_user)
      
      this.fetchUserType({ defaultLang: this.$defaultLang, userLang: this.$userLang }).then((types)=>{
        types.forEach((typ)=>{
          this.preferences.push({id:typ.id, active:false})
        })
        if(this.the_user.user_pref.length>0){
                  this.the_user.user_pref.forEach((pref)=>{
          this.preferences.forEach((userprf)=>{
            if(userprf.id == pref.idUserType){
              userprf.active = true
            }
          })
      })
        }
      this.preferences_orig = JSON.parse(JSON.stringify(this.preferences))
      this.loading=false
      })
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
  .go_back {
  background-color: white;
  color:#0F3A5D;
  border: 1px solid #0F3A5D;
  border-radius: 50px;
  margin-right:10px
}
.option{
  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}
.option-2{
  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
}
</style>