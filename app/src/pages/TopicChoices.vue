<template>
<div>
<span v-if="loading">Loading...</span>
  <div v-else>
    <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs active-color="secondary">
      <!--<q-breadcrumbs-el label="Home"  @click="index = null" />-->
      <q-breadcrumbs-el  v-for="crumb in crumbs" :key="crumb.label" :label="crumb.name" @click="navigation(crumb.id)"  />

    </q-breadcrumbs>
  </div>

    <div
    class="top-banner row"
      >
     <q-input
          class="col-12"
          outlined
          filled
          label-color="grey-8"
          bg-color="grey-2"
          v-model="search"
          :label="$t('desc_labels.search')"
          debounce="500"
          :loading="searchLoading"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
          </div>
      <div class="q-gutter-sm" style="text-align:center">
      <q-img @click="bread(topic)"  v-for="topic in to_show" :key="topic.id" :src="topic.icon" style="max-width:100px;max-heigth:100px">
        <div class="absolute-bottom text-subtitle2 text-center" style="padding-top:0px;padding-bottom:0px; font-size:12px">
        {{topic.topic}}
      </div>
      </q-img>
    </div>
  <div>
<div v-if="to_show_flows_personal.length>0 || to_show_info_personal.length>0">Based on user preferences</div>
      <ListItem v-for="element in to_show_info_personal"
            style="display:inline-block"
            :key="element.id"
            :Title="element.title"
            :Link="element.id"
            :id="element.id"
            :item="element"
            :type="'info'"
            @info="enitityDetails($event)"
            :icon="'img:statics/icons/Icon - Information Centre (selected).svg'"
            />

      <ListItem v-for="process in to_show_flows_personal"
            style="display:inline-block"
            :key="process.id"
            :Title="process.process"
            :Link="process.id"
            :id="process.id"
            :item="process"
            @flow="enitityDetails($event)"
            :type="'flow'"
            :icon="'img:statics/icons/Icon - Integration step-bystep (selected).svg'"
            />
    
 
     
  
    
     
<div v-if="to_show_flows_general.length>0 || to_show_info_general.length>0">General</div>
          <ListItem v-for="element in to_show_info_general"
            style="display:inline-block"
            :key="element.id"
            :Title="element.title"
            :Link="element.id"
            :id="element.id"
            :item="element"
            :type="'info'"
            @info="enitityDetails($event)"
            :icon="'img:statics/icons/Icon - Information Centre (selected).svg'"
            />

          <ListItem v-for="process in to_show_flows_general"
            style="display:inline-block"
            :key="process.id"
            :Title="process.process"
            :Link="process.id"
            :id="process.id"
            :item="process"
            @flow="enitityDetails($event)"
            :type="'flow'"
            :icon="'img:statics/icons/Icon - Integration step-bystep (selected).svg'"
            />

            <ListItem v-for="element in to_show_events"
            style="display:inline-block"
            :key="element.id"
            :Title="element.title"
            :Link="element.id"
            :id="element.id"
            :item="element"
            :type="'event'"
            @event="enitityDetails($event)"
            :icon="'img:statics/icons/Icon - Events (selected).svg'"
            />
      
  
    </div>
  
  </div>
</div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'
const ListItem = () => import('components/ListItem')
import idJoinMixin from "../mixin/idJoinMixin.js"


