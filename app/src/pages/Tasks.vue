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
            <div class="col pad-left">
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
            :data-cy="'intervention'.concat(intervention.id)"
            :name="intervention.id"
            :title="intervention.title"
            icon="work"
            :key="intervention.id"
            color="accent"
            :done="intervention.completed"
          >
            {{intervention.description}}

            <div>
              <q-btn
                size="11px"
                unelevated
                class="button"
                rounded
                color="accent"
                :data-cy="'validateintervention'.concat(intervention.id)"
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
    <q-dialog
      v-model="ask_validation"
      persistent
    >
      <q-card style="min-width: 350px">
        <q-card-section>
          <div
            class="text-h6"
            v-if="need_validators"
          >{{$t('tasks.dialog_title_org')}}</div>
          <div
            class="text-h6"
            v-if="!need_validators"
          >{{$t('tasks.dialog_title_self')}}</div>
        </q-card-section>
        <q-card-section v-if="need_validators">
          <div id="div-4"> {{$t('tasks.integration_type_validators')}} </div>
          <q-select
            filled
            clearable
            v-model="selectedValidator"
            emit-value
            map-options
            id="select"
            :options="validatorsOptions"
            :label="$t('tasks.integration_type_validators')"
          />
        </q-card-section>
        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            :label="$t('button.cancel')"
            color="accent"
            v-close-popup
          />
          <q-btn
            :label="$t('tasks.you_validate')"
            color="accent"
            @click="saveSelfValidationRequest()"
            v-close-popup
            v-if="!need_validators"
          />
          <q-btn
            :label="$t('tasks.ask_validation')"
            color="accent"
            @click="saveValidationRequest()"
            v-close-popup
            v-if="need_validators"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      validatorsOptions: [],
      selectedValidator: null,
      selectedIntervention: null,
      selectedPlanId: null,
      need_validators: false,
      ask_validation: false
    }
  },
  mixins: [
    editEntityMixin,
    storeMappingMixin({
      getters: {
        intervention_plans: 'intervention_plan/intervention_plans',
        tenants: 'tenant/tenants'
      }, actions: {
        fetchInterventionPlan: 'intervention_plan/fetchInterventionPlan',
        fetchValidatorsTenants: 'intervention_plan/fetchValidatorsTenants',
        updateIntervention: 'intervention_plan/updateIntervention',
        fetchTenants: 'tenant/fetchTenants'
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
      console.log("in dialog")
      console.log(intervention)
      this.ask_validation = true
      this.selectedIntervention = intervention.id
      this.selectedPlanId = intervention.listId
      // Create the option for the select with the validating tenants of the single intervention
      this.fetchValidatorsTenants(intervention.interventionType)
        .then((validators) => {
          console.log("validators")
          console.log(validators)
          console.log(this.tenants)
          if (validators.length > 0) {
            this.need_validators = true
            validators.forEach((validator) => {
              this.validatorsOptions.push({ value: validator.tenantId, label: this.tenants.filter((ten) => { return (ten.id == validator.tenantId) })[0].name })
            })
          }
        })

    },
    saveValidationRequest () {
      // updating the intervention with the tenantid and the current date
      let current_data = new Date().toISOString()
      console.log("saveValidationRequest")
      this.updateIntervention({ interventionId: this.selectedIntervention, tenantId: this.selectedValidator, requestDate: current_data, planId: this.selectedPlanId })
        .then((result) => {
          console.log(result)
          var userId = this.$store.state.auth.user.umid
          this.ask_validation = false
          this.selectedValidator = null
          this.selectedIntervention = null
          this.selectedPlanId = null
          this.fetchInterventionPlan(userId)
        })
    },
    saveSelfValidationRequest () {
      // updating the intervention with the tenantid and the current date
      let current_data = new Date().toISOString()
      console.log("saveValidationRequest")
      this.updateIntervention({ interventionId: this.selectedIntervention, tenantId: this.$migrant_tenant, requestDate: current_data, planId: this.selectedPlanId })
        .then((result) => {
          console.log(result)
          var userId = this.$store.state.auth.user.umid
          this.ask_validation = false
          this.selectedValidator = null
          this.selectedIntervention = null
          this.selectedPlanId = null
          this.fetchInterventionPlan(userId)
        })
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
    this.fetchTenants()
      .then((tenants) => {


      })
  }
}
</script>
<style scoped>
.header {
  padding-left: 25px;
  margin-top: 5px;
}
.pad-left {
  padding-left: 25px;
}
.button {
  margin-top: 10px;
  margin-left: 0px;
}
</style>
