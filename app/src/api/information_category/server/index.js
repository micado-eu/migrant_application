import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  fetchInformationCategory(defaultLang, userLang) {
    return axiosInstance
      .get(`/backend/1.0.0/temp-information-categories?defaultlang=${defaultLang}&currentlang=${userLang}`)
      .then(response => { return response.data })
      .catch(error_handler);
  },
  fetchSingleInformationCategory(defaultLang, userLang, id) {
    return axiosInstance.get(`/backend/1.0.0/temp-information-category?defaultlang=${defaultLang}&currentlang=${userLang}&id=${id}`)
    .then(response => { return response.data })
    .catch(error_handler)
  }
}
