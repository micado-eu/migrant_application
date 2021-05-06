import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  search(lang, words) {
    console.log(" i AM SEARCH APIU" + words)
    return axiosInstance
      .get(`/backend/1.0.0/search?lang=${lang}&words=${words}`)
      .then(response => { return response.data })
      .catch(error_handler)
  },
  searchFull(lang, words, topicid) {
    return axiosInstance
      .get(`/backend/1.0.0/search-full?lang=${lang}&words=${words}&topicid=${topicid}`)
      .then(response => { return response.data })
      .catch(error_handler)
  },
}
