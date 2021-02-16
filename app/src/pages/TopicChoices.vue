<template>
<div>
<span v-if="loading">Loading...</span>
  <div v-else>
    <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el v-for="crumb in crumbs" :key="crumb.label" :label="crumb.name" :to="crumb.url" />

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
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
          </div>
  <div>
  <q-expansion-item
        expand-separator
        icon="mail"
        label="Processes"
      >
      <ListItem v-for="process in processes"
            style="display:inline-block"
            :key="process.id"
            :Title="process.process"
            :Topics="process.topics"
            :Users="process.users"
            :Link="process.id"
            :id="process.id"
            :item="process"
            :Rating="process.rating"
            />
  </q-expansion-item>
    <q-expansion-item
        expand-separator
        icon="mail"
        label="Information"
      >
           <ListItem v-for="element in elements"
            style="display:inline-block"
            :key="element.id"
            :Title="element.title"
            :Topics="element.topics"
            :Users="element.users"
            :Link="element.id"
            :id="element.id"
            :item="element"
            :Rating="element.rating"
            />
     
  </q-expansion-item>
    <q-expansion-item
        expand-separator
        icon="mail"
        label="Events"
      >
      <ListItem v-for="element in elements2"
            style="display:inline-block"
            :key="element.id"
            :Title="element.title"
            :Topics="element.topics"
            :Users="element.users"
            :Link="element.id"
            :id="element.id"
            :item="element"
            :Rating="element.rating"
            />
      
  </q-expansion-item>
    </div>
    <div class="q-gutter-sm" style="text-align:center">
      <q-img @click="bread(topic.topic)"  v-for="topic in topics" :key="topic.id" :src="topic.icon" style="max-width:100px;max-heigth:100px">
        <div class="absolute-bottom text-subtitle2 text-center" style="padding-top:0px;padding-bottom:0px">
        {{topic.topic}}
      </div>
      </q-img>
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
      information:'information/information',
      informationCategories:'information_category/informationCategories',
      events:'event/events',
      eventCategories:'event_category/eventCategories'
    }, actions: {
      fetchFlows: 'flows/fetchFlows',
      fetchTopic: 'topic/fetchTopic',
      fetchUserType: 'user_type/fetchUserType',
      fetchInformation:'information/fetchInformation',
      fetchInformationCategory:'information_category/fetchInformationCategory',
      fetchEvents:'event/fetchEvents',
      fetchEventCategory:'event_category/fetchEventCategory'
    }
  })
  
  ],
  data () {
    return {
      search:'',
      loading:true,
      elements: [],
      elements2: [],
      crumbs:[]
    }
  },
  methods:{
    bread(name){
      var link = window.location.href 
      this.crumbs.push({name:name, url:name})
    }
  },
  components: {
    ListItem
  },
    created () {
          const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
    this.loading = true
    this.fetchInformation(langs)
      .then((info) => this.fetchInformationCategory(langs))
      .then(() => this.fetchTopic(langs))
      .then(() => this.fetchUserType(langs))
      .then(() => {
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