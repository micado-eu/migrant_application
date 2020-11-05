  <template>
  <div>
    <div>
      <div class="banner">
        {{$t('desc_labels.guided_processes')}}
        <q-icon
          name="img:statics/icons/Icon - Guided Processes (selected).png"
          style="padding-bottom:3px"
        />
      </div>
      <div
        class="top-banner row"
      >
        <q-input
          class="col-9"
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
      
        <q-btn
          class="q-ml-sm col"
         
          icon="img:statics/icons/Icon - Filter (24x24).png"
          @click="filter_dialog = true"
        />
      
        <q-dialog v-model="filter_dialog">
          <q-layout
            view="Lhh lpR fff"
            container
            class="bg-white"
          >
            <q-header class="bg-white">
              <q-toolbar>
                <span class="filter_title">{{$t('filters.title')}}</span>
                <q-space />
                <q-btn
                  color="red"
                  flat
                  v-close-popup
                  round
                  dense
                  icon="close"
                />
              </q-toolbar>
              <q-separator class="separator" size="2px" color="grey"/>
            </q-header>
            <q-page-container class="q-pa-sm">
              <span class="filter_title_2 row">{{$t('filters.categories')}}</span>
              <div 
                class="row pad" 
                v-for="topic in topics"
                :key="'topic'.concat(topic.id)">
                <q-checkbox
                  color="accent"
                  v-model="selected_t_tags"
                  :val="topic.id"
                  :label="topic.topic"
                  class="filter-text"
                />
                <q-img
                  class="image"
                  :src="topic.icon"
                  :key="topic.id"
                />
              </div>
              <span class="filter_title_2 row">{{$t('filters.tags')}}</span>
              <div 
                class="row pad" 
                v-for="user in users"
                :key="user.id">
                <q-checkbox
                  color="accent"
                  v-model="selected_u_tags"
                  :val="user.id"
                  :label="user.user_type"
                  class="filter-text"
                />
               <q-img
                  class="image"
                  :src="user.icon"
                  :key="'user'.concat(user.id)"
                />
              </div>
               <q-separator class="separator" size="2px" color="grey"/>
                <q-btn
                  unelevated
                  style="margin-left:25px"
                  no-caps
                  color="accent"
                  class="q-ma-sm"
                  @click="clearFilters()"
                  :label="$t('filters.clear_all')"
                />
                  
               
            </q-page-container>
          </q-layout>
        </q-dialog>
        
      </div>
      <div style="margin:0 auto;max-width: 750px;padding-left:16px; padding-right:16px; padding-bottom:10px ">
      <q-scroll-area
      horizontal
      style="height: 30px; max-width: 750px;"
      class=" rounded-borders"
    >
    <div class="row no-wrap" >
 <q-chip style="border-radius:2px" v-for="topic in selected_t_tags" square color="#ECECEC" text-color="black"  :key="topic.id">
   <q-avatar>
    <img class="chip_image" :src="topics.filter((top)=>{return top.id == topic})[0].icon">
   </q-avatar>
   {{topics.filter((top)=>{return top.id == topic})[0].topic}}
      </q-chip>
      <q-chip  rounded v-for="user in selected_u_tags"  color="#ECECEC" text-color="black"  :key="user.id">
   <q-avatar>
    <img class="chip_image" :src="users.filter((top)=>{return top.id == user})[0].icon">
   </q-avatar>
   {{users.filter((top)=>{return top.id == user})[0].user_type}}
      </q-chip>
    </div>
        </q-scroll-area>
      </div>
            <q-separator size="1px" class="list_separator"/>

     <!-- <div
        class="q-gutter-md  row justify-center items-center"
        id="main-container"
      >
        <q-btn
          size="10px"
          :class="{active: selected_u_tags.indexOf(tag) != -1}"
          v-for="tag in users"
          dense
          @click="setUserTag($event)"
          :key="tag.user_type"
          :id="tag.user_type"
        >
          <q-tooltip>
            {{tag.user_type}}
          </q-tooltip>
          <img class="image" :src="tag.icon">
        </q-btn>
        <q-separator  size="3px" color="black" vertical />
        <q-btn
          size="10px"
          v-for="tag in topics"
          dense
          rounded
          @click="setTopicTag($event)"
          :key="tag.topic"
          :id="tag.topic"
        >
          <q-tooltip>
            {{tag.topic}}
          </q-tooltip>
          <img :src="tag.icon">
        </q-btn>
      </div>-->

    </div>
    <PhonebookList :filteredItems="filteredProcesses">
    </PhonebookList>

  </div>
</template>


<script>
import ListItem from 'components/ListItem'
import _ from 'lodash'
import DocumentItem from 'components/DocumentItem'
import LabelMap from 'components/LabelMap'
import PhonebookList from 'components/PhonebookList'
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'



