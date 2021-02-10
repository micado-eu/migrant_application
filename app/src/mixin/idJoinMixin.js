export default {
    methods: {
        idJoin(ids, elements) {
            const joinedElements = []
            for (let j = 0; j < ids.length; j++) {
              const topic = ids[j]
              const idx = elements.findIndex((t) => t.id === topic)
              if (idx !== -1) {
                joinedElements.push(elements[idx])
              }
            }
            return joinedElements
        }
    }
}