<template>
  <div>
    <div>
      <div style="font-style: normal;height:72px;text-align: center; padding-top:15px;font-weight: bold;font-size: 22px;line-height: 41px;color:white; background-color:#FF7C44">
        {{$t(title)}}
        <q-icon :name="icon"></q-icon>
      </div>
      <div class="row q-ma-md">
        <q-input
          color="accent"
          v-model="search"
          debounce="500"
          filled
          outlined
          :label="$t('desc_labels.search')"
          class="col-9"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          class="q-ml-sm col"
          icon="img:statics/icons/Icon - Filter (24x24).png"
          data-cy="filter_button"
          @click="filter_dialog = true"
        />
        <q-dialog v-model="filter_dialog">
          <q-layout
            view="lHr lpR lfr"
            container
            class="bg-white"
          >
            <q-header
              bordered
              class="bg-white"
            >
              <q-toolbar>
                <span class="filter-title">{{$t('filters.title')}}</span>
                <q-space />
                <q-btn
                  color="red"
                  flat
                  v-close-popup
                  round
                  dense
                  icon="close"
                  data-cy="close_popup_button"
                />
              </q-toolbar>
            </q-header>
            <q-page-container class="filter-container q-pa-sm">
              <span class="filter-title row q-mt-sm">{{$t('filters.categories')}}</span>
              <div
                class="row"
                v-for="category in translatedCategories"
                :key="'category' + category.id"
              >
                <q-radio
                  color="accent"
                  v-model="categoryToSelect"
                  :val="category"
                  :label="category.category"
                  class="filter-text"
                />
              </div>
              <q-separator />
              <span
                class="filter-title row q-mt-sm"
                v-if="usedTopics.length > 0"
              >{{$t('filters.topics')}}</span>
              <div
                v-for="topic in usedTopics"
                :key="'topic' + topic.id"
              >
                <q-checkbox
                  color="accent"
                  v-model="topicsToSelect"
                  :val="topic"
                  :label="topic.topic"
                />
                <q-img
                  :src="topic.icon"
                  spinner-color="white"
                  id="image"
                  :alt="topic.topic"
                  class="filter-icon q-ml-sm"
                  :img-style="{'max-width': '24px', 'max-height': '24px'}"
                >
                  <q-tooltip :key="'topic_tooltip'.concat(topic.id)">
                    {{topic.topic}}
                  </q-tooltip>
                </q-img>
              </div>
              <q-separator />
              <span
                class="filter-title row q-mt-sm"
                v-if="usedUserTypes.length > 0"
              >{{$t('filters.user_types')}}</span>
              <div
                v-for="userType in usedUserTypes"
                :key="'userType' + userType.id"
              >
                <q-checkbox
                  color="accent"
                  v-model="userTypesToSelect"
                  :val="userType"
                  :label="userType.user_type"
                />
                <q-img
                  :src="userType.icon"
                  spinner-color="white"
                  id="image"
                  :alt="userType.user_type"
                  class="filter-icon q-ml-sm"
                  :img-style="{'max-width': '24px', 'max-height': '24px'}"
                >
                  <q-tooltip :key="'userType_tooltip'.concat(userType.id)">
                    {{userType.user_type}}
                  </q-tooltip>
                </q-img>
              </div>
              <q-separator />
              <span
                class="filter-title row q-mt-sm"
                v-if="is_event"
              >{{$t('filters.date')}}</span>
              <date-time-selector
                class="q-mr-md"
                @inputDate="dateToSelect = $event"
                @inputTime="timeToSelect = $event"
                :date="selectedDate"
                :time="selectedTime"
              ></date-time-selector>
            </q-page-container>
            <q-footer
              bordered
              class="bg-white"
            >
              <q-btn
                outline
                no-caps
                color="red"
                class="q-ma-sm clear-btn"
                @click="clearFilters()"
              >
                {{$t("filters.clear_all")}}
              </q-btn>
              <q-btn
                unelevated
                no-caps
                color="accent"
                class="q-ma-sm apply-btn"
                @click="applyFilters()"
                v-close-popup
              >
                {{$t("filters.apply")}}
              </q-btn>
            </q-footer>
          </q-layout>
        </q-dialog>
      </div>
      <div
        class="q-my-sm q-ml-sm applied-filters"
        v-if="selectedCategory || selectedTopics.length > 0 || selectedUserTypes.length > 0 || selectedDate"
      >
        <q-btn
          class="q-mx-sm q-mb-md category-btn"
          no-caps
          v-if="selectedCategory"
        >
          {{selectedCategory.category}}
        </q-btn>
        <q-btn
          class="q-mx-sm q-mb-md category-btn"
          no-caps
          v-for="topic in selectedTopics"
          :key="'topicBtn-' + topic.id"
        >
          {{topic.topic}}
        </q-btn>
        <q-btn
          class="q-mx-sm q-mb-md category-btn"
          no-caps
          v-for="userType in selectedUserTypes"
          :key="'userTypeBtn-' + userType.id"
        >
          {{userType.user_type}}
        </q-btn>
        <q-btn
          class="q-mx-sm q-mb-md category-btn"
          no-caps
          v-if="selectedDate !== ''"
        >
          {{selectedDate + " " + selectedTime}}
        </q-btn>
      </div>
      <q-separator class="list_separator" />
      <q-list
        bordered
        class="q-ma-md"
        v-if="filteredElements.length > 0"
      >
        <q-item
          v-for="item in filteredElements"
          :key="item.id"
          clickable
          @mouseover="hovered = item.id"
          @mouseleave="hovered = -1"
          :to="item_url_fn(item.id)"
          :data-cy="'item' + item.id"
        >
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <span
        class="q-ma-md"
        v-else
      >{{$t(missing_content_label)}}</span>
    </div>
  </div>
