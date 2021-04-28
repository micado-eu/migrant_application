import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchUser (username, tenant) {
    console.log(username, tenant)
    return axiosInstance
      .get('/backend/1.0.0/users?filter[include][0][relation]=attributes&filter[include][1][relation]=interventionPlans&filter[where][and][0][umUserName][eq]=' + username + '&filter[where][and][1][umTenantId]=' + tenant + '&filter[fields]=umId')
      .then(response => { return response.data })
      .catch(error_handler);
  },
  fetchSpecificUser (id) {
    return axiosInstance
      .get(`/backend/1.0.0/users/${id}?filter[include][0][relation]=attributes&filter[include][1][relation]=interventionPlans&filter[include][2][relation]=tenant&filter[include][3][relation]=userPicture&filter[include][4][relation]=userPreferences`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  fetchSpecificUserByTenant (id, tenant) {
    return axiosInstance
      .get(`/backend/1.0.0/users/${id}?filter[include][0][relation]=attributes&filter[include][1][relation]=interventionPlans&filter[include][2][relation]=tenant&filter[include][3][relation]=userPicture&filter[include][4][relation]=userPreferences&filter[where][and][5][umTenantId]=` + tenant)
      .then((response) => response.data)
      .catch(error_handler)
  },
  saveUserPicture(picture){
    const workingPic= JSON.parse(JSON.stringify(picture, ['picture', 'userId', 'tenantId']))
    return axiosInstance
      .post('/backend/1.0.0/user-pictures', workingPic)
      .then(response => { return response.data })
      .catch(error_handler);
  },
  editUserPicture(pic, id){
    return axiosInstance
      .patch('/backend/1.0.0/user-pictures/' + id, {picture:pic})
      .then(response => { return response.data })
      .catch(error_handler);
  },
  editUserData(user, token){
    return axiosInstance
      .patch('/backend/1.0.0/updateUser?payload=' +user + '&tenant=carbon.super')
      .then(response => { return response.data })
      .catch(error_handler);
  },
  editUserPassword(admin, adminpwd, payload){
    return axiosInstance
      .patch('/backend/1.0.0/updateUser?payload=' +payload + '&tenant=carbon.super&admin=' + admin + '&adminpwd=' + adminpwd + '&isPswd=1')
      .then(response => { return response.data })
      .catch(error_handler);
  },
  registerRocketChatUser(payload){
    return axiosInstance
      .post('/backend/1.0.0/create-rocketchat-user?payload=' + payload)
      .then(response => { return response.data })
      .catch(error_handler);
  },
  deletePreferences(user_id) {
    return axiosInstance
      .delete('/backend/1.0.0/users/' + user_id + '/user-preferences')
      .then(response => response.data)
      .catch(error_handler);
  },
  savePreferences(user_id, payload) {
    return axiosInstance
      .post('/backend/1.0.0/users/' + user_id + '/user-preferences', payload)
      .then(response => response.data)
      .catch(error_handler);
  },
  saveConsent(user_id, payload) {
    console.log("saveconsent API")
    console.log(user_id)
    console.log(payload)
    let body = {consent:payload}
    return axiosInstance
      .post('/backend/1.0.0/users/' + user_id + '/user-consent', body)
      .then(response => response.data)
      .catch(error_handler);
  },
  updateConsent(user_id, payload) {
    console.log("updateconsent API")
    console.log(user_id)
    console.log(payload)
    let body = {consent:payload}
    return axiosInstance
      .patch('/backend/1.0.0/users/' + user_id + '/user-consent', body)
      .then(response => response.data)
      .catch(error_handler);
  },
  consentPresent(user_id){
    const whereClause = {
      idUser: { eq: user_id }
    }
    return axiosInstance
      .get('/backend/1.0.0/user-consents/count?where=' + JSON.stringify(whereClause))
      .then(response => response.data)
      .catch(error_handler);
  }
}

