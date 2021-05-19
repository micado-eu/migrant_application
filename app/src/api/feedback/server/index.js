import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
    saveFeedback(payload) {
        return axiosInstance
            .post('/backend/1.0.0/feedbacks', payload)
            .then((response) => {
                return response.data
            })
            .catch(error_handler);
    },
    saveRatings(payload){
        return axiosInstance
        .post('/backend/1.0.0/ratings', payload)
        .then((response) => {
            return response.data
        })
        .catch(error_handler);
    }
}
