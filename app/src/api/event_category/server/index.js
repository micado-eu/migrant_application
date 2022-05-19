import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  fetchEventCategory(defaultLang, userLang) {
    return axiosInstance
      .get(`/temp-event-categories?defaultlang=${defaultLang}&currentlang=${userLang}`)
      .then(response => { return response.data })
      .catch(error_handler)
  },
  fetchSingleEventCategory(defaultLang, userLang, id) {
    return axiosInstance.get(`/temp-event-category?defaultlang=${defaultLang}&currentlang=${userLang}&id=${id}`)
    .then(response => { return response.data })
    .catch(error_handler)
  }
}
