export function events(state) {
  return state.events
}

export function eventElemById(state) {
  let getterFunc = function (id) {
    return state.events.filter(n => n.id == id)[0]
  }
  return getterFunc
}

export const show_events = (state) => (index, idsToFilter) => {
  // it's an example
  if(index != null){
    return state.events.filter((ev)=>{
      if(ev.topics){
        return ev.topics.includes(index) && (idsToFilter.length === 0 || idsToFilter.includes(ev.id))
      }
      
    })
  }
  else{
    return state.events.filter((ev)=>{
        return ev.topics == null && (idsToFilter.length === 0 || idsToFilter.includes(ev.id))
    })
  }

}