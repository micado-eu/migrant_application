import { axiosInstance } from 'boot/axios'
import jsonpAdapter from 'axios-jsonp'


export default {
    getWord (params) {
        //      return ChatbotRepository().get('/wordwise/entries?limit=1&headword=' + params.word, { adapter: jsonpAdapter })

        console.log("in the chatbot service calling")
        console.log(params)
        return axiosInstance.post('/bot/v01/webhooks/rest/webhook', { "sender": "aziz11", "message": params.word })
        //        return axiosInstance.post('/webhooks/rest/webhook', { "sender": "aziz11", "message": params.word }, { baseURL: 'http://localhost:5005' })
    }
}
