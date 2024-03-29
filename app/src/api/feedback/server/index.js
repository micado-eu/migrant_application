import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
    saveFeedback(payload) {
        return axiosInstance
            .post('/feedbacks', payload)
            .then((response) => {
                return response.data
            })
            .catch(error_handler);
    },
    saveRatings(payload){
        return axiosInstance
        .post('/ratings', payload)
        .then((response) => {
            return response.data
        })
        .catch(error_handler);
    }
}
