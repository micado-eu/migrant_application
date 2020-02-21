import axios from 'axios'

export default {
  fetchFeatures () {
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.data)
  }
}
