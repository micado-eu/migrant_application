import axios from 'axios'

export default {
    fetchActiveLanguages() {
        return axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.data)
    }
}
