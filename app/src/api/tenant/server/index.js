import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchTenants () {
    return axiosInstance
      .get('/tenants')
      .then((response) => response.data)
      .catch(error_handler)
  },

}
