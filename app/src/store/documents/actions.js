import client from 'api-documents-client'

/*
export function someAction (context) {
}
*/
export function fetchDocuments(state, data) {
  return client
    .fetchDocuments()
    .then(documents => {
      state.commit('setDocuments', documents)
      return documents
    })
}
export function sendDocumentMail(state, data) {
  return client
    .sendDocumentMail(data.id, data.email)
}
export function saveDocument (state, document) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log("in actions save document:")
  console.log(document)
  


  // we need to save first the topic
  return client.saveDocument(document)
    .then(function (doc_return) {
      console.log("returned from saving topic")
      console.log(doc_return)
      var doc_return_id = doc_return.id
      console.log("looking at the returned id")
      console.log(doc_return_id)
      document.id = doc_return_id
      console.log("assigned id to document")
      console.log(document.id)
      // in topic_return we have the ID that we need in the following cycle
      for(var i = 0; i < document.pictures.length; i++){
        document.pictures[i].order = i
        document.pictures[i].docId = doc_return_id
        console.log("this is the picture i am saving")
        console.log(document.pictures[i])
        client.saveDocumentPictures(document.pictures[i], doc_return_id)
      }
      // here we need only to add the ID to the topic element since there are the tranlsations that in the topic_return are not present
      console.log("after foreach save picture")
     
      state.commit('saveDocument', document)
    }
      // here we cycle for all translations to save each one

    )
}

export function editDocument (state, document) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(document)
  // update translations
 return client.deleteDocumentPictures(document.id).then( function (picture_return){
console.log("deleted pictures")
   client.updateDocument(document).then(function (update_return) {
    for(var i = 0; i < document.pictures.length; i++){
      document.pictures[i].order = i
      document.pictures[i].docId = document.id
      console.log("this is the picture i am saving")
      console.log(document.pictures[i])
      client.saveDocumentPictures(document.pictures[i], document.id)
    }
      // cycle in the translations and update each
      console.log(update_return)
      /*topic_element.translations.forEach(function (aTranslation) {
        client.updateTopicTranslation(aTranslation).then(function (update_translation_return) {
          console.log(update_translation_return)
        })
      })*/
      state.commit('editDocument', document)
    })
 })
}

export function deleteDocument (state, id) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(document)
  // update translations
 return client.deleteDocumentPictures(id).then( function (picture_return){
console.log("deleted pictures")
   client.deleteDocument(id).then(function (update_return) {
    
      // cycle in the translations and update each
      console.log(update_return)
      /*topic_element.translations.forEach(function (aTranslation) {
        client.updateTopicTranslation(aTranslation).then(function (update_translation_return) {
          console.log(update_translation_return)
        })
      })*/
      state.commit('deleteDocument', id)
    })
 })
}
