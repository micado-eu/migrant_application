import chatbot from './data/chatbot'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchMessages () {
    return fetch(chatbot, 1000) // wait 1s before returning posts
  }
}
