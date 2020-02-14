import axios from 'axios'

export default {
  fetchGlossary() {
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.data)
  }
}
