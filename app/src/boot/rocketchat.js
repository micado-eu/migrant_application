import {RealTimeAPI} from 'rocket.chat.realtime.api.rxjs'

export default ({ Vue }) => {
    //axiosInstance.defaults.baseURL = 'https://' + Vue.prototype.$envconfig.apiUrl
    //axiosInstance.defaults.headers.common['apikey'] = Vue.prototype.$envconfig.apiKey
    let rocketChatRealTimeApiUrl = "wss://" + Vue.prototype.$envconfig.rocketchatUrl +"/websocket"
    let rcClient = new RealTimeAPI(rocketChatRealTimeApiUrl)
    console.log(rcClient)
    //let rcApi = rcClient.connectToRocketChat(rocketChatRealTimeApiUrl)
    Vue.prototype.$rcClient = rcClient
    //Vue.prototype.$rcApi = rcApi
    console.log("rocketchat booted")
  }
  