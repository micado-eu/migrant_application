/*
export function someMutation (state) {
}
*/
export function setFlows (state, flows) {
  state.flows = flows.sort(function(a,b) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );
  
}

export function setFlowsTemp (state, flows) {
  state.flowsTemp = flows
}

export function setNodePanelVisible (state, visible) {
  state.nodePanelVisible = visible
}

export function setLongitude (state, longitude) {
  state.longitude = longitude
}

export function setDocuments (state, documents) {
  state.documents = documents
}

export function setFlowData(state, data) {
  state.flowdata = data
}
export function setShellData(state, data) {
  state.shell_data = data
}
