import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  fetchDocuments () {
    return axiosInstance
      .get('/backend/1.0.0/documents?filter[include][0][relation]=pictures&filter[include][1][relation]=documentType')
      .then(response => { return response.data })
      .catch(error_handler);
  },
  /*fetchDocuments () {
    return fetch(flows, 1000) // wait 1s before returning posts
  },*/
  

  deleteDocumentPictures (doc_id) {
    return axiosInstance
      .delete('/backend/1.0.0/documents/' + doc_id + '/document-pictures')
      .then(response => response.data)
      .catch(error_handler);
  },

  deleteDocument (doc_id) {
    return axiosInstance
      .delete('/backend/1.0.0/processes/' + doc_id)
      .then(response => response.data)
      .catch(error_handler);
  },

  saveDocument (document) {
    console.log("call to save to DB")
    console.log(process)
    // create fake id here
    const savingDocument= JSON.parse(JSON.stringify(document, [ 'documentTypeId', 'validated', 'expirationDate', 'uploadedByMe']))

    return axiosInstance
      .post('/backend/1.0.0/documents', savingDocument)
      .then(response => response.data)
      .catch(error_handler);
  },
  saveDocumentPictures (pictures, doc_id) {
    console.log("call to save to DB")
    console.log(process)
    // create fake id here
    const savingPicture= JSON.parse(JSON.stringify(pictures, [ 'docId', 'picture', 'order']))

    return axiosInstance
      .post('/backend/1.0.0/documents/'+ doc_id + '/document-pictures', savingPicture)
      .then(response => response.data)
      .catch(error_handler);
  },

  updateDocument (document) {
    const whereClause = {
      id: { eq: document.id }
    },
      updatingDocument= JSON.parse(JSON.stringify(document, ['id', 'document_type'])) 

    return axiosInstance
      .patch('/backend/1.0.0/documents?where=' + JSON.stringify(whereClause), updatingDocument)
      .then(response => response.data)
      .catch(error_handler);
  },

  updateDocumentPictures (doc_id, picture) {
    const whereClause = {
      id: { eq: picture.id }, docId: { eq: doc_id }
    }
      //updatingPicture = (picture.translationDate == null) ? JSON.parse(JSON.stringify(picture, ['id', 'lang', 'prcess', 'description'])) : picture

    return axiosInstance
      .patch('/backend/1.0.0/documents/' + doc.id + '/document-pictures?where=' + JSON.stringify(whereClause), picture)
      .then(response => response.data)
      .catch(error_handler);
  },
 

}
