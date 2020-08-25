import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  fetchInformationTags() {
    return axiosInstance
      .get('/backend/1.0.0/event-tags?filter[include][0][relation]=translations')
      .then(response => { return response.data })
      .catch(error_handler);
  }
}
