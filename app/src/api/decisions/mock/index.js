import decisions from './data/decisions'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchDecisions() {
    return fetch(decisions, 1000) // wait 1s before returning posts
  }
}
