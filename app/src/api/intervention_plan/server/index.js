import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchInterventionPlan () {
    console.log("CALLING API!!!!")
    return axiosInstance
      .get('/backend/1.0.0/individual-intervention-plans-migrant?lang=en&user_id=1')
      .then(response => response.data)
      .catch(error_handler);

  },
  updateInterventionPlan (intervention_plan) {
    console.log("call to update DB")
    console.log(intervention_plan)
    let filter = { id: { eq: intervention_plan.id } }
    // have to remap
    let intervention_plan_data = {
      id: intervention_plan.id,
      listId: intervention_plan.lit_id,
      interventionType: intervention_plan.intervention_type,
      validationDate: intervention_plan.validation_date,
      completed: intervention_plan.completed,
      validatingUserId: intervention_plan.validating_user_id,
      validatingUserTenant: intervention_plan.validating_user_tenant,
      validationRequestDate: intervention_plan.validationrequestdate
    }
    let url = '/backend/1.0.0/individual-intervention-plans/' + intervention_plan.list_id + '/individual-intervention-plan-interventions?where=' + JSON.stringify(filter)
    console.log(url)
    return axiosInstance
      .patch(url, intervention_plan_data)
      .then(response => response.data)
      .catch(error_handler);

  },
  saveIntegrationCategory (integration_category) {
    console.log("fake call to save to DB")
    console.log(integration_category)
    // create fake id here
    integration_category.id = 999
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(integration_category)
      }, 0)
    })
  },
  deleteIntegrationCategory (integration_category) {
    console.log("fake call to save to DB")
    console.log(integration_category)
    // create fake id here
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(integration_category)
      }, 0)
    })
  }
}
