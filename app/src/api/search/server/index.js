import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  search(lang, words) {
    return axiosInstance
      .get(`/backend/1.0.0/search?lang=${lang}&words=${words}`)
      .then(response => { return response.data })
      .catch(error_handler)
  },
}
