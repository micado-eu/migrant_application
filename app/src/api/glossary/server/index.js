import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchGlossary(defaultLang, userLang) {
    return axiosInstance
      .get(`/backend/1.0.0/production-glossary?defaultlang=${defaultLang}&currentlang=${userLang}`, {
      })
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  },
  fetchGlossaryTemp(defaultLang, userLang) {
    return axiosInstance
      .get(`/backend/1.0.0/temp-glossary?defaultlang=${defaultLang}&currentlang=${userLang}`, {
      })
      .then((response) => {
        return response.data
      })
      .catch(error_handler)
  }
}
