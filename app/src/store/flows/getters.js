export function processes(state) {
    return state.flows
  }

  export function processesTemp(state) {
    return state.flowsTemp
  }
  
  export function processTempById(state) {
    let getterFunc = function (id) {
      return state.flowsTemp.filter(n => n.id == id)[0]
    }
    return getterFunc
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
  export const show_flows_personal = (state) => (index, idsToFilter, preferences) => {
    // it's an example
    if(index != null){
      var showing_flows=[]
      var first_filter =  state.flows.filter((flow)=>{
        if(flow.topics){
          return flow.topics.includes(index) && (idsToFilter.length === 0 || idsToFilter.includes(flow.id))
        }
        
      })
      if(preferences){
        console.log("INSIDE PREFRENCES")

        preferences.forEach((pref)=>{
          first_filter.forEach((tmp)=>{
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
    else{
      console.log("IN FLOWS GETETER NEWWFHJW")
      var showing_flows=[]
      var first_filter =  state.flows.filter((flow)=>{
          return flow.topics == null && (idsToFilter.length === 0 || idsToFilter.includes(flow.id))
      })
      if(preferences){
        console.log("INSIDE PREFRENCES")
        preferences.forEach((pref)=>{
          first_filter.forEach((tmp)=>{
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

}

export const show_flows_general = (state) => (index, idsToFilter, preferences) => {
  // it's an example
  if(index != null){
    var showing_flows=[]
    var first_filter =  state.flows.filter((flow)=>{
      if(flow.topics){
        return flow.topics.includes(index) && (idsToFilter.length === 0 || idsToFilter.includes(flow.id))
      }
      
    })
    if(preferences){
      console.log("INSIDE PREFRENCES")
      var preferencesid=[]
      preferences.forEach((prefid)=>{
        preferencesid.push(prefid.idUserType)
      })
        first_filter.forEach((tmp)=>{
          console.log(preferencesid)
          console.log(tmp.users)
          if(tmp.users !=null){

          console.log(!preferencesid.some(i => tmp.users.includes(i)))
           if(!preferencesid.some(i => tmp.users.includes(i))){
             console.log(" STO PRENDENDO I PROCESSI SENZA LE PREFERENZE")
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
      showing_flows = first_filter
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
  else{
    console.log("IN FLOWS GETETER NEWWFHJW")
    var showing_flows=[]
    var first_filter =  state.flows.filter((flow)=>{
        return flow.topics == null && (idsToFilter.length === 0 || idsToFilter.includes(flow.id))
    })
    if(preferences){
      var preferencesid=[]
      preferences.forEach((prefid)=>{
        preferencesid.push(prefid.idUserType)
      })
        first_filter.forEach((tmp)=>{
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
      showing_flows = first_filter
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

}