export default {
  name: 'Processes',

  mixins: [
    editEntityMixin,
    storeMappingMixin({
    getters: {
      processes: 'flows/processes',
      topics: 'topic/topics',
      users: 'user_type/users'
    }, actions: {
      fetchFlows: 'flows/fetchFlows',
      fetchTopic: 'topic/fetchTopic',
      fetchUserType: 'user_type/fetchUserType'
    }
  })
  
  ],
  components: {
    DocumentItem, LabelMap, ListItem, PhonebookList
  },
  data () {
    return {
      filter_dialog:false,
      letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"],
      selected_letter: "",
      user: null,
      topic: null,
      u_tags: [

      ],
            t_tags: [      ],
      selected_u_tags: [],
      selected_t_tags: [],
      search: '',
     
    }
  },
  computed: {
  
    filteredProcesses () {
      const { flow, orderBy, groupBy, flatMap, get } = _
      const groupItems = flow([
        arr => orderBy(arr, 'process'),
        arr => groupBy(arr, o => get(o, 'process[0]', '').toUpperCase()),
        groups => flatMap(groups, (v, k) => [
          k,
          ...v
        ])
      ])
      var orderedProcesses = groupItems(this.processes)
      //if none of the fields is filled in it will give the full list of processes
      if (this.search == "" && this.selected_u_tags.length == 0 && this.selected_t_tags.length == 0) {
        return orderedProcesses
      }
      else if (this.selected_u_tags.lenght != 0 || this.search != "" || this.selected_t_tags.lenght != 0) {
        return groupItems(this.processes.filter((filt) => {
          //Splits the search field and puts the words in an array
          var lowerCase = this.search.toLowerCase()
          var searchArray = lowerCase.split(" ")
          if (searchArray.every(string => filt.process.toLowerCase().includes(string)) &&
            this.selected_u_tags.every(item => {
              if(filt.users){
              for (let i = 0; i < filt.users.length; i++) {
                if (item == filt.users[i]) {
                  return item == filt.users[i]
                  break;
                }
              }
              }
            }) &&
            this.selected_t_tags.every(item => {
              if(filt.topics){
              for (let i = 0; i < filt.topics.length; i++) {
                if (item == filt.topics[i]) {
                  return item == filt.topics[i]
                  break;
                }
              }
              }
            })
          ) {
            return true;
          }        }))
      }
    },
  },
  methods: {
   
    clearFilters(){
      this.selected_t_tags=[]
      this.selected_u_tags = []
      this.filter_dialog = false
    },
    
    setUserTag (event) {
      //the Q-select passe an array of objects, so this takes the value property of the objects and puts them into an array
      var tag = event.currentTarget.id
      console.log("i am the tag")
      console.log(tag)
      var tag_id = this.users.filter((a_user) => {return a_user.user_type ==tag})[0].id
      console.log(tag_id)
      var button = document.getElementById(tag)
      console.log(button.style.backgroundColor)
      if (button.style.backgroundColor == "") {
        console.log("colore")
        button.style.backgroundColor = "#D3D3D3"
        console.log(button.style.backgroundColor)
      }
      else {
        button.style.backgroundColor = ""
      }
      var index = this.selected_u_tags.indexOf(String(tag_id))
      if (index !== -1) {
        this.selected_u_tags.splice(index, 1);
      } else {
        this.selected_u_tags.push(String(tag_id))
      }
      console.log(this.selected_u_tags)
    },
    clearUser () {
      //clears the array and makes possible the refresh of the filter
      this.selected_u_tags = []
      console.log("cleared t-tags")
      console.log(this.selected_u_tags)
      return this.selected_u_tags
    },

    setTopicTag (value) {
      var tag = event.currentTarget.id
      var button = document.getElementById(tag)
      console.log("i am the tag")
      console.log(tag)
      var tag_id = this.topics.filter((a_topic) => {return a_topic.topic ==tag})[0].id
      console.log(button.style.backgroundColor)
      if (button.style.backgroundColor == "") {
        console.log("colore")
        button.style.backgroundColor = "#D3D3D3"
        console.log(button.style.backgroundColor)
      }
      else {
        button.style.backgroundColor = ""
      }
      var index = this.selected_t_tags.indexOf(String(tag_id))
      if (index !== -1) {
        this.selected_t_tags.splice(index, 1);
      } else {
        this.selected_t_tags.push(String(tag_id))
      }
      console.log(this.selected_t_tags)
    },
    clearTopic () {
      this.selected_t_tags = []
      console.log("cleared t-tags")
      console.log(this.selected_t_tags)
      return this.selected_t_tags
    }
  },
  created () {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
