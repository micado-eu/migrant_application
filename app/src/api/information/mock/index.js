import information from './data/information'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

let i = 99999999999

export default {
  fetchEvents() {
    return fetch(information, 1000) // wait 1s before returning posts
  }
}
