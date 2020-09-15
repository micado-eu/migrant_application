export function documents(state) {
  return state.documents
}
export function generableDocs (state) {
//  generableDocs: state => {
          return state.documents.filter((document) => {
            return document.generable == true;
          });
//      } // pendingJobs
}
