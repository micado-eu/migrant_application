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
          <h5 style="padding-left:25px; margin-top:5px">{{intervention_plan.title}}</h5>
          <div class="row">
            <div
              class="col"
              style="padding-left:25px"
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
            :title="intervention.intervention_title"
            icon="work"
            :done="intervention.validated"
            :key="intervention.id"
            color="accent"
          >
            {{intervention.description}}
            <div v-if="intervention.validated">
              <q-btn
                size="11px"
                unelevated
                rounded
                color="accent"
                style="margin-top:10px; margin-left:0px"
                no-caps
                disable
                :label="$t('button.ask_validation')"
              />
            </div>
            <div v-else>
              <q-btn
                size="11px"
                unelevated
                rounded
                color="accent"
                style="margin-top:10px; margin-left:0px"
                :id="intervention.id"
                no-caps
                :disable="intervention.validationrequestdate !== null"
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
export default {
  name: 'PageIndex',
  data () {
    return {
      logged: false,
      step: 1,
      asked: []
    }
  },
  computed: {
    intervention_plans () {
      return this.$store.state.intervention_plan.intervention_plan
    },
    filteredPlans () {
      //this computed property will filter the plans by id. It will substitute intervention_plans in the html
    }

  },
  methods: {
    progress (intervention_plan) {
      return Math.floor((intervention_plan.interventions.filter(function (intervention) { return intervention.validated }).length / intervention_plan.interventions.length) * 100)
    },
    askValidation (intervention) {
      var to_validate = JSON.parse(JSON.stringify(intervention))
      this.$q.notify({
        message: 'Do you want to request validation for this intervention? ',
        color: 'info',
        actions: [
          {
            label: 'Yes', color: 'primary', handler: () => {
              console.log("answered yes")
              console.log(to_validate)
              let current_data = new Date().toISOString()
              to_validate.validationrequestdate = current_data

              this.$store.dispatch('intervention_plan/editInterventionPlan', to_validate)
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
    console.log(this.$store);
    this.$store.dispatch('intervention_plan/fetchInterventionPlan')
      .then(intervention_plans => {
        this.loading = false
      })
  }
}
</script>
