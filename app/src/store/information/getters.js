export function information(state) {
  return state.information
}

export function informationElemById(state) {
  let getterFunc = function (id) {
    return state.information.filter(n => n.id == id)[0]
  }
  return getterFunc
}
export const show_info = (state) => (index, idsToFilter) => {
  // it's an example
  if(index != null){
    return state.information.filter((info)=>{
      if(info.topics){
        return info.topics.includes(index) && (idsToFilter.length === 0 || idsToFilter.includes(info.id))
      }
      
    })
  }
  else{
    return state.information.filter((info)=>{
        return info.topics == null && (idsToFilter.length === 0 || idsToFilter.includes(info.id))
    })
  }

}