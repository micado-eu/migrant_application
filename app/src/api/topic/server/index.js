import { axiosInstance } from 'boot/axios'

function error_handler (error) {
  console.log("ERROR IN CALLING API MANAGER")
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
}

export default {
  fetchTopic () {
    return axiosInstance
      .get('backend/1.0.0/topics-migrant?defaultlang=en&currentlang=it')
      .then(response => response.data)
      .catch(error_handler);
  }

}
