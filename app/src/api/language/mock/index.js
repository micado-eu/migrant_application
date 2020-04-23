import languages from "./data/languages";
const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchActiveLanguages () {
    return fetch(languages, 1000) // wait 1s before returning languages
  }
}
