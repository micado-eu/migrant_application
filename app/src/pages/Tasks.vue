<template>
  <q-page class="flows container-fluid">
  <div class="row" >
  <div class="col" >
Your integration progress: 
    <q-circular-progress
        show-value
        class="text-light-blue q-ma-md"
        :value="progress"
        size="50px"
        track-color="grey-3"
        color="light-blue"
      />
      </div>
      </div>
      <div class="row" >
      <div class="col" >

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
        color="accent"
      >
        {{task.text}}

      </q-step>

    </q-stepper>
    </div>
    </div>
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
    },
    progress(){
      return Math.floor((this.tasks.filter(function(task) { return task.done }).length / this.tasks.length) * 100)
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
