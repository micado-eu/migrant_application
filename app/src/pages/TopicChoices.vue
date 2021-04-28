<template>
<div>
<span v-if="loading">Loading...</span>
  <div v-else>
    <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs active-color="secondary">
      <q-breadcrumbs-el class="crumb" label="Home" icon='img:statics/icons/Icon - Home (crumb).svg' @click="home()" />
      <q-breadcrumbs-el class="crumb"   v-for="crumbo in crumbs" :id="crumbo.id" :key="crumbo.label" :label="crumbo.name" :icon="bread_icon(crumbo.id)" @click="navigation(crumbo.id)"  />

    </q-breadcrumbs>
  </div>
  <div style="background-color:#EFEFEF; height:5px">
    &nbsp;
  </div>
    <div
    class="top-banner row"
      >
     <q-input
          class="col-12"
          outlined
          filled
          dense
          style="border-radius: 5px;"
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
  <div style="background-color:#EFEFEF; margin-bottom:10px; height:5px">
    &nbsp;
  </div>
      <div class="row topic_layout">    
      <div class="q-gutter-sm col" @click="bread(topic)" v-for="topic in to_show" :key="topic.id" style="text-align:center; background-color:#FAFAFA; max-width:100px; min-width:100px;height:100px; margin-left:10px; margin-right:10px; margin-top:10px">
        <TalkingLabel
                style="margin-left:0px; margin-top:0px; margin-right:10px"
                  :text="topic.topic"
                  :row="'row'"
                  :title_col="' ellipsis col-11'"
                  :icon_col="'col-1'"
                  :icon_style="'text-align:right'"
                />
      <q-img  :src="topic.icon" style="margin-left:0px;max-width:40px;max-heigth:40px" />
      <div class="topic_names" >
        {{topic.topic}}
      </div>
    </div>
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
            :icon="'img:statics/icons/Icon - Information Centre.svg'"
            :size="'sm'"
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
            :icon="'img:statics/icons/Icon - Integration step-bystep.svg'"
            :size="'sm'"
            />
        <ListItem v-for="element in to_show_events_personal"
            style="display:inline-block"
            :key="element.id"
            :Title="element.title"
            :Link="element.id"
            :id="element.id"
            :item="element"
            :type="'event'"
            @event="enitityDetails($event)"
            :icon="'img:statics/icons/Icon - Events.svg'"
            :size="'sm'"
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
            :icon="'img:statics/icons/Icon - Information Centre.svg'"
            :size="'sm'"
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
            :icon="'img:statics/icons/Icon - Integration step-bystep.svg'"
            :size="'sm'"
            />

            <ListItem v-for="element in to_show_events_general"
            style="display:inline-block"
            :key="element.id"
            :Title="element.title"
            :Link="element.id"
            :id="element.id"
            :item="element"
            :type="'event'"
            @event="enitityDetails($event)"
            :icon="'img:statics/icons/Icon - Events.svg'"
            :size="'sm'"
            />
      
  
    </div>
  
  </div>
