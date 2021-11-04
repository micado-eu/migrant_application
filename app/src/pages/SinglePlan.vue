<template>
  <q-page class="flows container-fluid" style="margin: 0 auto;">
    <div v-if="loading">Loading...</div>
    <div  v-else>
    <div class="row">
      <div class="col">

        <q-stepper
          v-model="step"
          vertical
          flat
          color="accent"
          header-nav
          animated
        >
          <h5 class="header">
                 <TalkingLabel
                  class="title"
                  :Title="the_plan.title"
                  :text="the_plan.title"
                  :row="'row'"
                  :title_col="'col-11'"
                  :container_style="'display: flex;'"
                  :icon_style="'flex-shrink:0;text-align:right;'"
                  :showing="'flex-grow:1;'"
                    />
            </h5>
            <hr style="border: 1px solid #FF7C44;">
          <div class="row" style="display: flex;">
            <h5 style="flex-grow:1" class="pad-left">
                <talking-label
                :title="$t('desc_labels.plan_progress')"
                :row="'row'"
                :showing="'padding-right:10px;padding-top:10px'"
                :icon_style="'text-align:left;padding-top:10px'"
                :text="$t('desc_labels.plan_progress')"
              ></talking-label>
            </h5>
            <div style="flex-shrink:0; text-align:right">
              <q-circular-progress
                show-value
                class="text-black q-ma-md"
                size="50px"
                :value="this.progress(the_plan)"
                track-color="grey-3"
                color="orange"
              >
              {{this.progress(the_plan)}} %
              </q-circular-progress>
            </div>
            </div>
         <hr>
          <q-step
            v-for="intervention in the_plan.interventions"
            :data-cy="'intervention'.concat(intervention.id)"
            :name="intervention.id"
            :title="intervention.title"
            icon="img:statics/icons/circle_white_36dp.svg"
            :key="intervention.id"
            color="accent"
            :done="intervention.completed"
          >
            {{intervention.description}}

            <div>
              <q-btn
                v-if="intervention.validationRequestDate == null"
                size="11px"
                unelevated
                class="validate"
                rounded
                :data-cy="'validateintervention'.concat(intervention.id)"
                :id="intervention.id"
                no-caps
                :disable="intervention.validationRequestDate !== null"
                @click="askValidation(intervention)"
                :label="$t('button.ask_validation')"
              />
               <q-btn
                v-else-if="intervention.validationRequestDate !== null && intervention.completed == false"
                size="11px"
                unelevated
                class="button-pending"
                rounded
                :data-cy="'validateintervention'.concat(intervention.id)"
                :id="intervention.id"
                no-caps
                :disable="true"
                :label="$t('button.validation_pending')"
              />
              <q-btn
                v-else-if="intervention.completed == true"
                size="11px"
                unelevated
                class="button"
                rounded
                :icon="'img:statics/icons/Icon - Checkmark.svg'"
                color="accent"
                :data-cy="'validateintervention'.concat(intervention.id)"
                :id="intervention.id"
                no-caps
                :disable="true"
                :label="$t('button.validated')"
              />
              
            </div>
          </q-step>
         <hr>

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
            @click="resetOptions"
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
    </div>
     <div style="text-align:center; padding-bottom:10px">
     <q-btn
            class="go_back"
            :label="$t('button.go_back')"
            :icon="'img:statics/icons/Icon - go back.svg'"
            rounded
            no-caps
            size="15px"
            @click="$router.go(-1)"
          />
  </div>
  <q-dialog v-model="validated_success">
        <q-card class="q-pa-md" style="padding-top: 0px">
        <div style="padding-top: 50px; text-align: center">
          <q-icon
            size="150px"
            :name="'img:statics/icons/Icon - Round checkmark blue1.svg'"
          />
          <p class="thanks">{{ $t("feedback.thanks") }}</p>
          <TalkingLabel
            class="option_3"
            style="width: 100%"
            :Title="$t('desc_labels.validation_request_successfull')"
            :text="$t('desc_labels.validation_request_successfull')"
          />
        </div>
        <div style="text-align: center; padding-top: 30px">
          <q-btn
            class="go_back"
            :label="$t('button.go_back')"
            :icon="'img:statics/icons/Icon - go back.svg'"
            rounded
            no-caps
            size="15px"
            @click="validated_success = false"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'
const TalkingLabel = () => import('components/TalkingLabel')

export default {
  name: 'PageIndex',
  props:['theplanid'],
  data () {
    return {
      the_plan:null,
      logged: false,
      step: 1,
      asked: [],
      validatorsOptions: [],
      selectedValidator: null,
      selectedIntervention: null,
      selectedPlanId: null,
      need_validators: false,
      ask_validation: false,
      loading:true,
      validated_success:false
    }
  },
  components:{
    TalkingLabel
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
    resetOptions(){
    this.need_validators = false
    this.validatorsOptions = []
    },
    progress (intervention_plan) {
      console.log(intervention_plan)
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
      this.validated_success = true
      this.resetOptions()
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
        this.the_plan = intervention_plans.filter((plan)=>{
          return plan.id == this.theplanid
        })[0]
                this.loading=false
      })
    this.fetchTenants()
      .then((tenants) => {

      })
  }
}
</script>
<style scoped>

.header {
font-family: Nunito;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 25px;
color: #0F3A5D;
margin: auto;
padding-left: 15px;
padding-right: 15px;
padding-bottom: 25px;
padding-bottom: 20px;

}
.pad-left {
  padding-left: 15px;
  font-family: Nunito;
font-style: normal;
font-weight: bold;
font-size: 15px;
line-height: 18px;
}
.button {
  margin-top: 10px;
  margin-left: 0px;
}
.banner{
  font-style: normal;
  height:72px;
  text-align: center; 
  padding-top:15px;
  font-weight: bold;
  font-size: 22px;
  line-height: 41px;
  color:white; 
  background-color:#FF7C44
}
.validate {
  background-color: white;
  color: #3994BD;
  border: 1px solid #3994BD;
  width: 150px;
  margin-right: 15px;
  margin-top: 10px;
  margin-left: 0px;
}
.button-pending{
  background-color: #3994BD;
  color:white;
  margin-top: 10px;
  margin-left: 0px;
}
.pad{
background-color: blue;}
  .go_back {
  background-color: white;
  color:#0F3A5D;
  border: 1px solid #0F3A5D;
  border-radius: 50px;
}
</style>
