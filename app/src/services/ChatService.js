import { axiosInstance }  from 'boot/axios'
import jsonpAdapter from 'axios-jsonp'


export default {
    getWord (params) {
//      return ChatbotRepository().get('/wordwise/entries?limit=1&headword=' + params.word, { adapter: jsonpAdapter })
      return axiosInstance.post('/bot/v01/webhooks/rest/webhook', {"sender":"aziz11","message":"hi"})
    }
}
