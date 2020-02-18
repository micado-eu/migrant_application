<template>
  <div class="glossary">
    <span v-if="loading">Loading…</span>
    <div v-else class="container">
      <div >
        <GlossaryItem v-for="a_glossary in glossary" :key="a_glossary.id" :theGlossary="a_glossary" v-feature-flipping="a_glossary.feature">
        </GlossaryItem>
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
