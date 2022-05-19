import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  fetchTopic (defaultLang, userLang) {
    return axiosInstance
      .get('/topics-migrant?defaultlang=' + defaultLang + '&currentlang=' + userLang)
      .then((response) => {
        return response.data
      })
      .catch(error_handler);
  }

}
