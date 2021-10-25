import client from 'api-survey-client'

/*
export function someAction (context) {
}
*/
export function fetchSurvey (state, data) {
  return client
    .fetchSurvey()
    .then(survey => state.commit('setSurvey', survey))
}
export function setSurveyJSON (state, data) {
  state.commit('setSurveyJSON', data)
}
export function fetchMigrantSurvey (state, data) {
  return client
    .fetchMigrantSurvey(data)
    .then((survey) => {
      console.log("in action get specific survey")
      console.log(survey)
      state.commit('setSurvey', survey)
      return survey
    })
}

export function editSurvey (state, survey) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(survey)
  return client
    .updateSurvey(survey)
    .then(survey_return => state.commit('editSurvey', survey_return))
}

export function saveSurveyAnswer (state, answer) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(answer)
  return client
    .saveSurveyAnswer(answer.idSurvey, answer)
    
}

export function deleteSurvey (state, survey) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(survey)
  return client
    .deleteSurvey(survey)
    .then(survey_return => state.commit('deleteSurvey', survey_return))
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */