<template>
  <div>
    <span v-if="loading">Loading...</span>
    <div
      v-if="!loading"
      class="q-pa-md"
    >
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
      <q-btn
        unelevated
        rounded
        no-caps
        :color="selectedTags.indexOf(tag) == -1 ? 'accent' : 'primary'"
        v-for="tag in tags"
        :key="tag"
        :label="tag"
        class="q-mr-sm q-mb-md"
        @click="addOrRemoveSelectedTag(tag)"
      />
      <q-list bordered>
        <q-item
          v-for="item in filteredElements"
          :key="item.id"
          clickable
          @mouseover="hovered=item.id"
          @mouseleave="hovered=-1"
          :to="goToNewItem(item.id)"
        >
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
          <q-item-section
            side
            v-for="tag in item.tags"
            :key="tag"
          >
            <q-btn
              unelevated
              rounded
              color="accent"
              no-caps
              :key="tag"
              :label="tag"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
import Fuse from 'fuse.js'
import { mapGetters, mapActions } from "vuex"
export default {
  data() {
    return {
      loading: true,
      hovered: -1,
      elements: [],
      filteredElementsBySearch: [],
      filteredElementsByTags: [],
      searchText: "",
      tags: [],
      selectedTags: []
    }
  },
  methods: {
    ...mapActions("information", ["fetchInformation"]),
    addOrRemoveSelectedTag(tag) {
      var index = this.selectedTags.indexOf(tag)
      if (index !== -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag)
      }
      this.filterByTags()
    },
    filterByTags() {
      if (this.selectedTags.length > 0) {
        let selectedTags = this.selectedTags;
        this.filteredElementsByTags = this.elements.filter(e => {
          for (let tag of selectedTags) {
            if (e.tags.indexOf(tag) == -1) {
              return false
            }
          }
          return true;
        });
      } else {
        this.filteredElementsByTags = this.elements
      }

    },
    goToNewItem(id) {
      return "/information/" + id
    }
  },
  computed: {
    ...mapGetters("information", ["information"]),
    search: {
      get() {
        return this.searchText
      },
      set(newSearch) {
        if (newSearch) {
          const fuse = new Fuse(this.elements, {
            keys: ['title'],
          })
          this.filteredElementsBySearch = fuse.search(newSearch).map(i => i.item)
          this.searchText = newSearch
        } else {
          this.filteredElementsBySearch = this.elements
          this.searchText = ""
        }
      }
    },
    filteredElements() {
      var filteredElementsByTags = this.filteredElementsByTags
      return this.filteredElementsBySearch.filter(function (n) {
        return filteredElementsByTags.indexOf(n) !== -1;
      });
    }
  },
  created() {
    this.loading = true
    this.fetchInformation().then(() => {
      this.elements = this.information
      this.filteredElementsByTags = this.information
      this.filteredElementsBySearch = this.information
      for (let elem of this.elements) {
        if (elem.tags) {
          for (let tag of elem.tags) {
            if (this.tags.indexOf(tag) == -1) {
              this.tags.push(tag)
            }
          }
        }
      }
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
$accent_list: #ff7c44;
.toolbar-list {
  background-color: $accent_list;
  border-radius: 10px;
}
</style>