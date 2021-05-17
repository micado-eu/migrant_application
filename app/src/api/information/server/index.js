import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchInformation(defaultLang, userLang) {
    return axiosInstance
      .get(`/backend/1.0.0/production-information?defaultlang=${defaultLang}&currentlang=${userLang}`, {
      })
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  },
  fetchInformationTemp(defaultLang, userLang) {
    return axiosInstance
      .get(`/backend/1.0.0/temp-information?defaultlang=${defaultLang}&currentlang=${userLang}`, {
      })
      .then((response) => {
        return response.data
      })
      .catch(error_handler)
  }
}
