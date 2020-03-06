<template>
    <div class="decision">
        <span v-if="loading">Loading…</span>
            <div v-else class="container">
              <h3 style="text-align : center">{{this.title}}</h3>
                <div>
                    <DecisionTree @option="updateTitle"></DecisionTree>
                </div>
            </div>
    </div>
</template>

<script>
import DecisionTree from 'components/DecisionTree'

export default {

  name: 'decision',
  //props: {
  //  msg: String
  //},

  data () {
    return {
      loading: false,
      title: "What do you need?",
      }
  },

  components: {
    DecisionTree
  },

  created () {
    this.loading = true
    this.$store.dispatch('decisions/fetchDecisions')
      .then(decisions => {
        this.loading = false
      })
    }, 

  methods: {
    updateTitle(value) {
      this.title = value
    }
  }
}


</script>