</template>
<script>
import Fuse from "fuse.js"
import { mapGetters } from "vuex"
import DateTimeSelector from './DateTimeSelector.vue'
export default {
  components: {
    DateTimeSelector
  },
  props: {
    elements: {
      type: Array,
      default: function () {
        return []
      }
    },
    categories: {
      type: Array,
      default: function () {
        return []
      }
    },
    title: String,
    icon: String,
    item_url_fn: {
      type: Function,
      default: function () {
        return () => "/"
      },
    },
    missing_content_label: {
      type: String,
      default: ""
    },
    is_event: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hovered: -1,
      translatedElements: [],
      translatedCategories: [],
      filteredElementsByCategory: [],
      filteredElementsBySearch: [],
      filteredElementsByTopics: [],
      filteredElementsByUserTypes: [],
      filteredElementsByDate: [],
      searchText: "",
      categoryToSelect: undefined,
      selectedCategory: undefined,
      selectedTopics: [],
      topicsToSelect: [],
      selectedUserTypes: [],
      userTypesToSelect: [],
      selectedDate: '',
      dateToSelect: '',
      selectedTime: '',
      timeToSelect: '',
      usedTopics: [],
      usedUserTypes: [],
      filter_dialog: false
    }
  },
  methods: {
    applyFilters() {
      this.selectedCategory = this.categoryToSelect
      this.selectedTopics = this.topicsToSelect
      this.selectedUserTypes = this.userTypesToSelect
      this.selectedDate = this.dateToSelect
      this.selectedTime = this.timeToSelect
      this.filterByCategory()
      this.filterByTopics()
      this.filterByUserTypes()
      this.filterByDate()
    },
    filterByCategory() {
      if (this.selectedCategory) {
        this.filteredElementsByCategory = this.translatedElements.filter((e) => {
          return e.category === this.selectedCategory
        })
      } else {
        this.filteredElementsByCategory = this.translatedElements
      }
    },
    filterByTopics() {
      if (this.selectedTopics.length > 0) {
        this.filteredElementsByTopics = []
        for (const e of this.translatedElements) {
          const matchedTopics = []
          for (const topic of this.selectedTopics) {
            if (e.topics) {
              for (const elemTopic of e.topics) {
                if (elemTopic.id === topic.id) {
                  // This check avoids duplicate matches
                  if (matchedTopics.indexOf(topic.id) == -1) {
                    matchedTopics.push(topic)
                  }
                }
              }
            }
          }
          if (matchedTopics.length == this.selectedTopics.length) {
            this.filteredElementsByTopics.push(e)
          }
        }
      } else {
        this.filteredElementsByTopics = this.translatedElements
      }
    },
    filterByUserTypes() {
      if (this.selectedUserTypes.length > 0) {
        this.filteredElementsByUserTypes = []
        for (const e of this.translatedElements) {
          const matchedUserTypes = []
          for (const userType of this.selectedUserTypes) {
            if (e.userTypes) {
              for (const elemUserType of e.userTypes) {
                if (elemUserType.id === userType.id) {
                  // This check avoids duplicate matches
                  if (matchedUserTypes.indexOf(userType.id) == -1) {
                    matchedUserTypes.push(userType)
                  }
                }
              }
            }
          }
          if (matchedUserTypes.length == this.selectedUserTypes.length) {
            this.filteredElementsByUserTypes.push(e)
          }
        }
      } else {
        this.filteredElementsByUserTypes = this.translatedElements
      }
    },
    filterByDate() {
      if (this.selectedDate) {
        let fullDate
        if (this.selectedTime) {
          fullDate = new Date(this.selectedDate + ' ' + this.selectedTime)
        } else {
          fullDate = new Date(this.selectedDate)
        }
        this.filteredElementsByDate = []
        for (const e of this.translatedElements) {
          const fullStartDate = new Date(e.startDate)
          const fullFinishDate = new Date(e.endDate)
          if (fullDate >= fullStartDate && fullDate <= fullFinishDate) {
            this.filteredElementsByDate.push(e)
          }
        }
      } else {
        this.filteredElementsByDate = this.translatedElements
      }
    },
    compareTranslationDates(a, b) {
      return new Date(b.translationDate) - new Date(a.translationDate)
    },
    clearFilters() {
      this.selectedCategory = undefined
      this.categoryToSelect = undefined
      this.selectedTopics = []
      this.topicsToSelect = []
      this.selectedUserTypes = []
      this.userTypesToSelect = []
      this.selectedDate = ''
      this.dateToSelect = ''
      this.selectedTime = ''
      this.timeToSelect = ''
      this.filteredElementsByCategory = this.translatedElements
      this.filteredElementsByTopics = this.translatedElements
      this.filteredElementsByUserTypes = this.translatedElements
      this.filteredElementsByDate = this.translatedElements
    }
  },
  computed: {
    ...mapGetters('topic', ['topics']),
    ...mapGetters('user_type', ['users']),
    search: {
      get() {
        return this.searchText
      },
      set(newSearch) {
        let keys = ['title', 'description']
        if (this.is_event) {
          keys.push('location')
        }
        if (newSearch) {
          const fuse = new Fuse(this.translatedElements, {
            keys
          })
          this.filteredElementsBySearch = fuse
            .search(newSearch)
            .map(i => i.item)
          this.searchText = newSearch
        } else {
          this.filteredElementsBySearch = this.translatedElements
          this.searchText = ""
        }
      }
    },
    filteredElements() {
      const { filteredElementsByCategory } = this
      const { filteredElementsByTopics } = this
      const { filteredElementsByUserTypes } = this
      const { filteredElementsByDate } = this
      return this.filteredElementsBySearch.filter(
        (n) => filteredElementsByCategory.indexOf(n) !== -1
          && filteredElementsByTopics.indexOf(n) !== -1
          && filteredElementsByUserTypes.indexOf(n) !== -1
          && filteredElementsByDate.indexOf(n) !== -1
      )
    },
  },
  created() {
    this.translatedElements = this.elements.map(e => {
      let translation = undefined
      translation = { ...e }
      if (e.category) {
        if (this.translatedCategories.findIndex((c) => c.id === e.category.id) === -1) {
          this.translatedCategories.push(e.category)
        }
      }
      if (e.topics && e.topics.length > 0) {
        for (let i = 0; i < e.topics.length; i++) {
          const finalTopic = e.topics[i]
          if (this.usedTopics.findIndex((c) => c.id === finalTopic.id) === -1) {
            this.usedTopics.push(finalTopic)
          }
        }
      }
      if (e.users && e.users.length > 0) {
        for (let i = 0; i < e.users.length; i++) {
          const finalUserTypes = e.users[i]
          if (this.usedUserTypes.findIndex((c) => c.id === finalUserTypes.id) === -1) {
            this.usedUserTypes.push(finalUserTypes)
          }
        }
      }
      if (e.startDate && e.endDate) {
        let lang = this.$userLang
        if (lang === "zh_Hans") {
          lang = "zh-Hans-CN"
        }
        if (lang === "fa_IR") {
          lang = "fa"
        }
        const startDate = new Date(e.startDate)
        const finishDate = new Date(e.endDate)
        try { 
          translation.startDate = `${startDate.getUTCFullYear()}-` +
            `${startDate.getUTCMonth() + 1}-` +
            `${startDate.getUTCDate()} ` +
            `${startDate.getUTCHours().toLocaleString(lang, { minimumIntegerDigits: 2 })}:` +
            `${startDate.getUTCMinutes().toLocaleString(lang, { minimumIntegerDigits: 2 })}`
          translation.endDate = `${finishDate.getUTCFullYear()}-` +
            `${finishDate.getUTCMonth() + 1}-` +
            `${finishDate.getUTCDate()} ` +
            `${finishDate.getUTCHours().toLocaleString(lang, { minimumIntegerDigits: 2 })}:` +
            `${finishDate.getUTCMinutes().toLocaleString(lang, { minimumIntegerDigits: 2 })}`
        } catch (e) {
          translation.startDate = `${startDate.getUTCFullYear()}-` +
            `${startDate.getUTCMonth() + 1}-` +
            `${startDate.getUTCDate()} ` +
            `${startDate.getUTCHours().toLocaleString("en", { minimumIntegerDigits: 2 })}:` +
            `${startDate.getUTCMinutes().toLocaleString("en", { minimumIntegerDigits: 2 })}`
          translation.endDate = `${finishDate.getUTCFullYear()}-` +
            `${finishDate.getUTCMonth() + 1}-` +
            `${finishDate.getUTCDate()} ` +
            `${finishDate.getUTCHours().toLocaleString("en", { minimumIntegerDigits: 2 })}:` +
            `${finishDate.getUTCMinutes().toLocaleString("en", { minimumIntegerDigits: 2 })}`
        }
      }
      return translation
    })
    this.translatedElements = this.translatedElements.filter(e => e !== undefined && e.title)
    this.translatedElements.sort(this.compareTranslationDates)
    this.filteredElementsBySearch = this.translatedElements
    this.filteredElementsByCategory = this.translatedElements
    this.filteredElementsByTopics = this.translatedElements
    this.filteredElementsByUserTypes = this.translatedElements
    this.filteredElementsByDate = this.translatedElements
  }
}
</script>

<style lang="scss" scoped>
$accent_list: #ff7c44;
$btn_secondary: #cdd0d2;
.toolbar-list {
  background-color: $accent_list;
  border-radius: 10px;
}
.filter-title {
  color: black;
  font-weight: bold;
}
.list_separator {
  background-color: $accent_list;
}
.category-btn {
  background-color: #e0e0e0;
}
.clear-btn {
  border-radius: 50px;
}
.apply-btn {
  border-radius: 50px;
}
.filter-icon {
  max-height: 24px;
  max-width: 24px;
}
</style>
