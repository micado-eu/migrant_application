import { Mark, Plugin } from 'tiptap'

export default class GlossaryMention extends Mark {

  get name() {
    return 'glossarymention'
  }

  get defaultOptions() {
    return {
      showTooltip: false,
      glossaryElemByIdFunc: (id) => null,
      setTooltipDescription: (elem, eventTarget) => null
    }
  }

  get schema() {
    return {
      attrs: {
        'data-mention-id': {
          default: null
        }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'span[class=mention]',
          getAttrs: dom => ({
            'data-mention-id': dom.getAttribute('data-mention-id')
          })
        }
      ],
      toDOM: node => ['span', {
        ...node.attrs,
        class: "mention"
      }, 0]
    }
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            mouseover: (view, event) => {
              if (this.options.showTooltip) {
                if (event.target instanceof HTMLSpanElement) {
                  const idString = event.target.getAttribute("data-mention-id")
                  if (idString) {
                    const id = parseInt(idString)
                    event.stopPropagation()
                    const glossaryElem = this.options.glossaryElemByIdFunc(id)
                    this.options.setTooltipDescription(glossaryElem, event.target)
                  }
                }
              }
            }
          }
        }
      })
    ]
  }

}