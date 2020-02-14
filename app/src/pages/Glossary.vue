<template>
  <div class="glossary">
    <span v-if="loading">Loading…</span>
    <div v-else class="container">
      <div  >
        <GlossaryItem v-for="glossary in glossary" :key="glossary.id" :theGlossary="glossary">
        </GlossaryItem>
      </div>
      <div class="row" v-if="($mq === 'mobile')">
          <b-list-group>
            <b-list-group-item v-for="glossary in glossary" :key="glossary.id" href="#" active class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ glossary.title }}</h5>
                <small>3 days ago</small>
              </div>

              <p class="mb-1">
                {{ glossary.text }}
              </p>
              <p class="mb-1" v-for>
               {{glossary.tags}}
               </p>
              <small>Donec id elit non mi porta.</small>
            </b-list-group-item>
            <b-list-group-item>
              <b-list-group>
                <b-list-group-item>Cras justo odio</b-list-group-item>
                <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
                <b-list-group-item>Morbi leo risus</b-list-group-item>
                <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
                <b-list-group-item>Vestibulum at eros</b-list-group-item>
              </b-list-group>
            </b-list-group-item>
          </b-list-group>
          <b-dropdown split split-variant="outline-primary" variant="primary">
            <template slot="button-content">
              <span class="house-mobile">Custom</span> <strong>Content</strong> with <em>HTML</em> via Slot
            </template>
            <b-dropdown-item href="#">An item</b-dropdown-item>
            <b-dropdown-item href="#">Another item</b-dropdown-item>
          </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import GlossaryItem from 'components/GlossaryItem'

export default {
  name: 'glossary',
  props: {
    msg: String
  },
  data () {
    return {
      loading: false
    }
  },
  components: {
    GlossaryItem
  },

  computed: {
    glossary () {
      return this.$store.state.glossary.glossary
    }
  },

  created () {
    this.loading = true
    this.$store.dispatch('glossary/fetchGlossary')
      .then(glossary => {
        this.loading = false
      })
  }
}

</script>

<style scoped>
.container {
  padding-left: 10px;
}
</style>