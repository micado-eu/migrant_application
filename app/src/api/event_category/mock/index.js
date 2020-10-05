import information_category from './data/information_category'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchInformationCategory() {
    return fetch(information_category, 1000) // wait 1s before returning posts
  }
}
