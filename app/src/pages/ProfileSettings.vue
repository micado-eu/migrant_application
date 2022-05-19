<template>
  <q-page >
    <div v-if="this.loading">{{$t('desc_labels.loading')}}</div>
    <div v-else>
    <div class="div-1">
  <!--<UserButton ref="user" />-->
  <div class="" >
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
      <div class="row" style="justify-content:center; padding-bottom:20px">
      <q-btn :icon="'img:statics/icons/Icon - Camera icon.svg'" class="button-picture"  unelevated no-caps rounded  :label="$t('profile.change_pic')" @click="picture_select = !picture_select; modifyPic()" />
      <TalkingLabel
                  :text="$t('profile.change_pic')"
                  :icon_style="'margin-top:7px; margin-left:10px'"                  
                />
      </div>
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
      <div  class="separators" >
    &nbsp;
  </div>
  <div class=" row q-pa-md header" >
   <TalkingLabel
   :Title="$t('profile.personal_profile')"
                  :row="'row'"
                  :title_col="'col-11'"
                  :icon_col="'col-1'"
                  :icon_style="'text-align:right'"
      :text="$t('profile.personal_profile')"
    />
    </div>
    <div class=" q-px-md center" >
      <div class="input-top">
        <q-input :readonly="true"  dense :label="$t('profile.username')"  bg-color="grey-1"   standout outlined v-model="the_user.username" >
          <TalkingLabel
                  :text="$t('profile.username')"
                  :icon_style="'margin-top:7px; margin-left:10px'"                  
                />
        </q-input>
      </div>
    </div>
    <div class=" q-px-md " >
     <div class="col-8 input" >
        <q-input  dense :readonly="!editing" bg-color="grey-1" standout outlined :label="$t('profile.phone_number')" v-model="the_user.phoneNumber"  >
          <TalkingLabel
                  :text="$t('profile.phone_number')"
                  :icon_style="'margin-top:7px; margin-left:10px'"                  
                />
        </q-input>
      </div>
    </div>
<div class=" q-px-md " >
      <div class="col-8 input" >
        <q-input  dense :readonly="!editing" :label="$t('profile.legal_name')"  bg-color="grey-1" standout outlined v-model="the_user.legalname"  >
                    <TalkingLabel
                  :text="$t('profile.legal_name')"
                  :icon_style="'margin-top:7px; margin-left:10px'"                  
                />
        </q-input>
      </div>
    </div>
