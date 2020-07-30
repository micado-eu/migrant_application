<template>
  <div>
    <span v-if="loading">Loading...</span>
    <div v-if="!loading" class="q-pa-md">
      <q-toolbar class="text-white toolbar-list q-mb-md">
        <q-toolbar-title>Information Centre</q-toolbar-title>
      </q-toolbar>
      <q-input
        color="accent"
        v-model="search"
        debounce="500"
        filled
        outlined
        label="Search"
        label-color="accent"
        class="q-mb-md"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div>
        <q-btn
          :unelevated="selectedCategory !== category"
          :outline="selectedCategory === category"
          rounded
          no-caps
          v-for="category in translatedCategories"
          :key="category.id"
          :label="category.eventCategory"
          class="q-mr-sm q-mb-md cat_btn"
          @click="addOrRemoveSelectedCategory(category)"
        />
      </div>
      <div>
        <q-btn
          :unelevated="selectedTags.indexOf(tag) == -1"
          :outline="selectedTags.indexOf(tag) !== -1"
          rounded
          no-caps
          v-for="tag in tags"
          :key="tag"
          :label="tag"
          class="q-mr-sm q-mb-md tag_btn"
          @click="addOrRemoveSelectedTag(tag)"
        />
      </div>
      <q-list bordered>
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
          <q-item-section side>
            <q-btn
              unelevated
              rounded
              no-caps
              class="cat_btn"
              :label="item.category.eventCategory"
            />
          </q-item-section>
          <q-item-section side v-for="tag in item.tags" :key="tag.id">
            <q-btn
              unelevated
              rounded
              no-caps
              class="tag_btn"
              :key="tag.id"
              :label="tag.tag"
            />
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
      selectedCategory: ""
    };
  },
  methods: {
    ...mapActions("information", ["fetchInformation"]),
    ...mapActions("information_category", ["fetchInformationCategory"]),
    ...mapActions("information_tags", ["fetchInformationTags"]),
    addOrRemoveSelectedTag(tag) {
      var index = this.selectedTags.indexOf(tag);
      if (index !== -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.filterByTags();
    },
    addOrRemoveSelectedCategory(category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = undefined;
      } else {
        this.selectedCategory = category;
      }
      this.filterByCategory();
    },
    filterByTags() {
      if (this.selectedTags.length > 0) {
        let selectedTags = this.selectedTags;
        this.filteredElementsByTags = this.translatedElements.filter(e => {
          let matchedTags = [];
          for (let tag of selectedTags) {
            for (let elemTag of e.tags) {
              if (elemTag.tag === tag) {
                // This check avoids duplicate matches
                if (matchedTags.indexOf(tag) == -1) {
                  matchedTags.push(tag);
                }
              }
            }
          }
          return matchedTags.length == selectedTags.length;
        });
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
            let idx = e.translations.findIndex(t => t.lang === this.$userLang);
            let translation = { ...e.translations[idx] };
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
            return translation;
          });
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
  background-color: $btn_secondary;
  color: black;
}
.cat_btn {
  background-color: $accent_list;
  color: black;
}
</style>
