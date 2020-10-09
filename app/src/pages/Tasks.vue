<template>
  <q-page class="flows container-fluid">

    <div class="row">
      <div class="col">

        <q-stepper
          v-for="intervention_plan in intervention_plans"
          :key="intervention_plan.id"
          v-model="step"
          vertical
          color="accent"
          header-nav
          animated
        >
          <h5 class="header">{{intervention_plan.title}}</h5>
          <div class="row">
            <div
              class="col pad-left"
            >
              Plan progress:
              <q-circular-progress
                show-value
                class="text-light-blue q-ma-md"
                :value="progress(intervention_plan)"
                size="50px"
                track-color="grey-3"
                color="light-blue"
              />
            </div>
          </div>
          <q-step
            v-for="intervention in intervention_plan.interventions"
            :name="intervention.id"
            :title="intervention.title"
            icon="work"
            :done="intervention.validated"
            :key="intervention.id"
            color="accent"
          >
            {{intervention.description}}
           
            <div>
              <q-btn
                size="11px"
                unelevated
                class="button"
                rounded
                color="accent"
                :id="intervention.id"
                no-caps
                :disable="intervention.validationRequestDate !== null"
                @click="askValidation(intervention)"
                :label="$t('button.ask_validation')"
              />
            </div>
          </q-step>

        </q-stepper>
      </div>
    </div>
  </q-page>
</template>

<script>

import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'

export default {
  name: 'PageIndex',
  data () {
    return {
      logged: false,
      step: 1,
      asked: [],
    }
  },
   mixins: [
    editEntityMixin,
    storeMappingMixin({
    getters: {
      intervention_plans: 'intervention_plan/intervention_plans',
    }, actions: {
      fetchInterventionPlan: 'intervention_plan/fetchInterventionPlan',

    }
  })
  
  ],
  computed: {
 
  },
  methods: {
    progress (intervention_plan) {
      return Math.floor((intervention_plan.interventions.filter(function (intervention) { return intervention.completed }).length / intervention_plan.interventions.length) * 100)
    },
    askValidation (intervention) {
      var to_validate = JSON.parse(JSON.stringify(intervention))
      var selectedPlan = this.intervention_plans.filter((plan)=>{
        return plan.id == to_validate.listId
      })[0]
      var index = selectedPlan.interventions.findIndex(item => item.id === to_validate.id)
      if (index !== -1) selectedPlan.interventions.splice(index, 1, to_validate);

      this.$q.notify({
        message: 'Do you want to request validation for this intervention? ',
        color: 'info',
        actions: [
          {
            label: 'Yes', color: 'primary', handler: () => {
              console.log("answered yes")
              console.log(to_validate)
              let current_data = new Date().toISOString()
              to_validate.validationRequestDate = current_data

              this.$store.dispatch('intervention_plan/editIntervention', {plan:selectedPlan, intervention:to_validate})
              //              this.asked.push(to_validate)
            }
          },
          { label: 'No', color: 'primary', handler: () => { console.log("rejected") } }
        ]
      })
      //this.asked.push(intervention)
    }
  },
  created () {
    var userId = this.$store.state.auth.user.umid 
    this.fetchInterventionPlan(userId)
      .then(intervention_plans => {
        console.log("I am intervention plan")
        console.log(intervention_plans)
        this.loading = false
      })
  }
}
</script>
<style scoped>
.header{
  padding-left:25px; 
  margin-top:5px
}
.pad-left{
  padding-left:25px
}
.button{
  margin-top:10px; 
  margin-left:0px
}
</style>
