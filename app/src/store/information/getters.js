export function information(state) {
  return state.information
}

export function informationTemp(state) {
  return state.informationTemp
}

export function informationTempElemById(state) {
  let getterFunc = function (id) {
    return state.informationTemp.filter(g => g.id == id)[0]
  }
  return getterFunc
} 

export function informationElemById(state) {
  let getterFunc = function (id) {
    let filtered = state.information.filter(n => n.id == id)
    if (filtered.length < 1) throw 'Not found'
    return filtered[0]
  }
  return getterFunc
}
export const show_info_personal = (state) => (index,preferences) => {
  // it's an example
  if(index != null){
    var showing_info=[]
    var first_filter =  state.information.filter((info)=>{
      if(info.topics){
        return info.topics.includes(index)
      }

    })
    if(preferences){
      console.log("INSIDE PREFRENCES")

      preferences.forEach((pref)=>{
        first_filter.forEach((tmp)=>{
          if(tmp.users !=null){
            if(tmp.users.includes(pref.idUserType)){
              if(showing_info.includes(tmp) == false){
                showing_info.push(tmp)
  
               }
             }
          }

        })
      })
    }
    if(showing_info.length >0){
      return showing_info.sort(function(a, b){
        if(a.information < b.information) { return -1; }
        if(a.information > b.information) { return 1; }
        return 0;
    })
    }
    else{
      return showing_info
    }
  }
  else{
    var showing_info=[]

    var first_filter = state.information.filter((info)=>{
        return info.topics == null
    })
    console.log(first_filter)


    if(preferences){
      
      console.log("INSIDE PREFRENCES")
      preferences.forEach((pref)=>{
        first_filter.forEach((tmp)=>{
          if(tmp.users !=null){

           if(tmp.users.includes(pref.idUserType)){
             if(showing_info.includes(tmp) == false){
              showing_info.push(tmp)

             }
           }
          }
        })
      })
    }
    


    if(showing_info.length >0){
      return showing_info.sort(function(a, b){
        if(a.information < b.information) { return -1; }
        if(a.information > b.information) { return 1; }
        return 0;
    })
    }
    else{
      return showing_info
    }
  }

}
export const show_info_general = (state) => (index, preferences) => {
  // it's an example
  if(index != null){
    var showing_info=[]
    var first_filter =  state.information.filter((info)=>{
      if(info.topics){
        return info.topics.includes(index)
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
             if(showing_info.includes(tmp) == false){
              showing_info.push(tmp)

             }
           }
          }
          else{
            if(showing_info.includes(tmp) == false){
              showing_info.push(tmp)

             }
            }
        })
     
    }
    else{
      showing_info = first_filter
    }

    if(showing_info.length >0){
      return showing_info.sort(function(a, b){
        if(a.information < b.information) { return -1; }
        if(a.information > b.information) { return 1; }
        return 0;
    })
    }
    else{
      return showing_info
    }

  }
  else{
    console.log("IN FLOWS GETETER NEWWFHJW")
    var showing_info=[]
    var first_filter =  state.information.filter((info)=>{
        return info.topics == null
    })
    if(preferences){
      console.log("INSIDE PREFRENCES")
      preferences.forEach((pref)=>{

        first_filter.forEach((tmp)=>{
          if(tmp.users !=null){

           if(!preferencesid.some(i => tmp.users.includes(i))){
            if(showing_info.includes(tmp) == false){
              showing_info.push(tmp)

             }
           }
          }
          else{
            if(showing_info.includes(tmp) == false){
              showing_info.push(tmp)

             }
          }
        })
      
      })
    }
    else{
      showing_info = first_filter
    }
    if(showing_info.length >0){
      return showing_info.sort(function(a, b){
        if(a.information < b.information) { return -1; }
        if(a.information > b.information) { return 1; }
        return 0;
    })
    }
    else{
      return showing_info
    }

  }

}