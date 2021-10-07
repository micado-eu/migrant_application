<template>
  <div  style="padding-top:10px">
    <div v-if="this.loading">{{$t('desc_labels.loading')}}</div>
    <div v-else>
  <q-item v-if="docs_present" :disable="!($auth.loggedIn())" clicakble @click.native="documents">
   <TalkingLabel
   class="q-pa-md option"
    style="width:100%"
    :icon="'img:statics/icons/Icon - My Documents (selcted).svg'"
    :icon_size="'30px'"
    :Title="$t('menu.documents')"
    :text="$t('menu.documents')"
    :row="'row'"
    :title_col="'col-10 option'"
    :icon_col="'col-2'"
    :icon_style="'text-align:right'"
    />
  </q-item>
  <div v-if="docs_present" style="background-color:#EFEFEF; height:5px">
    &nbsp;
  </div>
    <q-item v-if="tasks_present" :disable="!($auth.loggedIn())" clicakble @click.native="tasks">
   <TalkingLabel
   class="q-pa-md option"
    style="width:100%"
    :icon="'img:statics/icons/Icon - My Integration Plan (selected1).svg'"
    :icon_size="'30px'"
    :Title="$t('menu.tasks')"
    :text="$t('menu.tasks')"
    :row="'row'"
    :title_col="'col-10 option'"
    :icon_col="'col-2'"
    :icon_style="'text-align:right'"
    />
  </q-item>
  <div v-if="tasks_present" style="background-color:#EFEFEF; height:5px">
    &nbsp;
  </div>
    <q-item :disable="!($auth.loggedIn())" clicakble @click.native="settings">
   <TalkingLabel
   class="q-pa-md option"
    style="width:100%"
    :icon="'img:statics/icons/Icon - Settings (selected).svg'"
    :icon_size="'30px'"
    :Title="$t('menu.settings')"
    :text="$t('menu.settings')"
    :row="'row'"
    :title_col="'col-10 option'"
    :icon_col="'col-2'"
    :icon_style="'text-align:right'"
    />
  </q-item>
  <div style="background-color:#EFEFEF; height:5px">
    &nbsp;
  </div>
         <div v-if="($auth.loggedIn())" style="text-align:center; padding-top:20px">
        <q-btn  class="logout"  unelevated no-caps :label="$t('desc_labels.logout')" @click="logout()" />
      </div>
  </div>
  </div>
</template>

<script>
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
        features:"features/features"

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
    UserButton,TalkingLabel
  },
  computed:{
    check(value){
      this.preferences.includes(value)
    },
    tasks_present(){
      return this.features.filter((feat)=> {return feat == "FEAT_TASKS"}).length >0
    },
    docs_present(){
      return this.features.filter((feat)=> {return feat == "FEAT_DOCUMENTS"}).length >0
    }
  },
  data () {
    return {
      isPwd0:true,
      isPwd1:true,
      isPwd2:true,
      change_pass:false,
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
    privacy(){

      this.$router.push({ name: 'privacy' })

    },
    documents(){
      console.log("going to docs")
      if(this.$auth.loggedIn()){
      this.$router.push({name:'document'})
      }
    },
    settings(){
       if(this.$auth.loggedIn()){
      this.$router.push({name:'settings'})
            }
    },
    tasks(){
            if(this.$auth.loggedIn()){
       this.$router.push({name:'tasks'})
            }
      },
     welcome(){
       this.$router.push({name:'welcome'})      
     },
     consent(){
       console.log(this.$root.$refs)
      this.$root.$refs.layout_ref.consent();
     },
    logout(){
      //this.$refs.user.toLogout()
      console.log("LOGGING OUT")
      this.$auth.logout()
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
    
   setLocale (locale) {   // set the Vue-i18n locale
     this.$i18n.locale = locale
     // load the Quasar language pack dynamically
     import(`quasar/lang/${locale}`).then(({ default: messages }) => {
       this.$q.lang.set(messages)
     })
   },
  },

  created () {
    //var userId = this.$store.state.auth.user.umid
    //console.log(userId)
    if(this.$store.state.auth.user){
          this.fetchSpecificUser(this.$store.state.auth.user.umid).then((user)=>{
      if(user.userPicture){
        this.the_user.picture= this.user.userPicture.picture
        this.the_user.picture_id= this.user.userPicture.id
        this.user_pic_orig =  this.user.userPicture.picture
      }
      else{
        this.the_user.picture= null
      }
      this.loading=false
      })
    }
    else{
      this.the_user.picture= null
            this.loading=false

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