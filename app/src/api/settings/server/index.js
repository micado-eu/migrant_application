import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
    fetchSettings () {
        return axiosInstance
            .get('/settings')
            .then((response) => {
                return response.data
            })
            .catch(error_handler);
    },
    fetchMixedSettings (defaultLang, userLang) {
        return axiosInstance
            .get('/t-settings-migrant?defaultlang=' + defaultLang + '&currentlang=' + userLang)
            .then((response) => {
                return response.data
            })
            .catch(error_handler)
    },
}
