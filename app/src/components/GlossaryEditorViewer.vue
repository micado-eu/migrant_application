<template>
  <div padding>
    <q-spinner v-if="loading" />
    <div v-else>
      <div :class="(talkingLabelLocation === 'left') || (talkingLabelLocation === 'right') ? 'row' : ''">
        <talking-label
          Title=""
          :text="textToSpeech"
          v-if="(textToSpeech !== null) && ((talkingLabelLocation === 'top') || (talkingLabelLocation === 'left'))"
          :icon-col="talkingLabelLocation === 'left' ? 'col-1' : ''"
        ></talking-label>
        <editor-content
          :class="talkingLabelLocation === 'left' ? 'col editor_content q-ml-sm' : (talkingLabelLocation === 'right' ? 'col-9 editor_content' : 'editor_content')"
          :editor="editor"
          ref="editor"
          v-show="!hideContent"
        />
        <slot v-show="hideContent && initialized"></slot>
        <talking-label
          Title=""
          :text="textToSpeech"
          v-if="(textToSpeech !== null) && (talkingLabelLocation === 'right')"
          class="col-shrink q-ml-xl"
        ></talking-label>
        <talking-label
          Title=""
          :text="textToSpeech"
          v-if="(textToSpeech !== null) && (talkingLabelLocation === 'bottom')"
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
    </div>
    <q-dialog v-model="showDialog">
      <internal-reference-dialog
        v-if="showDialog"
        :title="titleDialog"
        :link="linkDialog"
        :notFound="notFound"
        @close="showDialog = false"
      >
        <glossary-editor-viewer
          :content="descriptionDialog"
          class="description"
          all_fetched
        />
      </internal-reference-dialog>
    </q-dialog>
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
import Image from 'components/editor_plugins/Image.js'
import InternalMention from 'components/editor_plugins/InternalMention.js'
import markdownConverterMixin from '../mixin/markdownConverterMixin.js'
import TalkingLabel from 'components/TalkingLabel.vue'
import InternalReferenceDialog from './InternalReferenceDialog.vue'
import _ from "lodash"