<div class=" q-px-md " >
    <div class="col-8 input" >
        <q-input  dense :readonly="!editing"  bg-color="grey-1" :label="$t('profile.country')" standout outlined v-model="the_user.nationality"  >
                    <TalkingLabel
                  :text="$t('profile.country')"
                  :icon_style="'margin-top:7px; margin-left:10px'"                  
                />
        </q-input>
      </div>
    </div>
    <div class=" q-px-md " >
      <div class="col-8 input" >
        <q-input  dense :readonly="!editing" bg-color="grey-1" :label="$t('profile.dob')" standout outlined v-model="the_user.date_of_birth"  >
                    <TalkingLabel
                  :text="$t('profile.dob')"
                  :icon_style="'margin-top:7px; margin-left:10px'"                  
                />
                
        </q-input>
      </div>
    </div>
    <div class=" q-px-md " >
      <div class="col-8 input" >
        <q-input  dense :readonly="!editing" bg-color="grey-1" :label="$t('profile.gender')" standout outlined v-model="the_user.gender"  >
                    <TalkingLabel
                  :text="$t('profile.gender')"
                  :icon_style="'margin-top:7px; margin-left:10px'"                  
                />
        </q-input>
      </div>
    </div>
    <div class=" q-px-md " >
      <div class="col-8 input" >
        <q-input  dense :readonly="!editing" bg-color="grey-1" :label="$t('profile.mail')" standout outlined v-model="the_user.email"  >
                    <TalkingLabel
                  :text="$t('profile.mail')"
                  :icon_style="'margin-top:7px; margin-left:10px'"                  
                />
        </q-input>
      </div>
    </div>
    <div class=" q-px-md " >
      <div v-if="!editing" class="col-8 input" >
        <q-btn class="button-edit" :icon="'img:statics/icons/Icon - edit.svg'" unelevated no-caps rounded  :label="$t('button.edit')" @click="editing=true" />
       
      </div>
      <div v-else class="col-8 input" >
        <q-btn class="button-cancel" style="margin-right:10px" :icon="'img:statics/icons/Icon - X (cancel).svg'"  unelevated no-caps rounded  :label="$t('button.cancel')" @click="cancelUser()" />
        <q-btn class="button-save" unelevated no-caps :icon="'img:statics/icons/Icon - Checkmark.svg'" rounded color="accent" :label="$t('button.save')" @click="editUser()" />
      </div>
    </div>
          <div class="separators">
    &nbsp;
  </div>
    <div>
        <div class=" row q-pa-md header" >
   <TalkingLabel
   :Title="$t('profile.password')"
                  :row="'row'"
                  :title_col="'col-11'"
                  :icon_col="'col-1'"
                  :icon_style="'text-align:right'"
      :text="$t('profile.password')"
    />
    </div>
    </div>
    <div class="row" style="justify-content:center">
       <q-btn class="button" color="accent" unelevated no-caps rounded text-color="white" :label="$t('button.change_pass')" @click="change_pass=true" />
                <TalkingLabel
      :text="$t('profile.password_change')"
      :icon_style="' margin-top:7px;margin-left:10px'"                  
    />
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
    <div class="row q-pa-sm " >
      <q-input dense style=""   outlined bg-color="grey-1" v-model="password.old_password" filled :type="isPwd0 ? 'password' : 'text'" :label="$t('profile.old_pass')">
        <template v-slot:append>
          <q-icon
            :name="isPwd0? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd0 = !isPwd0"
          />
        </template>
      </q-input>
            <TalkingLabel
      :text="$t('profile.old_pass')"
      :icon_style="' margin-top:7px;margin-left:10px'"                  
    />
      </div>
    
    <div class=" row q-pa-sm " >
      <q-input dense   outlined bg-color="grey-1" v-model="password.new_password" filled :type="isPwd1 ? 'password' : 'text'" :label="$t('profile.new_pass')">
        <template v-slot:append>
          <q-icon
            :name="isPwd1? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd1 = !isPwd1"
          />
        </template>
      </q-input>
            <TalkingLabel
      :text="$t('profile.new_pass')"
      :icon_style="' margin-top:7px;margin-left:10px'"                  
    />
    </div>
    <div class="row q-pa-sm " >
      <q-input dense   outlined bg-color="grey-1" v-model="password.confirm_password" filled :type="isPwd2? 'password' : 'text'" :label="$t('profile.confirm_pass')">
        <template v-slot:append>
          <q-icon
            :name="isPwd2 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd2 = !isPwd2"
          />
        </template>
      </q-input>
            <TalkingLabel
      :text="$t('profile.confirm_pass')"
      :icon_style="' margin-top:7px;margin-left:10px'"                  
    />
      
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
      <div class="separators">
    &nbsp;
  </div>
  <div v-if="users.length >0">
  <div class=" row q-px-md header" >
   <TalkingLabel
   :Title="$t('profile.user_pref')"
                  :row="'row'"
                  :title_col="'col-11'"
                  :icon_col="'col-1'"
                  :icon_style="'text-align:right'"
      :text="$t('profile.user_pref')"
    />
    </div>

    <div class="q-px-md" style="display: flex;" v-for="user_top in users" :key="user_top.id">
    <div  style="padding-top:8px;" >
      <q-img style="width:24px; height:24px"  :src="user_top.icon"  />
    </div>
    <div style=" text-align:initial;padding-top:8px; white-space: nowrap; overflow: hidden;text-overflow: ellipsis; flex-grow:1">
      {{user_top.user_type}}
    </div>
    <div  style="text-align:right; flex-shrink:0;">
      <div class="row" style="justify-content:right">
    <q-checkbox :disable="!edit_preferences" color="accent" v-model="preferences.filter((pref)=>{return pref.id == user_top.id})[0].active" />
      <TalkingLabel
      :text="user_top.user_type"
      :icon_style="' margin-top:7px;margin-left:10px'"                  
    />
      </div>
    </div>
    </div>
    <div v-if="!edit_preferences" class="col-8 input" >
        <q-btn class="button-edit" :icon="'img:statics/icons/Icon - edit.svg'" unelevated no-caps rounded  :label="$t('button.edit')" @click="edit_preferences=!edit_preferences" />
      </div>
      <div v-else class="col-8 input" >
        <q-btn class="button-cancel" style="margin-right:10px" :icon="'img:statics/icons/Icon - X (cancel).svg'" unelevated no-caps rounded  :label="$t('button.cancel')" @click="cancelPref()" />
        <q-btn class="button-save" unelevated no-caps :icon="'img:statics/icons/Icon - Checkmark.svg'" rounded color="accent" :label="$t('button.save')" @click="editPref()" />
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
        firstName:"",
        lastName:"",
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
      this.editUserPreferences({user_id:this.$store.state.auth.user.sub, preferences:saving_pref})
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
        this.editUserPassword({userid:this.$store.state.auth.user.sub, password: this.password.new_password})
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
      this.the_user.firstName = this.the_user.legalname.substr(0, idx)
      this.the_user.lastName = this.the_user.legalname.substr(idx +1)
      console.log(this.the_user)
      this.the_user_orig=JSON.parse(JSON.stringify( this.the_user ))
      var working_user = JSON.parse(JSON.stringify(this.the_user, [ 'userid', 'firstName', 'lastName', 'email','date_of_birth','nationality','gender', 'phoneNumber']));
      console.log(working_user)
      var working_token = "testtoken"
      console.log(working_token)
      this.editUserData(working_user)
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
          userId:this.user.id,
          tenantId:this.user.umTenantId
        }
        console.log(this.user_picture)
        this.the_user.picture = this.user_picture.picture
      }
    },
  },
  created () {
    var userId = this.$store.state.auth.user.sub
    console.log("PHONE NUMBER")
    console.log(this.$store.state.auth.user["phone number"])
    console.log(userId)
    this.fetchSpecificUser(userId).then((user)=>{
      console.log(user)
      console.log("this is the user in store")
      console.log(this.user)
      this.the_user.userid = this.$store.state.auth.user.sub
      this.the_user.username = this.$store.state.auth.user.preferred_username
      this.the_user.legalname = this.$store.state.auth.user.name
      this.the_user.email = this.$store.state.auth.user.email
      this.the_user.date_of_birth = this.$store.state.auth.user.birthdate
      this.the_user.nationality = this.$store.state.auth.user.nationality
      this.the_user.gender = this.$store.state.auth.user.gender
      this.the_user.phoneNumber = this.$store.state.auth.user["phone number"]

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
}
.div-3{
}
.image{
  width:150px; 
  height:150px;
  border-radius:50%
}
.button{
  width:150px
}
.button-picture{
  border: 1px solid #FF7C44;
  box-sizing: border-box;
  border-radius: 50px;
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
  font-size:18px;
  font-weight:600;
  color: #0F3A5D;
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
}
.my-card{
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
.button-edit{
  border: 1px solid #FF7C44;
  box-sizing: border-box;
  border-radius: 50px;
}
.button-save{
border-radius: 50px;

}
.button-cancel{
  border: 1px solid #9E1F63;
box-sizing: border-box;
border-radius: 50px;
}
.separators{
  background-color:#EFEFEF;
   height:5px;
    margin-top:10px;
     margin-bottom:10px
}
</style>