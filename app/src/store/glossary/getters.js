export function glossary(state) {
    return state.glossary
}

export function glossaryElemById(state) {
    let getterFunc = function (id) {
        return state.glossary.filter(g => g.id == id)[0]
    }
    return getterFunc
}