export default {
  name: 'PageIndex',
   mixins: [idJoinMixin,
    editEntityMixin,
    storeMappingMixin({
    getters: {
      processes: 'flows/processes',
      topics: 'topic/topics',
      users: 'user_type/users',
      logged_user:'user/users',
      information:'information/information',
      informationCategories:'information_category/informationCategories',
      events:'event/events',
      eventCategories:'event_category/eventCategories',
      searchResults: 'search/results'
    }, actions: {
      fetchFlows: 'flows/fetchFlows',
      fetchTopic: 'topic/fetchTopic',
      fetchUserType: 'user_type/fetchUserType',
      fetchInformation:'information/fetchInformation',
      fetchInformationCategory:'information_category/fetchInformationCategory',
      fetchEvents:'event/fetchEvents',
      fetchEventCategory:'event_category/fetchEventCategory',
      fullTextSearch: 'search/search',
      emptySearchResults: 'search/emptyResults'
    }
  })
  
  ],
  props:['topicFilter'],
  data () {
    return {
      search:'',
      searchLoading: false,
      loading:true,
      elements: [],
      elements2: [],
      crumbs:[{id:null,name:"Home"}],
      index:null
    }
  },
  computed:{
    to_show(){
      return this.$store.getters['topic/show_topics'](this.index)
    },
    to_show_flows_personal(){
      return this.$store.getters['flows/show_flows_personal'](this.index, this.getSearchIds["processes"], this.logged_user.userPreferences)
    },
    to_show_flows_general(){
      return this.$store.getters['flows/show_flows_general'](this.index, this.getSearchIds["processes"], this.logged_user.userPreferences)
    },
    to_show_events(){
      return this.$store.getters['event/show_events'](this.index, this.getSearchIds["events"])
    },
    to_show_info_personal(){
      return this.$store.getters['information/show_info_personal'](this.index, this.getSearchIds["information"],this.logged_user.userPreferences)
    },
       to_show_info_general(){
      return this.$store.getters['information/show_info_general'](this.index, this.getSearchIds["information"],this.logged_user.userPreferences)
    },
    getSearchIds() {
      if (this.searchResults) {
        // Return arrays of the ids of the elements found in the search for each entity
        return {
          "processes": this.searchResults["processes"].map((result) => result.id),
          "events": this.searchResults["events"].map((result) => result.id),
          "information": this.searchResults["information"].map((result) => result.id)
        }
      } else {
        return {
          "processes": [],
          "events": [],
          "information": []
        }
      }
    },


  },

  methods:{
    enitityDetails(value){
      console.log(value)
      if(value.type == 'flow'){
        this.$router.push({ name: 'document', params: { processid: value.processid, url:JSON.stringify(this.crumbs) } })
      }
      else if (value.type =='info'){
      this.$router.push({ name: 'info', params: { id: value.processid, url:JSON.stringify(this.crumbs) } })
      }
      else if(value.type =='event'){
        console.log(value)
      this.$router.push({ name: 'events', params: { id: value.processid, url:JSON.stringify(this.crumbs) } })
      }
    },
    navigation(id){
      console.log(this.$route)
      this.index = id
      this.search = ""
      var idx = this.crumbs.findIndex((item)=> item.id == id)
      console.log(idx)
      this.crumbs.length = idx + 1
      if(this.crumbs.length == 1){
        this.$router.push({
         name: 'home',

      })
      }
      else{
        this.$router.push({
         name: 'crumbs',
        params: {
        topicFilter: this.crumbs.join(',')
        }
      })
      }
      
    },
    bread(topic){
      var link = window.location.href 
      this.crumbs.push({id:topic.id,name:topic.topic})
      this.index = topic.id
      this.search = ""
      this.$router.push({
        name: 'crumbs',
      params: {
        topicFilter: JSON.stringify(this.crumbs) 
    }
});
this.$forceUpdate();
    }
  },
  components: {
    ListItem
  },
  watch: {
    search(val) {
      this.searchLoading = true
      if (!val) {
        this.emptySearchResults().then(() => {
          this.searchLoading = false
        })
      } else {
        this.fullTextSearch({lang: this.$userLang, words: val}).then(() => {
          this.searchLoading = false
        })
      }
      
    }
  },
    created () {
          const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
    this.loading = true
    this.fetchInformation(langs)
      .then((info) => this.fetchInformationCategory(langs))
      .then(() => this.fetchTopic(langs))
      .then(() => this.fetchUserType(langs))
      .then(() => {
        console.log("INFOOO")
        console.log(this.information)
        this.elements = JSON.parse(JSON.stringify(this.information)) // Create copy of array
        for (let i = 0; i < this.information.length; i++) {
          const information = this.information[i]
          const element = this.elements[i]
          const idx = this.informationCategories.findIndex((c) => c.id === information.category)
          if (idx !== -1) {
            element.category = this.informationCategories[idx]
          } else {
            element.category = {}
          }
          if (information.topics) {
            element.topics = information.topics
          }
          if (information.users) {
            element.users = information.users
          }
        }
        console.log("I AM ELEMETS")
        console.log(this.elements)
      })
          this.fetchEvents(langs)
      .then(() => this.fetchEventCategory(langs))
      .then(() => this.fetchTopic(langs))
      .then(() => this.fetchUserType(langs))
      .then(() => {
        console.log(this.events)
        this.elements2 = JSON.parse(JSON.stringify(this.events)) // Create copy of array
        for (let i = 0; i < this.events.length; i++) {
          const event = this.events[i]
          const element = this.elements2[i]
          const idx = this.eventCategories.findIndex((c) => c.id === event.category)
          if (idx !== -1) {
            element.category = this.eventCategories[idx]
          } else {
            element.category = {}
          }
          if (event.topics) {
            element.topics = event.topics
          }
          if (event.users) {
            element.users = event.users
          }
        }
      })
    this.loading = true
    console.log(this.$store);
    this.fetchFlows({ defaultLang: this.$defaultLang, userLang: this.$userLang })
      .then(processes => {
        console.log(processes)
        this.loading = false
      })
    this.fetchTopic({ defaultLang: this.$defaultLang, userLang: this.$userLang })  
    this.fetchUserType({ defaultLang: this.$defaultLang, userLang: this.$userLang })
    .then(user_types =>{
      console.log("in user type")
      console.log(user_types)
    })
       console.log("I M TOPICFILTER")
  var parsed_var=[]
  if(this.topicFilter){
    var parsed_var = JSON.parse(this.topicFilter)
  }
  
  if(parsed_var.length == 0){
    parsed_var = [{id:null,name:"Home"}]
  }
  this.crumbs = parsed_var
  this.index = parsed_var[(parsed_var.length - 1)].id
  console.log(this.index)
  
  
  }
  

}
</script>
<style lang="scss" scoped>
$accent_list: #ff7c44;
$secondary_list: #0f3a5d;
.list_separator {
  background-color: $accent_list;
}
.banner{
  font-style: normal;
  height:72px;
  text-align: center; 
  padding-top:15px;
  font-weight: bold;
  font-size: 22px;
  line-height: 41px;
  color:white; 
  background-color:#FF7C44
}
.toolbar-list {
  background-color: $accent_list;
}
.active {
  color: blue;
}
.top-banner{
  max-width:750px;
  margin:0 auto;
  padding-top:38px;
  padding-bottom:10px;
  padding-left: 16px;
  padding-right: 16px;
}
#main-container{
  padding-bottom:27px;
}
.image{
  max-width: 24px;
  max-height: 24px;
  margin-top:7px; 
  margin-left:10px
}
.filter_title{
  font-weight: bold;
  font-size: 16px;
  color: black;
  padding-left:20px
}
.separator{
 
  width:90%; 
  margin:0 auto
}
.pad{
  padding-left:20px
}
.filter_title_2{
  font-weight: bold;
  font-size: 16px;
  color: black;
  padding-left:20px; 
  padding-top:20px
}
.chip_image{
  max-width: 18px;
  max-height: 18px;
}
</style>