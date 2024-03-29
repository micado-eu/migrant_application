import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchFlows (defaultLang, userLang) {
    return axiosInstance
      .get('/processes-migrant?defaultlang=' + defaultLang + '&currentlang=' + userLang)
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  },
  fetchFlowsTemp (defaultLang, userLang) {
    return axiosInstance
      .get('/temp-processes-migrant?defaultlang=' + defaultLang + '&currentlang=' + userLang)
      .then((response) => {
        return response.data
      })
      .catch(error_handler)
  },
  fetchDocuments (defaultLang, userLang) {
    return axiosInstance
      .get('/processes-migrant?defaultlang=' + defaultLang + '&currentlang=' + userLang)
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  },
  fetchGraph (id, userLang, defaultLang) {
    return axiosInstance
      .get('/mermaid?processid=' + id + '&lang=' + userLang + '&defaultlang=' + defaultLang)
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  },
  
}
