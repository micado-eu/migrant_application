<template>
  <div class="">
     <div class="banner">
        {{$t('desc_labels.integration_plan')}}
        <q-icon
          name="img:statics/icons/Icon - My Integration Plan (selected).svg"
          style="padding-bottom:2px"
        />
      </div>
     <q-list class="q-pa-md">
  <IntegrationPlan  
  :completed="progress(intervention_plan) == 100"
  v-for="intervention_plan in intervention_plans"
   :key="intervention_plan.id"
   :plan="intervention_plan.title"
   :completion="progress(intervention_plan)"
   :planid="intervention_plan.id"
   >
                <TalkingLabel
                  style="margin:auto"
                  :text="intervention_plan.title"
                />
  </IntegrationPlan>
     </q-list>
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
  </div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'
import IntegrationPlan from 'components/IntegrationPlan'
const TalkingLabel = () => import('components/TalkingLabel')
export default {
  name: 'PlanList',
  components:{
    IntegrationPlan, TalkingLabel
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
  methods: {
    progress (intervention_plan) {
      console.log(intervention_plan)
      return Math.floor((intervention_plan.interventions.filter(function (intervention) { return intervention.completed }).length / intervention_plan.interventions.length) * 100)
    },
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
.not_completed{
  background-color: white;
  color:#0F3A5D;
  border: 1px solid #0F3A5D;
  border-radius: 5px;
  margin-bottom:10px;

}
.completed{
  background-color: #0F3A5D;
  color:white;
  border: 1px solid #0F3A5D;
  border-radius: 5px;
  margin-bottom:10px;

}
  .go_back {
  background-color: white;
  color:#0F3A5D;
  border: 1px solid #0F3A5D;
  border-radius: 50px;
}
</style>
