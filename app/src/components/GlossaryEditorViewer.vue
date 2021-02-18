<template>
  <div padding>
    <div>
      <editor-content
        class='editor_content'
        :editor="editor"
        ref="editor"
      />
      <talking-label
        Title=""
        :text="textToSpeech"
        v-if="textToSpeech !== null"
        class=""
      ></talking-label>
    </div>
    <div>
      <slot name="append"></slot>
    </div>
    <div>
      <q-btn
        unelevated
        @click="showAllContent"
        v-if="readMore && !showingFullContent"
        rounded
        color="grey-5"
        size="sm"
        no-caps
        padding="1px 15px"
        class="q-mb-md"
      >
        {{ $t("button.read_more") }}
      </q-btn>
      <q-btn
        unelevated
        @click="showLessContent"
        v-if="readMore && showingFullContent"
        rounded
        size="sm"
        outline
        color="grey-8"
        no-caps
        padding="1px 15px"
        class="q-my-md"
      >
        {{ $t("button.read_less") }}
      </q-btn>
    </div>
    <q-tooltip
      ref="tooltip"
      v-model="showTooltip"
      :target="targetElement"
      anchor="top middle"
      self="bottom middle"
      :offset="[10, 10]"
      v-if="currentDescription"
    >
      <template v-slot:default>
        <div class="desc_tooltip">
          {{currentDescriptionContent}}
        </div>
      </template>
    </q-tooltip>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Editor, EditorContent } from 'tiptap'
import {
  Link,
  Bold,
  Italic
} from 'tiptap-extensions'
import Image from 'components/editor_plugins/Image'
import InternalMention from 'components/editor_plugins/InternalMention'
import markdownConverterMixin from '../mixin/markdownConverterMixin'
import TalkingLabel from 'components/TalkingLabel'

export default {
  name: 'GlossaryEditorViewer',
  components: {
    EditorContent,
    TalkingLabel
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    all_fetched: {
      type: Boolean,
      default: false
    },
    isContentHTML: {
      type: Boolean,
      default: false
    },
    readMore: {
      type: Boolean,
      default: false
    }
  },
  mixins: [markdownConverterMixin],
  data() {
    return {
      editor: null,
      currentDescriptionContent: '',
      targetElement: false,
      showTooltip: false, // Don't show by default
      fullHTMLContent: '',
      showingFullContent: true,
      elemByIdFunctions: undefined
    }
  },
  computed: {
    ...mapGetters('glossary', ['glossaryElemById']),
    ...mapGetters('information', ['informationElemById']),
    ...mapGetters('flows', ['processById']),
    ...mapGetters('event', ['eventElemById']),
    currentDescription() {
      return this.currentDescriptionContent
    },
    textToSpeech() {
      if (this.editor) {
        const doc = new DOMParser().parseFromString(this.editor.getHTML(), 'text/html')
        return doc.body.textContent || null
      }
      return null
    }
  },
  methods: {
    ...mapActions('glossary', ['fetchGlossary']),
    ...mapActions('information', ['fetchInformation']),
    ...mapActions('flows', ['fetchFlows']),
    ...mapActions('event', ['fetchEvent']),
    initialize() {
      this.elemByIdFunctions = {
        "glossary": this.glossaryElemById,
        "information": this.informationElemById,
        "event": this.eventElemById,
        "process": this.processById
      }
      this.editor = new Editor({
        editable: false,
        extensions: [
          new Bold(),
          new Italic(),
          new Link(),
          new Image(),
          new InternalMention()
        ],
        content: ''
      })
      this.setContent(this.content)
    },
    setContent(content, isHTML = false) {
      let currentContent = content
      if (!isHTML) {
        currentContent = this.markdownToHTML(content)
      }
      this.markReferences(currentContent, this.$defaultLang, this.$userLang, true).then((markedContent) => {
        let newContent = markedContent
        this.allHTMLContent = markedContent
        if (this.readMore) {
          let el = this.$refs.editor.$el
          let height = parseFloat(getComputedStyle(el, null).height.replace("px", ""))
          if (height >= 41) {
            el.classList.add('max-lines')
            this.showingFullContent = false
          }
        }
        this.editor.setContent(newContent)
        const mentions = this.$refs.editor.$el.querySelectorAll("[data-mention-id]")
        for (let mention of mentions) {
          mention.addEventListener("mouseover", this.setCurrentDescription)
        }
      }).catch((err) => {
        this.$q.notify({
          type: 'negative',
          message: `Error while fetching glossary description: ${err}`
        })
      })
    },
    showAllContent() {
      this.$refs.editor.$el.classList.remove('max-lines')
      this.showingFullContent = true
      this.$emit("readMorePressed")
    },
    showLessContent() {
      this.$refs.editor.$el.classList.add('max-lines')
      this.showingFullContent = false
      this.$emit("readLessPressed")
    },
    setCurrentDescription(event) {
      if (event.target instanceof HTMLSpanElement) {
        const idString = event.target.getAttribute("data-mention-id")
        const mentionType = event.target.getAttribute("mention-type")
        if (idString > -1 && mentionType in this.elemByIdFunctions) {
          const id = parseInt(idString)
          event.stopPropagation()
          const elem = this.elemByIdFunctions[mentionType](id)
          if (elem !== undefined) {
            let tooltip = this.$refs.tooltip
            if (tooltip) {
              tooltip.hide()
            }
            let currentContent = this.markdownToHTML(elem.description)
            // Gets description and transforms it to plain text
            const doc = new DOMParser().parseFromString(currentContent, 'text/html')
            const plainDescription = doc.body.textContent || ''
            this.targetElement = event.target
            this.currentDescriptionContent = plainDescription
          }
        }
      }
    }
  },
  created() {
    if (!this.all_fetched) {
      const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
      Promise.all([
        this.fetchGlossary(langs),
        this.fetchInformation(langs),
        this.fetchFlows(langs),
        this.fetchEvents(langs)
      ]).then(() => {
        this.initialize()
      })
    } else {
      this.initialize()
    }
  }
}
</script>

<style lang="scss">
.mention {
  text-decoration: underline;
}

img {
  width: 100%;
  max-width: 300px;
}

.editor_content {
  font-family: "Nunito Sans";
}

.max-lines {
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  max-height: 41px;
  line-height: 21px;
}

.ProseMirror:focus {
  outline: none;
}

.desc_tooltip {
  max-width: 300px;
}
</style>