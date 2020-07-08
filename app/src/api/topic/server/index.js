import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  fetchTopic (defaultLang, userLang) {
    return axiosInstance
      .get('backend/1.0.0/topics-migrant?defaultlang=' + defaultLang + '&currentlang=' + userLang)
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  }

}
