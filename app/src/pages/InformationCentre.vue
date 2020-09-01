<template>
  <div>
    <span v-if="loading">Loading...</span>
    <div v-if="!loading">
      <div style="font-style: normal;height:72px;text-align: center; padding-top:15px;font-weight: bold;font-size: 22px;line-height: 41px;color:white; background-color:#FF7C44">
        {{$t('desc_labels.information_centre')}}
        <q-icon name="img:statics/icons/Icon - Information Centre (selected) (30x30).png"></q-icon>
      </div>
      <div class="row q-ma-md">
        <q-input
          color="accent"
          v-model="search"
          debounce="500"
          filled
          outlined
          :label="$t('desc_labels.search')"
          label-color="accent"
          class="col-9"
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
              <q-separator/>
            </q-header>
            <q-page-container class="q-pa-sm">
              <span class="filter_title row">{{$t('filters.categories')}}</span>
              <div 
                class="row" 
                v-for="category in translatedCategories"
                :key="category.id">
                <q-radio
                  color="accent"
                  v-model="selectedCategory"
                  :val="category"
                  :label="category.eventCategory"
                  @input="filterByCategory()"
                  class="filter-text"
                />
              </div>
              <span class="filter_title row">{{$t('filters.tags')}}</span>
              <div 
                class="row" 
                v-for="tag in tags"
                :key="tag">
                <q-checkbox
                  color="accent"
                  v-model="selectedTags"
                  :val="tag"
                  :label="tag"
                  class="filter-text"
                  @input="filterByTags()"
                />
              </div>
              <a
                class="row"
                href="javascript:void(0)"
                @click="clearFilters()"
              >
                {{$t("filters.clear_all")}}
              </a>
            </q-page-container>
          </q-layout>
        </q-dialog>
      </div>
      <div class="row q-my-sm" v-if="selectedCategory || selectedTags.length > 0">
        <q-btn 
          class="q-mx-md q-mb-md category_btn" 
          no-caps 
          v-if="selectedCategory"
        >
          {{selectedCategory.eventCategory}}
        </q-btn>
        <q-btn 
          round
          no-caps
          class="q-mr-md q-mb-md tag_btn"
          v-for="tag in selectedTags"
          :key="tag"
        >
          {{tag}}
        </q-btn>
      </div>
      <q-separator class="list_separator"/>
      <q-list bordered class="q-ma-md">
        <q-item
          v-for="item in filteredElements"
          :key="item.id"
          clickable
          @mouseover="hovered = item.id"
          @mouseleave="hovered = -1"
          :to="goToNewItem(item.id)"
        >
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
import Fuse from "fuse.js";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: true,
      hovered: -1,
      translatedElements: [],
      translatedCategories: [],
      filteredElementsBySearch: [],
      filteredElementsByTags: [],
      searchText: "",
      tags: [],
      selectedTags: [],
      selectedCategory: undefined,
      filter_dialog: false
    };
  },
  methods: {
    ...mapActions("information", ["fetchInformation"]),
    ...mapActions("information_category", ["fetchInformationCategory"]),
    ...mapActions("information_tags", ["fetchInformationTags"]),
    filterByTags() {
      if (this.selectedTags.length > 0) {
        this.filteredElementsByTags = [];
        for (let e of this.translatedElements) {
          let matchedTags = []
          for (let tag of this.selectedTags) {
            if (e.tags) {
              for (let elemTag of e.tags) {
                if (elemTag.tag === tag) {
                  // This check avoids duplicate matches
                  if (matchedTags.indexOf(tag) == -1) {
                    matchedTags.push(tag)
                  }
                }
              }
            }
          }
          if (matchedTags.length == this.selectedTags.length) {
            this.filteredElementsByTags.push(e)
          }
        }
      } else {
        this.filteredElementsByTags = this.translatedElements;
      }
    },
    filterByCategory() {
      if (this.selectedCategory) {
        this.filteredElementsByCategory = this.translatedElements.filter(e => {
          if (e.category !== this.selectedCategory) {
            return false;
          }
          return true;
        });
      } else {
        this.filteredElementsByCategory = this.translatedElements;
      }
    },
    updatePublish(newValue, item) {
      this.update_publish_fn({ id: item.id, published: newValue }).then(() => {
        this.publishState[item.id] = newValue;
      });
    },
    compareTranslationDates(a, b) {
      return new Date(b.translationDate) - new Date(a.translationDate)
    },
    clearFilters() {
      this.selectedTags = [];
      this.selectedCategory = undefined;
      this.filteredElementsByTags = this.translatedElements;
      this.filteredElementsByCategory = this.translatedElements;
    },
    goToNewItem(id) {
      return "/information/" + id;
    }
  },
  computed: {
    ...mapGetters("information", ["information"]),
    ...mapGetters("information_category", ["informationCategories"]),
    ...mapGetters("information_tags", ["informationTagsByEvent"]),
    search: {
      get() {
        return this.searchText;
      },
      set(newSearch) {
        if (newSearch) {
          const fuse = new Fuse(this.translatedElements, {
            keys: ["title"]
          });
          this.filteredElementsBySearch = fuse
            .search(newSearch)
            .map(i => i.item);
          this.searchText = newSearch;
        } else {
          this.filteredElementsBySearch = this.translatedElements;
          this.searchText = "";
        }
      }
    },
    filteredElements: {
      cache: false,
      get() {
        var filteredElementsByTags = this.filteredElementsByTags;
        var filteredElementsByCategory = this.filteredElementsByCategory;
        return this.filteredElementsBySearch.filter(function(n) {
          return (
            filteredElementsByTags.indexOf(n) !== -1 &&
            filteredElementsByCategory.indexOf(n) !== -1
          );
        });
      }
    }
  },
  created() {
    this.loading = true;
    this.fetchInformation().then(() => {
      this.fetchInformationCategory().then(() => {
        this.fetchInformationTags().then(() => {
          let informationCategoryElems = [...this.informationCategories];
          let informationElems = JSON.parse(JSON.stringify(this.information));
          this.translatedElements = informationElems.map(e => {
            let translation = undefined;
            if (e.translations) {
              let idx = e.translations.findIndex(t => t.lang === this.$userLang);
              translation = { ...e.translations[idx] };
              // Set categories-elements relations
              let idxCat = e.category;
              let idxCategoryObject = informationCategoryElems.findIndex(
                ic => ic.id === idxCat
              );
              idxCat = informationCategoryElems[
                idxCategoryObject
              ].translations.findIndex(t => t.lang === this.$userLang);
              translation.category =
                informationCategoryElems[idxCategoryObject].translations[idxCat];
              if (this.translatedCategories.indexOf(translation.category) == -1) {
                this.translatedCategories.push(translation.category);
              }
              // Set tag-elements relations
              e.tags = this.informationTagsByEvent(e.id);
              // Tags
              if (e.tags.length > 0) {
                let tagTranslations = [];
                for (let tag of e.tags) {
                  let translations = tag.translations.filter(
                    tag => tag.lang === this.$userLang
                  );
                  if (translations.length > 0) {
                    tagTranslations.push(translations[0]);
                    if (this.tags.indexOf(translations[0].tag) == -1) {
                      this.tags.push(translations[0].tag);
                    }
                  }
                }
                translation.tags = tagTranslations;
              }
            }
            return translation;
          });
          this.translatedElements = this.translatedElements.filter(e => e !== undefined)
          this.translatedElements.sort(this.compareTranslationDates)
          this.filteredElementsByTags = this.translatedElements;
          this.filteredElementsBySearch = this.translatedElements;
          this.filteredElementsByCategory = this.translatedElements;
          this.loading = false;
        });
      });
    });
  }
};
</script>

<style lang="scss" scoped>
$accent_list: #ff7c44;
$btn_secondary: #cdd0d2;
.toolbar-list {
  background-color: $accent_list;
  border-radius: 10px;
}
.tag_btn {
  background-color: #3994BD;
  color: white;
  border-radius: 32px;
  padding: 3px 12px;
}
.cat_btn {
  background-color: $accent_list;
  color: black;
}
.filter_title{
  color: black;
  font-weight: bold;
}
.list_separator {
  background-color: $accent_list;
}
.category_btn {
  background-color: #26627E;
  color: white;
}
</style>
