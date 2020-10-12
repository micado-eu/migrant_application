import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchTenants () {
    return axiosInstance
      .get('/backend/1.0.0/tenants')
      .then((response) => response.data)
      .catch(error_handler)
  },

}
