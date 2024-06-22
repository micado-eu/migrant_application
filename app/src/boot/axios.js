import axios from 'axios'
import qs from 'qs'

const axiosInstance = axios.create({
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
  baseURL: 'https://api.micado.local',
  "headers": {
  }
})

export default ({ Vue }) => {
  axiosInstance.defaults.baseURL = 'https://' + Vue.prototype.$envconfig.apiUrl
//  axiosInstance.defaults.headers.common['apikey'] = Vue.prototype.$envconfig.apiKey
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
