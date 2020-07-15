/*
export function someMutation (state) {
}
*/

export function setDocuments (state, documents) {
      state.documents = documents
    }

export function saveDocument(state, document) {
    console.log("save to the state")
    console.log(document)
    
    state.documents.push(document);
    console.log(state.documents)
    }

export function editTopic(state, document) {
    console.log("update the state")
    const index = state.documents.findIndex(item => item.id === document.id);
    if (index !== -1) state.documents.splice(index, 1, document);
    }