import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
    fetchLanguages () {
        console.log("sono il client di languages")
        return axiosInstance
            .get('/backend/1.0.0/languages', {
            })
            .then((response) => {
                return response.data
            })
            .catch(error_handler);
    },
    fetchActiveLanguages () {
        console.log("sono il client di languages")
        return axiosInstance
            .get('/backend/1.0.0/languages', {
            })
            .then((response) => {
                console.log(response)
                return response.data
            })
            .catch(error_handler);
    }
}
