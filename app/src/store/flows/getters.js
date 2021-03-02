export function processes(state) {
    return state.flows
  }

  export function processById(state) {
    let getterFunc = function (id) {
      return state.flows.filter(n => n.id == id)[0]
    }
    return getterFunc
  }

  export function documents(state) {
    return state.documents
  }

  export function flowData(state) {
    return state.flowdata
  }

  export function shell_data(state) {
    return state.shell_data
  }

  export function nodePanelVisible(state) {
    return state.nodePanelVisible
  }
  export const show_flows = (state) => (index) => {
    // it's an example
    if(index != null){
      return state.flows.filter((flow)=>{
        if(flow.topics){
          return flow.topics.includes(index)
        }
        
      })
    }
    else{
      console.log("IN FLOWS GETETER NEWWFHJW")

      return state.flows.filter((flow)=>{
          return flow.topics == null
      })
    }

}