import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchUser (username, tenant) {
    console.log(username, tenant)
    return axiosInstance
      .get('/backend/1.0.0/users?filter[include][0][relation]=attributes&filter[include][1][relation]=interventionPlans&filter[where][and][0][umUserName][eq]=' + username + '&filter[where][and][1][umTenantId]=' + tenant + '&filter[fields]=umId')
      .then(response => { return response.data })
      .catch(error_handler);
  },
}
