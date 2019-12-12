import services from './data/services'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchServices () {
    return fetch(services, 1000) // wait 1s before returning posts
  }
}
