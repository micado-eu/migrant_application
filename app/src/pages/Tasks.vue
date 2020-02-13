<template>
  <q-page class="flex flex-center">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      header-nav
      animated
    >
      <q-step
        v-for="task in tasks"
        :name="task.id"
        :title="task.title"
        :icon="task.icon"
        :done="task.done"
        :key="task.id"
      >
        {{task.text}}

      </q-step>

    </q-stepper>

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      logged: false,
      step: 1
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.tasks
    }
  },
  created () {
    this.$store.dispatch('tasks/fetchTasks')
      .then(tasks => {
//        this.loading = false
      })
  }
}
</script>
