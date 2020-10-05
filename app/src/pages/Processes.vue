  <template>
  <div>
    <div>
      <q-toolbar class="toolbar-list q-mb-md">
        <q-icon
          name="img:statics/icons/Guided Processes (600x600) white.png"
          size="xl"
          class="q-mx-auto"
        />
      </q-toolbar>
      <div
        class="top-banner"
      >

        <q-input
          dense
          label-color="grey-8"
          rounded
          outlined
          bg-color="grey-2"
          v-model="search"
          :label="$t('desc_labels.search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div
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
      </div>

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
              for (let i = 0; i < filt.users.length; i++) {
                if (item == filt.users[i]) {
                  return item == filt.users[i]
                  break;
                }
              }
            }) &&
            this.selected_t_tags.every(item => {
              for (let i = 0; i < filt.topics.length; i++) {
                if (item == filt.topics[i]) {
                  return item == filt.topics[i]
                  break;
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
.toolbar-list {
  background-color: $accent_list;
}
.active {
  color: blue;
}
.top-banner{
  max-width:280px;
  margin:0 auto;
  padding-top:38px;
  padding-bottom:10px;
}
#main-container{
  padding-bottom:27px;
}
.image{
  max-width: 24px;
  max-height: 24px;
}

</style>
