<template>
  <div  style="padding-top:10px">
    <div v-if="this.loading">Loading...</div>
    <div v-else>

    <div class="div-1">
  <UserButton ref="user" />
  <div class="div-2" >
     <div class="div-3 text-center" >
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
  </div>
    </div>
  <div style="background-color:#EFEFEF">
    &nbsp;
  </div>
  <q-item clicakble @click.native="documents">
   <TalkingLabel
   class="q-pa-md option"
    style="width:100%"
    :icon="'img:statics/icons/Icon - My documents.svg'"
    :icon_size="'30px'"
    :Title="$t('menu.documents')"
    :text="$t('menu.documents')"
    :row="'row'"
    :title_col="'col-10 option'"
    :icon_col="'col-2'"
    :icon_style="'text-align:right'"
    />
  </q-item>
  <div style="background-color:#EFEFEF">
    &nbsp;
  </div>
    <q-item clicakble @click.native="tasks">
   <TalkingLabel
   class="q-pa-md option"
    style="width:100%"
    :icon="'img:statics/icons/Icon - My Integration Plan.svg'"
    :icon_size="'30px'"
    :Title="$t('menu.tasks')"
    :text="$t('menu.tasks')"
    :row="'row'"
    :title_col="'col-10 option'"
    :icon_col="'col-2'"
    :icon_style="'text-align:right'"
    />
  </q-item>
  <div style="background-color:#EFEFEF">
    &nbsp;
  </div>
    <q-item clicakble @click.native="settings">
   <TalkingLabel
   class="q-pa-md option"
    style="width:100%"
    :icon="'img:statics/icons/Icon - Settings.svg'"
    :icon_size="'30px'"
    :Title="$t('menu.settings')"
    :text="$t('menu.settings')"
    :row="'row'"
    :title_col="'col-10 option'"
    :icon_col="'col-2'"
    :icon_style="'text-align:right'"
    />
  </q-item>
  <div style="background-color:#EFEFEF">
    &nbsp;
  </div>
    <div style="text-align:center; padding-top:20px">
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
    documents(){
      console.log("going to docs")
      this.$router.push({name:'document'})
    },
    settings(){
      this.$router.push({name:'settings'})
    },
    tasks(){
      this.$router.push({name:'tasks'})
    },
    logout(){
      this.$refs.user.toLogout()
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