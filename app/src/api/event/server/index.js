import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchEvents(defaultLang, userLang) {
    return axiosInstance
      .get(`/production-events?defaultlang=${defaultLang}&currentlang=${userLang}`, {
      })
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  },
  fetchEventTemp(defaultLang, userLang) {
    return axiosInstance
      .get(`/temp-events?defaultlang=${defaultLang}&currentlang=${userLang}`, {
      })
      .then((response) => {
        return response.data
      })
      .catch(error_handler)
  }
}
