<template>
  <div
    padding
    :id="uuid"
  >
    <editor-content
      class="editor__content"
      :editor="editor"
    />
    <q-tooltip
      class="desc_tooltip"
      v-model="showTooltip"
      :target="targetElement"
      anchor="top middle" 
      self="bottom middle" 
      :offset="[10, 10]"
    >
      {{currentDescription}}
    </q-tooltip>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { Editor, EditorContent } from "tiptap"
import {
  Blockquote,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Link,
  Strike,
  Underline,
  HardBreak,
  Heading,
  Bold,
  Italic,
  Mention
} from "tiptap-extensions"

let uuid = 0

export default {
  name: "GlossaryEditorViewer",
  components: {
    EditorContent
  },
  props: {
    content: {
      type: String | Object,
      default: ""
    }
  },
  data () {
    return {
      editor: null,
      currentDescriptionContent: "",
      targetElement: false,
      showTooltip: false, // Don't show by default
    }
  },
  computed: {
    ...mapGetters('glossary', ['glossary', 'glossaryElemByTitle']),
    currentDescription () {
      return this.currentDescriptionContent
    }
  },
  methods: {
    ...mapActions("glossary", ["fetchGlossary"]),
    setContent (content) {
      this.editor.setContent(content)
    },
    setCurrentDescription (glossaryElem, element) {
      // Gets JSON description and transforms it to plain text
      // Create an invisible editor to transform the JSON into HTML for parsing
      var editorInterpreter = new Editor({
        editable: false,
        extensions: [
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Mention({
            items: () => this.glossary,
          }),
          new Bold(),
          new Italic(),
          new Blockquote(),
          new BulletList(),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Strike(),
          new Underline(),
        ],
        content: glossaryElem.description
      })
      var doc = new DOMParser().parseFromString(editorInterpreter.getHTML(), 'text/html');
      var plainDescription = doc.body.textContent || "";
      this.targetElement = element
      this.currentDescriptionContent = plainDescription
      editorInterpreter.destroy()
    },
    setGlossaryClickEvents () {
      var glossaryElemByTitleFunc = this.glossaryElemByTitle
      var currentDescriptionSetter = this.setCurrentDescription
      var uuid = this.uuid
      document.addEventListener("mouseover", function (e) {
        var componentDiv = document.getElementById(uuid)
        var isParentOfDiv = componentDiv.contains(e.target)
        if (e.target && e.target.classList.contains("mention") && isParentOfDiv) {
          var glossaryElemTitle = e.srcElement.innerText.substring(1)
          var glossaryElem = glossaryElemByTitleFunc(glossaryElemTitle)
          currentDescriptionSetter(glossaryElem, e.target)
        }
      })
    }
  },
  beforeCreate () {
    this.uuid = uuid.toString();
    uuid += 1;
  },
  created () {
    this.fetchGlossary().then(() => {
      this.editor = new Editor({
        editable: false,
        extensions: [
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Mention({
            items: () => this.glossary,
          }),
          new Bold(),
          new Italic(),
          new Blockquote(),
          new BulletList(),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Strike(),
          new Underline(),
        ],
        content: ""
      })
      this.setContent(this.content)
      this.setGlossaryClickEvents()
    })
  }
}
</script>

<style lang="scss">
.mention {
  border: 1px solid $primary;
}
</style>