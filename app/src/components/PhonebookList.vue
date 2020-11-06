<template>
  <div
    class="row"
    style="text-align:center;margin:0 auto; max-width:750px"
  >
    <div class="col">
      <q-list>
        <q-scroll-area
          id="scroll"
          ref="scrollArea"
          style="height: 555px; max-width: 100%;"
        >
          <ListItem
            v-for="process in filteredItems"
            style="display:inline-block"
            :key="process.id"
            :Title="process.process"
            :Topics="process.topics"
            :Users="process.users"
            :Link="process.id"
            :id="process.id"
            :item="process"
            :Rating="process.rating"
            @showing="showFlow"
          >
          </ListItem>
        </q-scroll-area>
      </q-list>
    </div>
    <div
      class="col-1"
      style="width:5%; padding-top:10px"
    >
      <q-list>
        <a
          clickable
          style="text-decoration:none; font-size:8px; font-family: 'Nunito Sans', sans-serif; color:black;font-weight:700"
          v-for="letter in letters"
          :id="letter"
          :key="letter"
          @click="searchByLetter($event)"
          href="javascript:void(0)"
        >
          <q-item-section style="">
            {{letter}}
          </q-item-section>
        </a>
      </q-list>
    </div>
  </div>
</template>

<script>
const ListItem = () => import('./ListItem')
export default {
  // name: 'ComponentName',
  data () {
    return {
      letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"],
      selected_letter: "",
    }
  },
  props: ["filteredItems"],
  components: {
    ListItem
  },

  methods: {
    showFlow (id) {
      console.log("opened accordion")
      console.log(id)
      const element = this.processes.filter(f => f.id == id);
      console.log(element)
      const elementFlow = element[0].mermaid
      console.log(elementFlow)
      this.mermaid = elementFlow
      this.$store.commit("flows/setNodePanelVisible", "hidden");

    },
    searchByLetter (event) {
      this.selected_letter = event.currentTarget.id
      console.log("sono in searchByLetter")
      console.log(event)
      console.log(this.selected_letter)
      var element = document.getElementById(this.selected_letter)
      console.log(element)
      var offset = element.offsetTop
      this.$refs.scrollArea.setScrollPosition(offset, 300)
    }

  }
}
</script>
