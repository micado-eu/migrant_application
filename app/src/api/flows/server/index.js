import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchFlows (defaultLang, userLang) {
    return axiosInstance
      .get('backend/1.0.0/processes-migrant?defaultlang=' + defaultLang + '&currentlang=' + userLang)
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  },
  fetchDocuments (defaultLang, userLang) {
    return axiosInstance
      .get('backend/1.0.0/processes-migrant?defaultlang=' + defaultLang + '&currentlang=' + userLang)
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  },
  fetchGraph (id, userLang) {
    return axiosInstance
      .get('backend/1.0.0/mermaid?processid=' + id + '&lang=' + userLang)
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  }
}