</div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'
const ListItem = () => import('components/ListItem')
const TalkingLabel = () => import('components/TalkingLabel')
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
      searchResults: 'search/results',
      
    }, actions: {
      fetchFlows: 'flows/fetchFlows',
      fetchTopic: 'topic/fetchTopic',
      fetchUserType: 'user_type/fetchUserType',
      fetchInformation:'information/fetchInformation',
      fetchInformationCategory:'information_category/fetchInformationCategory',
      fetchEvents:'event/fetchEvents',
      fetchEventCategory:'event_category/fetchEventCategory',
      fullTextSearch: 'search/searchFull',
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
      crumbs:[],
      index:null
    }
  },
  computed:{
    
    to_show(){
      return this.$store.getters['topic/show_topics'](this.index)
    },
    to_show_flows_personal(){
      if(this.searchResults){
        if(this.searchResults.processes){
          console.log("search results")
          return this.$store.getters['search/show_flows_search_personal'](this.index, this.logged_user.userPreferences)
        }
        else{
          console.log("no process results")
          return []
        }
      }
      else{
        console.log("normale results")
        return this.$store.getters['flows/show_flows_personal'](this.index, this.logged_user.userPreferences)
      }
    },
    to_show_flows_general(){
      if(this.searchResults){
        if(this.searchResults.processes){
          console.log("search results")
           return this.$store.getters['search/show_flows_search_general'](this.index, this.logged_user.userPreferences)
        }
        else{
          console.log("no process results")
          return []
        }
        
      }
      else{
        console.log("normale results")
         return this.$store.getters['flows/show_flows_general'](this.index, this.logged_user.userPreferences)
      }
     
    },
    to_show_events_personal(){
      if(this.searchResults){
        if(this.searchResults.events){
          console.log("search results")
           return this.$store.getters['search/show_event_search_personal'](this.index, this.logged_user.userPreferences)
        }
        else{
          console.log("no event results")
          return []
        }
        
      }
      else{
        console.log("normale results")
         return this.$store.getters['event/show_event_personal'](this.index, this.logged_user.userPreferences)
      }
      
    },
        to_show_events_general(){
      if(this.searchResults){
        if(this.searchResults.events){
          console.log("search results")
           return this.$store.getters['search/show_event_search_general'](this.index, this.logged_user.userPreferences)
        }
        else{
          console.log("no event results")
          return []
        }
        
      }
      else{
        console.log("normale results")
         return this.$store.getters['event/show_event_general'](this.index, this.logged_user.userPreferences)
      }
      
    },
    to_show_info_personal(){
      if(this.searchResults){
        if(this.searchResults.processes){
          console.log("search results")
           return this.$store.getters['search/show_info_search_personal'](this.index,this.logged_user.userPreferences)
        }
        else{
          console.log("no info results")
          return []
        }
        
      }
      else{
        console.log("normale results")
         return this.$store.getters['information/show_info_personal'](this.index,this.logged_user.userPreferences)
      }
      
    },
       to_show_info_general(){
      if(this.searchResults){
        if(this.searchResults.processes){
          console.log("search results")
           return this.$store.getters['search/show_info_search_general'](this.index,this.logged_user.userPreferences)
        }
        else{
          console.log("no info results")
          return []
        }
        
      }
      else{
        console.log("normale results")
         return this.$store.getters['information/show_info_general'](this.index,this.logged_user.userPreferences)
      }
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
    bread_icon(id){
      console.log(id)
      console.log("Inside bread icon")
      var topico= this.topics.filter((top)=>{
        return top.id == id
      })[0].icon
      return 'img:'+topico
    },
    enitityDetails(value){
      console.log(value)
      if(value.type == 'flow'){
        this.$router.push({ name: 'process', params: { processid: value.processid, url:JSON.stringify(this.crumbs) } })
      }
      else if (value.type =='info'){
      this.$router.push({ name: 'info', params: { id: value.processid, url:JSON.stringify(this.crumbs) } })
      }
      else if(value.type =='event'){
        console.log(value)
      this.$router.push({ name: 'events', params: { id: value.processid, url:JSON.stringify(this.crumbs) } })
      }
    },
    home(){
      this.index = null
      this.crumbs = []
      this.$router.push({path:'/'})
    },
    navigation(id){
      console.log(this.$route)
      this.index = id
      this.search = ""
      var idx = this.crumbs.findIndex((item)=> item.id == id)
      console.log(idx)
      this.crumbs.length = idx + 1
     /*if(this.crumbs.length == 1){
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
      }*/
      console.log("before going to new topic")
      this.$router.push({
         name: 'crumbs',
        params: {
        topicFilter: this.crumbs.join(',')
        }
      })
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
    ListItem,TalkingLabel
  },
  watch: {
    search(val) {
      this.searchLoading = true
      if (!val) {
        this.emptySearchResults().then(() => {
          this.searchLoading = false
        })
      } else {
        this.fullTextSearch({lang: this.$userLang, words: val, topicid:this.index}).then(() => {
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
  
  /*if(parsed_var.length == 0){
    parsed_var = [{id:null,name:"Home", icon:'img:statics/icons/Icon - Home (crumb).svg'}]
  }*/
  this.crumbs = parsed_var
  if(parsed_var.length == 0){
    this.index = null
  }
  else{
    this.index = parsed_var[(parsed_var.length - 1)].id
  }
  //this.index = parsed_var[(parsed_var.length - 1)].id
  console.log(this.index)
  
  this.$store.commit('search/emptyResults')
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
  padding-top:20px;
  padding-bottom:20px;
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
.topic_names{
  color: #5C81A2;
  margin-left:0px;
  padding-top:0px;
  padding-bottom:0px;
  font-size:12px
}
.topic_layout{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow:row wrap;
}
.crumb{
  border-radius:5px;
  border-style:solid;
  border-width: thin;
  padding-left:5px;
  padding-right:5px
}
</style>