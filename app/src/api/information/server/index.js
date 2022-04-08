import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchInformation(defaultLang, userLang) {
    return axiosInstance
      .get(`/production-information?defaultlang=${defaultLang}&currentlang=${userLang}`, {
      })
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  },
  fetchInformationTemp(defaultLang, userLang) {
    return axiosInstance
      .get(`/temp-information?defaultlang=${defaultLang}&currentlang=${userLang}`, {
      })
      .then((response) => {
        return response.data
      })
      .catch(error_handler)
  }
}
