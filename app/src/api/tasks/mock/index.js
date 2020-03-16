import tasks from './data/tasks'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchTasks () {
    return fetch(tasks, 1000) // wait 1s before returning posts
  }
}
