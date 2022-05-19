import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchGlossary(defaultLang, userLang) {
    return axiosInstance
      .get(`/production-glossary?defaultlang=${defaultLang}&currentlang=${userLang}`, {
      })
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  },
  fetchGlossaryTemp(defaultLang, userLang) {
    return axiosInstance
      .get(`/temp-glossary?defaultlang=${defaultLang}&currentlang=${userLang}`, {
      })
      .then((response) => {
        return response.data
      })
      .catch(error_handler)
  }
}