export default {
  name: 'GlossaryEditorViewer',
  components: {
    EditorContent,
    TalkingLabel,
    InternalReferenceDialog
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
    readMore: {
      type: Boolean,
      default: false
    },
    hideContent: {
      type: Boolean,
      default: false
    },
    talkingLabelLocation: {
      type: String,
      validator: (val) => ['top', 'left', 'bottom', 'right'].includes(val),
      default: 'bottom'
    }
  },
  mixins: [markdownConverterMixin],
  data() {
    return {
      loading: false,
      editor: null,
      showingFullContent: true,
      showDialog: false,
      referenceData: {},
      titleDialog: undefined,
      descriptionDialog: undefined,
      linkDialog: undefined,
      notFound: false,
      initialized: false,
      highlightedTextCache: "",
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
      if (this.initialized) {
        if (this.hideContent && this.highlightedTextCache) {
          return this.highlightedTextCache
        } else {
          const doc = new DOMParser().parseFromString(this.editor.getHTML(), 'text/html')
          return doc.body.textContent || null
        }
      }
      return null
    }
  },
  methods: {
    ...mapActions('glossary', ['fetchGlossary', 'fetchGlossaryTemp']),
    ...mapActions('information', ['fetchInformation', 'fetchInformationTemp']),
    ...mapActions('flows', ['fetchFlows', 'fetchFlowsTemp']),
    ...mapActions('event', ['fetchEvents', 'fetchEventTemp']),
    async initialize() {
      this.editor = new Editor({
        editable: false,
        extensions: [
          new Bold(),
          new Italic(),
          new Link(),
          new Image(),
          new InternalMention({
            showInternalReference: this.showInternalReference
          })
        ],
        content: ''
      })
      await this.setContent(this.content)
      if (!this.hideContent) {
        await this.$nextTick()
        this.cacheDialog()
        if (this.readMore) {
          let el = this.$refs.editor.$el
          let height = parseFloat(getComputedStyle(el, null).height.replace("px", ""))
          if (height >= 41) {
            el.classList.add('max-lines')
            this.showingFullContent = false
          }
        }
      }
      this.initialized = true
    },
    async setContent(content, isHTML = false) {
      let currentContent = content
      if (!isHTML) {
        currentContent = this.markdownToHTML(content)
      } else {
        currentContent = await this.markReferences(currentContent, this.$defaultLang, this.$userLang, true)
      }
      try {
        let newContent = currentContent
        this.allHTMLContent = currentContent
        this.editor.setContent(newContent)
        this.loading = false
        return newContent
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: `Error while fetching glossary description: ${err}`
        })
        this.loading = false
        return ''
      }
    },
    cacheDialog() {
      const elemByIdFunctions = {
        "g": this.glossaryElemById,
        "i": this.informationElemById,
        "e": this.eventElemById,
        "p": this.processById
      }
      this.mentions = this.$refs.editor.$el.querySelectorAll("[data-mention-id]")
      this.referenceData = {}
      for (let mention of this.mentions) {
        const idString = mention.getAttribute("data-mention-id")
        const id = parseInt(idString)
        const mentionType = mention.getAttribute("mention-type")
        const elem = this.getMentionData(id, mentionType, elemByIdFunctions)
        if (!(mentionType in this.referenceData)) {
          this.referenceData[mentionType] = {}
        }
        this.referenceData[mentionType][id] = elem
      }
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
    getMentionData(id, mentionType, elemByIdFunctions) {
      const mentionBaseURL = {
        "g": "glossary?id={id}",
        "i": "information/{id}",
        "e": "events/{id}",
        "p": "processes/{id}"
      }
      if (id > -1 && mentionType in elemByIdFunctions) {
        let elem = undefined
        try {
          elem = elemByIdFunctions[mentionType](id)
        }
        catch (err) {
          if (err !== "Not found") throw err
        }
        if (elem !== undefined) {
          const url = "/" + mentionBaseURL[mentionType].replace("{id}", id)
          return {
            title: mentionType !== "p" ? elem.title : elem.process,
            description: elem.description,
            link: url
          }
        }
      }
    },
    showInternalReference(mentionType, id) {
      // Click event handler is managed by the InternalMention ProseMirror plugin
      const element = this.referenceData[mentionType][id]
      if (element !== undefined) {
        this.notFound = false
        this.titleDialog = this.referenceData[mentionType][id].title
        this.descriptionDialog = this.referenceData[mentionType][id].description
        this.linkDialog = this.referenceData[mentionType][id].link
      } else {
        this.notFound = true
      }
      this.showDialog = true
    },
    highlightedText(highlights) {
      const document = new DOMParser().parseFromString(this.editor.getHTML(), "text/html").documentElement
      let result = '<span class="max-lines">'
      let scoreList = []
      const prefixTag = '<span class="highlighted">'
      const suffixTag = '</span>'
      const escapedHighlights = highlights.map(h => _.escapeRegExp(h))
      const regexp = new RegExp("(" + escapedHighlights.join("|") + ")", "gi")
      for (const child of document.children[1].children) {
        const text = child.innerText
        const splitted = text.split(regexp)
        // More matches === longer array
        scoreList.push(splitted.length)
      }
      const biggestScoreIndex = scoreList.reduce(
        (bestIndexSoFar, currentlyTestedValue, currentlyTestedIndex, array) =>
          currentlyTestedValue > array[bestIndexSoFar] ? currentlyTestedIndex : bestIndexSoFar, 0
      )
      const bestMatchSplitted = document.children[1].children[biggestScoreIndex].innerText.split(regexp)
      let lang = this.$userLang
      if (lang === "zh_Hans") {
        lang = "zh-Hans-CN"
      }
      if (lang === "fa_IR") {
        lang = "fa"
      }
      let stringComparator;
      try {
        stringComparator = new Intl.Collator(lang, { sensitivity: 'accent' })
      } catch (e) {
        stringComparator = new Intl.Collator("en", { sensitivity: 'accent' })
      }
      // Add the tag to the text
      for (let i = 0; i < bestMatchSplitted.length; i = i + 1) {
        const isHighlight = highlights.some(highlightedTerm => !stringComparator.compare(bestMatchSplitted[i], highlightedTerm))
        if (isHighlight) {
          bestMatchSplitted[i] = prefixTag + bestMatchSplitted[i] + suffixTag
        }
      }
      let trimmedMatch = bestMatchSplitted.join("").replace(/^(.{100}[^\s]*).*/, "$1")
      result = result.concat(trimmedMatch).concat("...").concat("</span>")
      this.highlightedTextCache = trimmedMatch
      return result
    }
  },
  created() {
    this.loading = true
    if (!this.all_fetched) {
      const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
      Promise.all([
        this.fetchGlossaryTemp(langs),
        this.fetchInformationTemp(langs),
        this.fetchFlowsTemp(langs),
        this.fetchEventTemp(langs),
        this.fetchGlossary(langs),
        this.fetchInformation(langs),
        this.fetchFlows(langs),
        this.fetchEvents(langs)
      ])
        .then(() => this.initialize())
    } else {
      this.initialize()
    }
  }
}
</script>

<style lang="scss">
.mention {
  text-decoration: underline;
  color: #ff7c44;
  cursor: pointer;
}

img {
  width: 100%;
  max-width: 300px;
}

.description {
  font-family: Nunito Sans;
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

.highlighted {
  font-weight: bold;
}
</style>