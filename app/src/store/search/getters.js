export function results(state) {
  console.log(state.results)
  return state.results
}
export const show_flows_search_personal = (state) => (index, preferences) => {
    console.log("IN FLOWS GETETER NEWWFHJW")
    var showing_flows=[]
    if(preferences){
      console.log("INSIDE PREFRENCES")
      preferences.forEach((pref)=>{
        state.results.processes.forEach((tmp)=>{
          if(tmp.users !=null){

           if(tmp.users.includes(pref.idUserType)){
             if(showing_flows.includes(tmp) == false){
              showing_flows.push(tmp)

             }
           }
          }
        })
      })
    }
    


    if(showing_flows.length >0){
      return showing_flows.sort(function(a, b){
        if(a.process < b.process) { return -1; }
        if(a.process > b.process) { return 1; }
        return 0;
    })
    }
    else{
      return showing_flows
    }
  }

//}

export const show_flows_search_general = (state) => (index, preferences) => {
  console.log("IN FLOWS GETETER NEWWFHJW")
  var showing_flows=[]
  if(preferences){
    var preferencesid=[]
    preferences.forEach((prefid)=>{
      preferencesid.push(prefid.idUserType)
    })
    state.results.processes.forEach((tmp)=>{
        if(tmp.users !=null){

         if(!preferencesid.some(i => tmp.users.includes(i))){
          if(showing_flows.includes(tmp) == false){
            showing_flows.push(tmp)

           }
         }
        }
        else{
          if(showing_flows.includes(tmp) == false){
            showing_flows.push(tmp)

           }
          }
      })
  }
  else{
    showing_flows = state.results.processes
  }
  if(showing_flows.length >0){
    return showing_flows.sort(function(a, b){
      if(a.process < b.process) { return -1; }
      if(a.process > b.process) { return 1; }
      return 0;
  })
  }
  else{
    return showing_flows
  }

}
export const show_info_search_personal = (state) => (index, preferences) => {
  console.log("IN FLOWS GETETER NEWWFHJW")
  var showing_flows=[]
  if(preferences){
    console.log("INSIDE PREFRENCES")
    preferences.forEach((pref)=>{
      state.results.information.forEach((tmp)=>{
        if(tmp.users !=null){

         if(tmp.users.includes(pref.idUserType)){
           if(showing_flows.includes(tmp) == false){
            showing_flows.push(tmp)

           }
         }
        }
      })
    })
  }
  


  if(showing_flows.length >0){
    return showing_flows.sort(function(a, b){
      if(a.information < b.information) { return -1; }
      if(a.information > b.information) { return 1; }
      return 0;
  })
  }
  else{
    return showing_flows
  }
}

//}

export const show_info_search_general = (state) => (index, preferences) => {
console.log("IN FLOWS GETETER NEWWFHJW")
var showing_flows=[]
if(preferences){
  var preferencesid=[]
  preferences.forEach((prefid)=>{
    preferencesid.push(prefid.idUserType)
  })
  state.results.information.forEach((tmp)=>{
      if(tmp.users !=null){

       if(!preferencesid.some(i => tmp.users.includes(i))){
        if(showing_flows.includes(tmp) == false){
          showing_flows.push(tmp)

         }
       }
      }
      else{
        if(showing_flows.includes(tmp) == false){
          showing_flows.push(tmp)

         }
        }
    })
}
else{
  showing_flows = state.results.information
}
if(showing_flows.length >0){
  console.log(showing_flows)
  return showing_flows.sort(function(a, b){
    if(a.information < b.information) { return -1; }
    if(a.information > b.information) { return 1; }
    return 0;
})
}
else{
  console.log(showing_flows)

  return showing_flows
}

}
export const show_event_search_personal = (state) => (index, preferences) => {
  console.log("IN FLOWS GETETER NEWWFHJW")
  var showing_flows=[]
  if(preferences){
    console.log("INSIDE PREFRENCES")
    preferences.forEach((pref)=>{
      state.results.events.forEach((tmp)=>{
        if(tmp.users !=null){

         if(tmp.users.includes(pref.idUserType)){
           if(showing_flows.includes(tmp) == false){
            showing_flows.push(tmp)

           }
         }
        }
      })
    })
  }
  


  if(showing_flows.length >0){
    return showing_flows.sort(function(a, b){
      if(a.event < b.event) { return -1; }
      if(a.event > b.event) { return 1; }
      return 0;
  })
  }
  else{
    return showing_flows
  }
}

//}

export const show_event_search_general = (state) => (index, preferences) => {
console.log("IN FLOWS GETETER NEWWFHJW")
var showing_flows=[]
if(preferences){
  var preferencesid=[]
  preferences.forEach((prefid)=>{
    preferencesid.push(prefid.idUserType)
  })
  state.results.events.forEach((tmp)=>{
      if(tmp.users !=null){

       if(!preferencesid.some(i => tmp.users.includes(i))){
        if(showing_flows.includes(tmp) == false){
          showing_flows.push(tmp)

         }
       }
      }
      else{
        if(showing_flows.includes(tmp) == false){
          showing_flows.push(tmp)

         }
        }
    })
}
else{
  showing_flows = state.results.events
}
if(showing_flows.length >0){
  console.log(showing_flows)
  return showing_flows.sort(function(a, b){
    if(a.event < b.event) { return -1; }
    if(a.event > b.event) { return 1; }
    return 0;
})
}
else{
  console.log(showing_flows)

  return showing_flows
}

}


//}