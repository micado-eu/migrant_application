export function setGlossary(state, glossary) {
  state.glossary = glossary.filter(t => t.translated)
}

export function setGlossaryTemp(state, glossary) {
  state.glossaryTemp = glossary.filter(t => !t.translated)
}