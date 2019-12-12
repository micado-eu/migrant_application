import client from 'api-chatbot-client'

//export function someAction (context) {
export function fetchMessages (state, data) {
      return client
        .fetchMessages()
        .then(messages => state.commit('setMessages', messages))
}
