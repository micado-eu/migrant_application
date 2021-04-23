export function glossary(state) {
    return state.glossary
}

export function glossaryTemp (state) {
    return state.glossaryTemp
  }

export function glossaryElemById(state) {
    let getterFunc = function (id) {
        return state.glossary.filter(g => g.id == id)[0]
    }
    return getterFunc
}

export function glossaryTempElemById (state) {
    let getterFunc = function (id) {
      return state.glossaryTemp.filter(g => g.id == id)[0]
    }
    return getterFunc
  } 